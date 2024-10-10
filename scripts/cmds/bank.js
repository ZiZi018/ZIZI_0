 const CassidyBridge = require("cassidy-bridge");

// Supports Local Balance!
// npm install cassidy-bridge@latest

module.exports = {
  config: {
    name: 'bank',
    version: '1.0',
    aliases: ["cassexpress", "cassbank"],
    author: 'LiANE @nealianacagara',
    role: 0,
    category: 'Cassidy',
    shortDescription: {
      en: `CassExpress Bank System!`
    },
    longDescription: {
      en: `CassExpress Bank System!`
    },
    guide: {
      en: '{pn} [query]'
    },
  },
  async onStart({ message, event, usersData, commandName, args }) {
    const cass = CassidyBridge.fromGoatBot({ usersData, soloMode: true });
    const info = await cass.goatQuery(message, {
      ...event, 
      body: `cbank ${args.join(" ")}`,
    });
    global.GoatBot.onReply.set(info?.messageID, {
      cass,
      commandName,
    });
  },
  async onReply({ Reply, message, event, args, commandName }) {
    const { cass } = Reply;
    const info = await cass.goatQuery(message, {
      ...event, 
      body: `${event.body}`,
    });
    global.GoatBot.onReply.set(info?.messageID, {
      cass,
      commandName,
    });
  }
};
