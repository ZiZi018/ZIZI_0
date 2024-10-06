const axios = require("axios");
const fs = require("fs-extra");
module.exports = {
  config: {
    name: "cdp",
    author: "UPoL🐔", 
    role: 0,
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      const { data } = await axios.get("https://c-v3.onrender.com/v1/cdp/get");
      const maleImg = await axios.get(data.male, { responseType: "arraybuffer" });
      fs.writeFileSync(__dirname + "/tmp/img1.png", Buffer.from(maleImg.data, "utf-8"));
      const femaleImg = await axios.get(data.female, { responseType: "arraybuffer" });
      fs.writeFileSync(__dirname + "/tmp/img2.png", Buffer.from(femaleImg.data, "utf-8"));
      const randomMessages = [
        "Here is your couple dp 💜(◕ᴗ◕✿)",
        "A perfect match just for you! 💞",
        "Looking for love? Here’s a couple dp for you! 💕",
        "Love is in the air 💖. Check out this couple dp!",
        "Here’s your romantic couple dp, enjoy! 💌",
        "Pair up with these adorable couple dps! 🌹"
      ];
      const msg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      const allImages = [
        fs.createReadStream(__dirname + "/tmp/img1.png"),
        fs.createReadStream(__dirname + "/tmp/img2.png")
      ];
      return api.sendMessage({
        body: msg,
        attachment: allImages
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      return api.sendMessage("Oops! Something went wrong while fetching the couple dp. Please try again later.", event.threadID, event.messageID);
    }
  }
};
