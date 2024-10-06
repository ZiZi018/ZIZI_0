module.exports = {
  config: {
    name: "stalk",
    role: 0,
    author: "UPoL🐔",
		guide: {
			en: "{pn} [blank | @tag | reply_message]
		}
  },
  onStart: async function ({ event, message, usersData, api, args }) {
    let uid = args[0]?.match(/^\d+$/) ? args[0] : Object.keys(event.mentions)[0] || event.senderID;
    try {
      const userInfo = await api.getUserInfo(uid);
      const avatarUrl = await usersData.getAvatarUrl(uid);
      const genderText = userInfo[uid]?.gender === 1 
        ? "Female 👩" 
        : userInfo[uid]?.gender === 2 
        ? "Male 👨" 
        : "Gay 🌈";
      const userInformation = `
      ╔═══════════════════════╗
          🔎 𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎 🔍
      ╚═══════════════════════╝
      » 𝙽𝚊𝚖𝚎: ${userInfo[uid]?.name || "Unknown"}
      » 𝙶𝚎𝚗𝚍𝚎𝚛: ${genderText}
      » 𝚄𝙸𝙳: ${uid}
      » 𝙲𝚕𝚊𝚜𝚜: ${userInfo[uid]?.type?.toUpperCase() || "Normal User"}
      » 𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎: ${userInfo[uid]?.vanity || "None"}
      » 𝙿𝚛𝚘𝚏𝚒𝚕𝚎 𝚄𝚁𝙻: ${userInfo[uid]?.profileUrl || "None"}
      » 𝙱𝚒𝚛𝚝𝚑𝚍𝚊𝚢: ${userInfo[uid]?.isBirthday !== false ? userInfo[uid].isBirthday : "Private"}
      » 𝙵𝚛𝚒𝚎𝚗𝚍 𝚠𝚒𝚝𝚑 𝚋𝚘𝚝: ${userInfo[uid]?.isFriend ? "Yes ✅" : "No ❌"}
      » 𝙽𝚒𝚌𝚔𝙽𝚊𝚖𝚎: ${userInfo[uid]?.alternateName || "None"}
      `;
      message.reply({
        body: userInformation.trim(),
        attachment: await global.utils.getStreamFromURL(avatarUrl).catch((err) => {
          console.error("Error loading avatar:", err.message);
        }),
      });
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      message.reply("⚠️ Unable to retrieve user information.");
    }
  },
};
