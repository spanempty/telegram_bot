const TelegramBot = require('node-telegram-bot-api');
const { messageTypes } = require('node-telegram-bot-api/src/telegram');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration);

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async function (message, match) {
    const chatId = message.chat.id;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `user:${message.text}`,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    console.log(message.text, message.chat.id);
    console.log(response.data.choices[0].text);
    bot.sendMessage(chatId, response.data.choices[0].text); 
    return;
    
})
