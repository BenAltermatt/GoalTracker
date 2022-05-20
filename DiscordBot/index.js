"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require('discord.js');
const creds = require('./credentials.json');
const { MongoClient } = require('mongodb');
const dbclient = new MongoClient(creds.MongoConnection);
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES"
    ]
});
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
// LISTENERS
client.on('messageCreate', handleMessage);
// NEW MESSAGE LISTENER
async function handleMessage(message) {
    let content = message.content;
    let user = message.member.user;
    await awardPoints(10, user);
    // er joke
    if (content.length >= 2 && (content.substring(content.length - 2) === 'er')) {
        if (user.tag == 'Gizmoda#9097')
            await message.reply(content + `? I hardly know her!`);
    }
    if (content.substring(0, 1) !== '>')
        return;
    content = content.substring(1);
    if (content == 'ping') {
        let user = message.member.toString();
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
    if (content.substring(0, 2) == 'sc') {
        let mentions = message.mentions;
        mentions.members.forEach(async (val) => {
            await reportPoints(val.user, message);
        });
    }
}
// this will report the number of points that a user
// has. If they have not been found in the database, they
// are told that the user has not been registered within the
// social credit system
async function reportPoints(user, queryMessage) {
    await dbclient.connect();
    const collection = await dbclient.db(creds.DatabaseName).collection(creds.UserColName);
    // find out if the user is registered
    let query = await collection.findOne({ tag: user.tag });
    console.log(query);
    await dbclient.close();
    if (query === null) // not registered
     {
        await queryMessage.reply(`${user.tag} is not formally registered in the social credit system 
                            and therefore does not legally exist!\nTo be registered, send a 
                            message in any server with MonkeBot in it!`);
    }
    else // registered
     {
        // we can manage our responses based on how good the credit is
        let credVal = query.credit;
        // great credit
        if (credVal > 10000) {
            await queryMessage.reply(`${user.tag} has great social credit at ${credVal} points! What a good citizen!!`);
        }
        else if (credVal > 0) // good credit
         {
            await queryMessage.reply(`${user.tag} has okay social credit. Not the best, but ${credVal} isn't anything to sneeze at!`);
        }
        else // bad credit
         {
            await queryMessage.reply(`${user.tag} is in danger of becoming an unperson! Very bad credit!!! ${credVal} points.`);
        }
    }
}
// this will take a user and update their social credit
// score by the passed number of points
async function awardPoints(numPoints, user) {
    await dbclient.connect();
    console.log('Successful database connection');
    const db = await dbclient.db(creds.DatabaseName);
    const collection = await db.collection(creds.UserColName);
    console.log(await collection.updateOne({ tag: user.tag }, { $inc: { credit: numPoints } }, { upsert: true }));
    dbclient.close();
}
client.login(creds.token);
