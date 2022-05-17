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
    //if(!interaction.isCommand()) return;

    console.log('Pisspooopee')
    if (message.content == 'ping') {
        console.log('triggered')
        await message.reply('Kill Yourself. NOW!!!');
    }
})



client.login(creds.token);