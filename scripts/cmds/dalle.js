const axios = require('axios');

const fs = require('fs-extra');

const path = require('path');



module.exports = {

  config: {

    name: "dalle",

    aliases: ["bing2", "create"],

    version: "1.0",

    author: "Dipto",

    countDown: 15,

    role: 0,

    description: "Generate images by Unofficial Dalle3",

    category: "𝗕𝗜𝗡𝗚",

    guide: {

      en: "{pn} [prompt]"

    }

  },



  onStart: async function ({ api, event, args }) {

  const prompt = event.messageReply?.body.split("dalle")[1] ||  args.join(" ");

  if (!prompt) {

   return api.sendMessage("❌| Wrong Format .✅ | Use 17/18 years old boy/girl watching football match on tv and written ASIF and 69 on the back of his Dress , 4k",event.threadID,event.messageID);

  }

    try {

      const fff = [
"1mZViZfZlrNkqpw17oeYMcWw6b_06OQveTQrZC14XjnJLda3MusRqK2jzI__bPdY25MTdxxMEa8Z_-De1TU6NbGjZ8N8Od9wvdBzYxFgM7_YdnQmkdI0p4rToKGFtCOVzmGzIPHFpI6OpkkPhxKBPwZCTMFzqOfbms3bw9r1Ypq8JRiGkvoaIxh2ELTQ0KUTHWEz9-yefb79hRcS4x1d55g",                 "1mZViZfZlrNkqpw17oeYMcWw6b_06OQveTQrZC14XjnJLda3MusRqK2jzI__bPdY25MTdxxMEa8Z_-De1TU6NbGjZ8N8Od9wvdBzYxFgM7_YdnQmkdI0p4rToKGFtCOVzmGzIPHFpI6OpkkPhxKBPwZCTMFzqOfbms3bw9r1Ypq8JRiGkvoaIxh2ELTQ0KUTHWEz9-yefb79hRcS4x1d55g"
      ];

        const col = fff[Math.floor(Math.random() * fff.length)]

      const w = await api.sendMessage("Wait koro baby < 😽", event.threadID);

  

const response = await axios.get(`${global.GoatBot.config.api}/dalle?prompt=${prompt}&key=dipto008&cookies=${col}`)

      const data = response.data.imgUrls;

      if (!data || data.length === 0) {

        api.sendMessage("Empty response or no images generated.",event.threadID,event.messageID);

      }

      const diptoo = [];

      for (let i = 0; i < data.length; i++) {

        const imgUrl = data[i];

        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });

        const imgPath = path.join(__dirname, 'dvassests', `${i + 1}.jpg`);

        await fs.outputFile(imgPath, imgResponse.data);

        diptoo.push(fs.createReadStream(imgPath));

      }

      await api.unsendMessage(w.messageID);

      await api.sendMessage({

  body: `✅ | Here's Your Generated Photo<😘`,

        attachment: diptoo

      },event.threadID, event.messageID);

    } catch (error) {

      console.error(error);

      await api.sendMessage(`Generation failed!\nError: ${error.message}`,event.threadID, event.messageID);

    }

  }

}
