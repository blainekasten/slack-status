#!/usr/bin/env node
"use strict";

const Cache = require('./cache');
const API = require('./api');
const Token = require('./Token');
const minimist = require('minimist');
const utils = require('./utils');
const args = minimist(process.argv.slice(2));


/*
 * Process:
 *
 * 1. Look up cached last name
 *  - if we have it:
 *    set the last name with the status
 *  - if we dont:
 *    - Get the last name
 *    - Cache it,
 *    set the last name with the status
 */
function run(apiToken) {
  const status = args._.join(' ');

  Cache.getCache().then(
    API.setLastName.bind(null, apiToken, status)
  ).catch(() => {
    API.getLastName(apiToken).then(lastName => {
      Cache.setCache(utils.removeStatus(lastName))
        .then(run)
        .catch(e => {
          console.error(
            'SlackStatus:Error - Failed to cache users last name on disk',
            e
          );
        });
    });
  });
}

const firstArg = args._[0];

if (/token/.test(firstArg)) {
  const token = /token=(.*$)/.exec(firstArg)[1];
  Token.write(token);
  return;
}

switch(firstArg) {
case 'clear-cache':
  Cache.clear();
  break;
default:
  // START!
  Token.get().then(run);
  break;
}
