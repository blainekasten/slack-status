"use strict";
const fs = require('fs');

const CACHE_LOCATION = process.cwd() + '/LAST_NAME_CACHE';

function getCache() {
  return new Promise((resolve, reject) => {
    fs.readFile(CACHE_LOCATION, 'utf8', (err, data) => {
      err ? reject() : resolve(data.trim());
    });
  });
}

function setCache(lastName) {
  return new Promise((resolve, reject) => {
    fs.writeFile(process.cwd() + '/LAST_NAME_CACHE', lastName, err => {
      err ? reject(err) : resolve(lastName);
    });
  });
}

function clear() {
  fs.unlink(CACHE_LOCATION, err => {
    if (err && err.toString().indexOf('no such file') !== -1) {
      console.log('SlackStatus:Indifferent - Cache has already been cleared.');
      return;
    }

    err
      ? console.error('SlackStatus:Error - Cache couldnt be cleared.', err)
      : console.log('SlackStatus:Success - Cache cleared.');
  });
}

module.exports = {
  clear,
  getCache,
  setCache,
};
