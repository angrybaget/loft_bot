var mysql      = require('mysql');
var bb = require('bot-brother');
const fs = require('fs');
const opt = {
    parse_mode: 'HTML',
    //disable_notification: false
}

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'baget',
    password : 'baget',
    database : 'bot'
});
var bot = bb({
    key: '302730518:AAFet3ystJlBX3PQNffdXfg9DG5kFb0pUlI',
    sessionManager: bb.sessionManager.memory(),
    polling: {interval: 0, timeout: 1}
});
connection.connect();

setInterval(timers1(bot), 7000);
function timers1(bot){
//    //bot.withContext(function (ctx) {
//    //   console.log('2');
//    //});
//    //bot.command('sendMailTo')
//    //    .invoke(function (ctx) {
//    //        return ctx.go('sendMail')
//    //    });
//   //bot.api.invoke(function (ctx) {
//   //     return ctx.go('sendMail');
//   // });
//   // bot.api.go('sendMail');
//   // bot.api.answer(function (ctx) {
//   //     return ctx.bot.go('sendMail');
//   // });
    var ctx = bot.sessionManager.get(330957326);
//
    console.log(ctx);
}

function saveImage(filename, data){
    var myBuffer = new Buffer(data.length);
    for (var i = 0; i < data.length; i++) {
        myBuffer[i] = data[i];
    }
    fs.writeFile("D:\\" + filename, myBuffer, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}

bot.keyboard('footer', [{':arrow_backward:': {go: 'start'}}]);
bot.keyboard('cancelButton', [
    [{
        'button.cancel': {go: 'start'}
    }]
])
// Let's create command '/start'.
bot.command('start')
    //TODO get id(user) if not exist - add to database
    .invoke(function (ctx) {
        var ID = ctx.meta.user.id;
        // Setting data, data is used in text message templates.
        ctx.data.user = ctx.meta.user;
        // Invoke callback must return promise.
        console.log(ID);

        return ctx.sendMessage('Hello <%=user.first_name%>. How are you?');
    })

    .answer(function (ctx) {
        ctx.data.answer = ctx.answer;
        // Returns promise.

        if (ctx.data.answer == 'bad'){
            var img;

            connection.query('SELECT * from settings', function(err, rows, fields) {
                img = rows[1].body;

                if (!err){
                    console.log('The solution is: ', rows[1].body);
                    saveImage("image.jpg", img);
                    return ctx.sendPhoto(img);
                }
                else{
                    console.log('no');
                    return ctx.sendMessage('error')
                }
            });
        }
        else{
            return ctx.sendMessage('send').then(function(res){
                console.log(res);
                ctx.forwardMessage('@DaimonXXX', res.message_id)
            });
        }
    })
    .answer(function (ctx) {
        return ctx.sendMessage('Lol');
    }).keyboard([
    [{'bad2': 'bad'}],
    [{'good': 'good'}],
    [{'send': 'send'}],
    [{'back': {go: 'start'}}]
])

// TODO function wich send msg to all users

bot.command('sendMail')
    .invoke(function(){
        return bot.api.sendMessage(
            '330957326',
            '<b style="width: 100%">Table "MilanB1"</b><i style="width: 100%">Only this weekend</i><a style="width: 100%" href="http://designloft.com.ua/Pismennye-stoly-loft/Stol-Milan-B1-Signal-Polsha-Milan-B1" target="_blank">More Info</a>',
            opt);
        //console.log('send')

    });




// Creating command '/upload_photo'.
bot.command('upload_photo')
    .invoke(function (ctx) {
        return ctx.sendMessage('Drop me a photo, please');
    })
    .answer(function (ctx) {
        // ctx.message is an object that represents Message.
        // See https://core.telegram.org/bots/api#message
        return ctx.sendPhoto(ctx.message.photo[0].file_id, {caption: 'I got your photo!'});
    });