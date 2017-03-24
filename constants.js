

var bb = require('bot-brother');

var bot = bb({
    key: '302730518:AAFet3ystJlBX3PQNffdXfg9DG5kFb0pUlI',
    sessionManager: bb.sessionManager.memory(),
    polling: {interval: 0, timeout: 1}
});

