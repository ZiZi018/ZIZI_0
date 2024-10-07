 const axios = require('axios');
const UPoLPrefix = [
  'ai',
  'ask'
]; 

  module.exports = {
  config: {
    name: 'ai',
    version: '1.2.1',
    role: 0,
    category: 'AI',
    author: 'UPoL 🌸',
    shortDescription: '',
    longDescription: '',
  },
  
  onStart: async function () {},
  onChat: async function ({ message, event, args, api, threadID, messageID }) {
      
      const ahprefix = UPoLPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!ahprefix) {
        return; 
      } 
      
     const upol = event.body.substring(ahprefix.length).trim();
   if (!upol) {
        await message.reply('🦆 Put a question to get answer.');
        return;
      }
      
    const encodedPrompt = encodeURIComponent(args.join(" "));
  
    const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodedPrompt}`);
   
    await message.reply('testing......');
 
     const UPoL = response.data.answer; 

      const upolres = `UPoL       |         AI\n====================\n\n\n${UPoL}`;
      
        message.reply(upolres);
  }
};
