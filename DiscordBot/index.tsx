const Discord = require('discord.js');
const creds = require('./credentials.json');

const client = new Discord.Client({
    intents : [
        "GUILDS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES"
    ]
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('messageCreate',  async (message : any) => {
    let content : string = message.content;

    // er joke
    if (content.length >= 2 && (content.substring(content.length - 2) == 'er')) {
        await message.reply(content + `? I hardly know her!`);
    }

    if(content.substring(0,1) !== '>') return;

    content = content.substring(1);

    if (content == 'ping') {
        let user = message.member.toString();
        console.log(user);
        await message.reply(`${user}, Pong!!!`);
    }

    if (content == 'cum') {
        await message.reply(`I'm gonna cooom!!`);
    }

    if (content == 'meow') {
        await message.reply(`=^.^= Nya~`);
    }

    if (content == 'squirt') {
        await message.reply(`please get help.`);
    }
})



client.login(creds.token);