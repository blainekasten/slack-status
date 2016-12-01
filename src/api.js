"use strict"
const Slack = require('slack-node');

function setLastName(apiToken, status, lastName) {
  const slack = new Slack(apiToken);
  const value = status.length ? `${lastName} | ${status}` : lastName;

  slack.api('users.profile.set', {
    name: 'last_name',
    value,
  }, (err, data) => {
    if (err || data.error) {
      console.error(
        'SlackStatus:Error - Failed to update status.\n',
        'Error:', err || data.error
      );
      return;
    }

    if (!status.length) {
      console.log('SlackStatus:Success - Welcome Back!');
      return;
    }

    console.log(`SlackStatus:Success - Status is now "${status}"`);
  });
}

function getLastName(apiToken) {
  const slack = new Slack(apiToken);

  return new Promise(resolve => {
    slack.api('users.profile.get', (err, response) => {
      if (err) {
        console.error(
          'SlackStatus:Error - Failed to get user.',
          err
        );
        return;
      }

      resolve(response.profile.last_name);
    });
  });
}

module.exports = {
  setLastName,
  getLastName,
};
