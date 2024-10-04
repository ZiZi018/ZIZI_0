const axios = require('axios');

module.exports = {
  config: {
    name: 'gpt',
    aliases: ['askgpt'],
    version: '1.0',
    author: 'UPoL',
    role: 0,
    shortDescription: {
      en: 'Ask a question to GPT with multiple models'
    },
    longDescription: {
      en: 'Ask a question to GPT with multiple models and get responses from various GPT models.'
    },
    category: 'CHAT-GPT',
    guide: {
      en: "{pn} <question> | <model>\n\nModels:\n'1' : 'gpt-4',\n'2' : 'gpt-4-0613',\n'3' : 'gpt-4-32k',\n'4' : 'gpt-4-0314',\n'5' : 'gpt-4-32k-0314',\n'6' : 'gpt-3.5-turbo',\n'7' : 'gpt-3.5-turbo-16k',\n'8' : 'gpt-3.5-turbo-0613',\n'9' : 'gpt-3.5-turbo-16k-0613',\n'10' : 'gpt-3.5-turbo-0301',\n'11' : 'text-davinci-003',\n'12' : 'text-davinci-002',\n'13' : 'code-davinci-002',\n'14' : 'gpt-3',\n'15' : 'text-curie-001',\n'16' : 'text-babbage-001',\n'17' : 'ada',\n'18' : 'babbage',\n'19' : 'text-ada-001',\n'20' : 'davinci',\n'21' : 'curie',\n'22' : 'babbage-002',\n'23' : 'davinci-002'"
    }
  },
  onStart: async function ({ api, event, message, args, usersData }) {
    const input = args.join(' ');
    if (!input) return message.reply('Enter a question');

    const models = {
      '1': 'gpt-4',
      '2': 'gpt-4-0613',
      '3': 'gpt-4-32k',
      '4': 'gpt-4-0314',
      '5': 'gpt-4-32k-0314',
      '6': 'gpt-3.5-turbo',
      '7': 'gpt-3.5-turbo-16k',
      '8': 'gpt-3.5-turbo-0613',
      '9': 'gpt-3.5-turbo-16k-0613',
      '10': 'gpt-3.5-turbo-0301',
      '11': 'text-davinci-003',
      '12': 'text-davinci-002',
      '13': 'code-davinci-002',
      '14': 'gpt-3',
      '15': 'text-curie-001',
      '16': 'text-babbage-001',
      '17': 'ada',
      '18': 'babbage',
      '19': 'text-ada-001',
      '20': 'davinci',
      '21': 'curie',
      '22': 'babbage-002',
      '23': 'davinci-002'
    };

    const [question, modelKey] = input.split('|').map(part => part.trim());
    if (!question || !modelKey || !models[modelKey]) {
      return message.reply('Please enter a valid question and model.\n\nExample: {pn} <question> | <model>');
    }

    await message.reply('Please wait....⏳');
    
    const model = models[modelKey];
    const userName = await usersData.getName(event.senderID);

    try {
      const res = await axios.get(`https://upol-dev-gpt-api.onrender.com/api/gpt?prompt=${encodeURIComponent(question)}&model=${model}`);
      const answer = res.data.answer;
      const msg = `Hey, ${userName} 😺\n🔍 YOUR QUESTION:\n${question}\n\n💬 GPT ANSWER:\n${answer}`;
      message.reply(msg);
    } catch (error) {
      message.reply(`Error: ${error.message}`);
    }
  },
  onReply: async function ({ api, event, message, Reply, usersData }) {
    const question = Reply.question;
    const model = Reply.model;

    try {
      const res = await axios.get(`https://upol-dev-gpt-api.onrender.com/api/gpt?prompt=${encodeURIComponent(question)}&model=${model}`);
      const answer = res.data.answer;
      const userName = await usersData.getName(event.senderID);
      const msg = `Hey, ${userName} 😺\n🔍 YOUR QUESTION:\n${question}\n\n💬 GPT ANSWER:\n${answer}`;
      message.reply(msg);
    } catch (error) {
      message.reply(`Error: ${error.message}`);
    }
  }
};
