const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-';

var iscounting = false;
i = 0;
l = 0;
author = "";
channel = "";
const checkmark = client.emojis.cache.find(emoji => emoji.name === "✅");
client.once('ready', () => {
    console.log('online');
});
client.on('message', message => {
    if (iscounting) {
        if (!isNaN(message.content) && !message.author.bot && message.channel.toString() == channel) {
            i = parseInt(message.content);
            if (i - 1 == l) {
                if (message.author.toString() != author) {
                    message.react("✅");
                    console.log('reacted');
                    author = message.author.toString();
                    l = i;
                }
                else {
                    message.react("❌");
                    message.channel.send('you cant send twice!; counting from:' + l);
                }
            }
            else {
                message.react("❌");
                message.channel.send('not correct!');
                resetcount();
            }
 
        }
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'startcount') {
        if (iscounting) {
            message.channel.send('already counting');

            
        }
        else {
            iscounting = true;
            l = 0;
            message.channel.send('started counting');
            channel = message.channel.toString();
        }
    }
    if (command === 'stopcount') {
        resetcount();
    }
    
})

function resetcount(){
    iscounting = false;
    i = 0;
    channel = "";
    author = "";
};
client.login('ODIyNDI5MjQyMDA0MzQwNzc3.YFSI6w.J3GfbpSCYCLujqT-UerkvqN8dhM');
