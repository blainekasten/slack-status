const fs = require('fs');

function slackrcLocation() {
  const root = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  return `${root}/.slackrc`;
}

function getToken() {
  return new Promise(resolve => {
    fs.readFile(slackrcLocation(), 'utf8', (err, apiToken) => {
      if (err) {
        console.error(
          'SlackStatus:ERROR - Could not find slackrc file.' +
          'Was expecting to find a JSON file with an apiToken entry' +
          `at ${slackrcLocation}`
        );
        return;
      }

      if (apiToken.length === 0) {
        console.error(
          'SlackStatus:ERROR:',
          '  .slackrc did not contain a slack api token.'
        );
        return;
      }

      resolve(apiToken.trim());
    });
  });
};

function write(token) {
  fs.writeFile(slackrcLocation(), token, err => {
    if (err) {
      console.log(`SlackStatus:Error - Failed to write token to path "${slackrcLocation()}"`);
    }

    console.log('SlackStatus:Success - Updated token');
  });
}

module.exports = {
  get: getToken,
  write,
};
