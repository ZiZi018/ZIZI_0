module.exports = {
  config: {
    name: "spy",
    aliases: ["whoishe", "whoisshe", "whoami", "atake"],
    version: "1.0",
    role: 0,
    author: "Dipto",
    Description: "Get user information and profile photo",
    category: "information",
    countDown: 10,
  },

  onStart: async function ({ event, message, usersData, api, args }) {
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    let uid;

    if (args[0]) {
      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) {
          uid = match[1];
        }
      }
    }

    if (!uid) {
      uid =
        event.type === "message_reply"
          ? event.messageReply.senderID
          : uid2 || uid1;
    }

    let babyTeach = 0;
    try {
      const response = await require("axios").get(`${global.api.dipto}/baby?list=all`);
      const dataa = response.data || { teacher: { teacherList: [] } };
      if (dataa?.teacher?.teacherList?.length) {
        babyTeach = dataa.teacher.teacherList.find((t) => t[uid])?.[uid] || 0;
      }
    } catch (error) {
      console.error("Error fetching baby teach data: ", error.message);
    }

    let userInfo, avatarUrl, money = 0, rank = 0, moneyRank = 0, position = "Normal User🥺";
    try {
      userInfo = await api.getUserInfo(uid);
      avatarUrl = await usersData.getAvatarUrl(uid);
      const allUser = await usersData.getAll();
      allUser.sort((a, b) => b.exp - a.exp);
      rank = allUser.findIndex((user) => user.userID == uid) + 1;
      allUser.sort((a, b) => b.money - a.money);
      moneyRank = allUser.findIndex((user) => user.userID == uid) + 1;
      money = (await usersData.get(uid)).money;
      position = userInfo[uid]?.type || position;
    } catch (error) {
      console.error("Error fetching user data: ", error.message);
      message.reply("Unable to fetch user data at the moment.");
      return;
    }

    const genderText = userInfo[uid]?.gender === 1 
      ? "𝙶𝚒𝚛𝚕🙋🏻‍♀️" 
      : userInfo[uid]?.gender === 2 
      ? "Boy🙋🏻‍♂️" 
      : "𝙶𝚊𝚢🤷🏻‍♂️";

    const userInformation = `
╭─[ 𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎 ]
├‣ 𝙽𝚊𝚖𝚎: ${userInfo[uid]?.name || "Unknown"}
├‣ 𝙶𝚎𝚗𝚍𝚎𝚛: ${genderText}
├‣ 𝚄𝙸𝙳: ${uid}
├‣ 𝙲𝚕𝚊𝚜𝚜: ${position ? position?.toUpperCase() : "𝙽𝚘𝚛𝚖𝚊𝚕 𝚄𝚜𝚎𝚛🥺"}
├‣ 𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎: ${userInfo[uid]?.vanity || "𝙽𝚘𝚗𝚎"}
├‣ 𝙿𝚛𝚘𝚏𝚒𝚕𝚎 𝚄𝚁𝙻: ${userInfo[uid]?.profileUrl || "𝙽𝚘𝚗𝚎"}
├‣ 𝙱𝚒𝚛𝚝𝚑𝚍𝚊𝚢: ${userInfo[uid]?.isBirthday !== false ? userInfo[uid].isBirthday : "𝙿𝚛𝚒𝚟𝚊𝚝𝚎"}
├‣ 𝙵𝚛𝚒𝚎𝚗𝚍 𝚠𝚒𝚝𝚑 𝚋𝚘𝚝: ${userInfo[uid]?.isFriend ? "𝚈𝚎𝚜✅" : "𝙽𝚘❎"}
├‣ 𝙽𝚒𝚌𝚔𝙽𝚊𝚖𝚎: ${userInfo[uid]?.alternateName || "𝙽𝚘𝚗𝚎"}
╰‣ 

╭─[ 𝐔𝐒𝐄𝐑 𝐒𝐓𝐀𝐓𝐒 ]
├‣ 𝙼𝚘𝚗𝚎𝚢: $${formatMoney(money)}
├‣ 𝚁𝚊𝚗𝚔: #${rank}/${allUser.length}
├‣ 𝙼𝚘𝚗𝚎𝚢 𝚁𝚊𝚗𝚔: #${moneyRank}/${allUser.length}
╰‣ 𝙱𝚊𝚋𝚢 𝚝𝚎𝚊𝚌𝚑: ${babyTeach || 0}`;

    message.reply({
      body: userInformation,
      attachment: await global.utils.getStreamFromURL(avatarUrl).catch((err) => {
        console.error("Error loading avatar: ", err.message);
      }),
    });
  },
};

function formatMoney(num) {
  const units = ["", "K", "M", "B", "T", "Q", "Qi", "Sx", "Sp", "Oc", "N", "D"];
  let unit = 0;
  while (num >= 1000 && ++unit < units.length) num /= 1000;
  return num.toFixed(1).replace(/\.0$/, "") + units[unit];
}
