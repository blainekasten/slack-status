# slack-status
CLI for updating your slack status

**Requirements**

1. Installed globally
2. Slack test token generated (from [here](https://api.slack.com/docs/oauth-test-tokens))

### Steps:

##### Install globally

```bash
yarn global add slack-status
// or
npm install -g slack-status
```

##### Give slack-status your token

```bash
slack-status token=mylong-token
```

##### Now update your status!

```bash
slack-status Away
// You are now away!

slack-status Just yoloing
// You are now Just yoloing

slack-status
// Welcome Back!
```
