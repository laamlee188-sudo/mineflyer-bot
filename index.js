{
  "name": "afk-bot",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "mineflayer": "latest",
    "express": "latest"
  },
  "scripts": {
    "start": "node index.js"
  }
}{
  "name": "afk-bot",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "mineflayer": "latest",
    "express": "latest"
  },
  "scripts": {
    "start": "node index.js"
  }
}
    version: config.server.version,
    auth: config.server.auth
  });

  // --- Logic Chống AFK ---
  bot.on('spawn', () => {
    console.log("✅ Bot đã vào server!");
    if (config.features.antiAfk.enabled) {
      const antiAfkAction = () => {
        if (!bot.entity) return;
        
        const actions = ['jump', 'sneak', 'look', 'swing', 'move'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];

        switch (randomAction) {
          case 'jump': bot.setControlState('jump', true); setTimeout(() => bot.setControlState('jump', false), 500); break;
          case 'sneak': bot.setControlState('sneak', true); setTimeout(() => bot.setControlState('sneak', false), 1000); break;
          case 'look': bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * Math.PI); break;
          case 'swing': bot.swingArm(); break;
          case 'move': 
            bot.setControlState('forward', true); 
            setTimeout(() => bot.setControlState('forward', false), 1000); 
            break;
        }

        const next = Math.random() * (config.features.antiAfk.maxInterval - config.features.antiAfk.minInterval) + config.features.antiAfk.minInterval;
        setTimeout(antiAfkAction, next);
      };
      antiAfkAction();
    }
  });

  // --- Tự động Chat ---
  if (config.features.autoChat.enabled) {
    setInterval(() => {
      if (bot.entity) {
        const msg = config.features.autoChat.messages[Math.floor(Math.random() * config.features.autoChat.messages.length)];
        bot.chat(msg);
      }
    }, config.features.autoChat.interval);
  }

  // --- Tự động kết nối lại ---
  bot.on('end', () => {
    console.log('❌ Mất kết nối. Đang thử lại...');
    if (config.features.autoReconnect.enabled) {
      if (config.features.randomUsernameOnKick.enabled) {
        currentUsername = `${config.bot.baseUsername}_${generateRandomSuffix(4)}`;
      }
      setTimeout(createMyBot, config.features.autoReconnect.delay);
    }
  });

  bot.on('error', (err) => console.log(`Lỗi: ${err.message}`));
}

// --- Web Dashboard (Để Render không bị tắt) ---
const app = express();
app.get('/', (req, res) => {
  res.send(`Bot đang chạy! Username: ${currentUsername} | Máu: ${bot?.health || '??'}`);
});
app.listen(config.features.webDashboard.port, () => {
  console.log(`🌐 Dashboard: http://localhost:${config.features.webDashboard.port}`);
});

createMyBot();
