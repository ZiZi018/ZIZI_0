 module.exports = {
  config: {
    name: 'ping',
    aliases: ['latency'],
    version: '1.0',
    author: 'Mahi--',
    role: 0,
    shortDescription: 'Check bot ping in real time',
    longDescription: 'Displays the bot\'s ping and updates it in real time for 5 times.',
    category: 'system'
  },
  onStart: async function ({ message, api }) {
    try {
      const startTime = Date.now(); // Track start time

      // Initial message
      let sentMessage = await message.reply('Calculating ping...');

      // Function to update ping 5 times
      const updatePing = async (count = 0) => {
        if (count < 5) {
          const botPing = Date.now() - startTime; // Calculate ping
          
          // Edit the message with the updated ping value
          await api.editMessage(`Ping: ${botPing}ms\n[Update ${count + 1}/5]`, sentMessage.messageID);
          
          // Set a short delay and call the function again for the next update
          setTimeout(() => updatePing(count + 1), 1000); // 1-second delay for real-time effect
        } else {
          // Final message after 5 updates
          api.editMessage(`✅ Final ping: ${Date.now() - startTime}ms`, sentMessage.messageID);
        }
      };

      // Start updating the ping
      updatePing();

    } catch (err) {
      console.error(err);
      return message.reply("❌ An error occurred while checking the ping.");
    }
  }
};
