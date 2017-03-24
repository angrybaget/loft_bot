var bb = require('bot-brother');
const fs = require('fs');
const sessionsDir = './cache';

const opt = {
    parse_mode: 'HTML',
    disable_notification: false
};
var bot = bb({
    key: '302730518:AAFet3ystJlBX3PQNffdXfg9DG5kFb0pUlI',
    sessionManager: bb.sessionManager.memory({dir: sessionsDir}),
    polling: {interval: 0, timeout: 1}
});
var prefix = '';


function sendMsg(id, msg) {
        bot.withContext(id, function (ctx2) {
            bot.api.sendMessage(id, msg, opt).then(function(res){}, function (err) {
                deleteSession(id);
            })

        })
}

function arrayUsers() {
    var files = [],
        files = fs.readdirSync(sessionsDir);
    if (files.length > 0){
        prefix = files[0].split('.')[0];
    }
    files = files.map(function (file) {
        var a = file.replace(/[0-9]+\./, '');
        a = a.replace(".json", "");
        return a
    });

    return files
};

function deleteSession(id){
    var nameDel = sessionsDir + '/' + prefix + '.' + id +'.json';
        fs.unlink(nameDel, function(response) {console.log(response)});
        console.log('deleted file directory ' + sessionsDir + '/' + nameDel)
};

var interval = setInterval(timer, 300000, bot);
function timer(bot) {
    var news = [],
        usersSend = [],
        news = shedule();
    if (news.length > 0) {
        usersSend = arrayUsers();
        if (usersSend.length > 0) {
            for (user in usersSend) {
                for (msg in news) {
                    sendMsg(usersSend[user], news[msg]);
                }
            }
        }

    }
    //TODO wrap with function wich check database status

}


//News wich like to send
function shedule() {
    var arr = [];
    arr.push('<b>Bold New</b><i>Italic New</i>');
    arr.push('<b>Bold Old</b><i>Italic Old</i>');

    return arr;
}


bot.keyboard('footer', [{'Подписаться на новости': {go: 'start'}}]);
bot.keyboard('cancelButton', [
    [{
        'Подписаться на новости': {go: 'start'}
    }]
])

//COMMANDS
bot.command('start')
    .invoke(function (ctx) {
        ctx.data.user = ctx.meta.user;
        return ctx.sendMessage('Привет <%=user.first_name%>. Ты подписался на новости Design Loft, теперь ты будешь в курсе новинок)');
    })

    .answer(function (ctx) {
        ctx.data.answer = ctx.answer;
    })
    .answer(function (ctx) {
        return ctx.sendMessage('Lol');
    }).keyboard([
    [{'Поблагодарить :point_up:': {go: 'tnx'}}]
]);

bot.command('tnx')
    .invoke(function (ctx) {
        return ctx.sendMessage('Спасибо ждите новостей :point_up:');
    });