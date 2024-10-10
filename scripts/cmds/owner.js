const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		author: "Rifad",
		role: 0,
		shortDescription: "info and my owner the cmd",
		longDescription: "",
		category: "admin",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: '𝐀𝐫𝐨𝐡𝐢 𝐒𝐡𝐞𝐢𝐤𝐡',
				gender: '𝐅𝐞𝐦𝐚𝐥𝐞',
				age: '𝟏𝟕',
				instagram: '𝐈𝐭𝐳._.𝐚𝐫𝐨𝐡𝐢_𝟎',
				Relationship: '𝐒𝐢𝐧𝐠𝐥𝐞',
				religion: '𝐈𝐬𝐥𝐚𝐦',
				facebook: 'https://www.facebook.com/profile.php?id=100078193001468'
			};

			const bold = 'https://i.imgur.com/SI8wYfM.jpeg';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const imgResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const imgPath = path.join(tmpFolderPath, 'owner_img.jpeg');

			fs.writeFileSync(imgPath, Buffer.from(imgResponse.data, 'binary'));

			const response = `╭─────❁\n│  𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢  \n│
│𝐍𝐚𝐦𝐞: ${ownerInfo.name}
│𝐆𝐞𝐧𝐝𝐞𝐫 : ${ownerInfo.gender}
│𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 :${ownerInfo.Relationship}
│𝐀𝐠𝐞 :${ownerInfo.age}
│𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧: ${ownerInfo.religion}
│𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 : ${ownerInfo.instagram}
│𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: ${ownerInfo.facebook}\n╰────────────❁`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(imgPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(imgPath);

			api.setMessageReaction('🐔', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	}
};
