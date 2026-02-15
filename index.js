import mineflayer from 'mineflayer';
import express from 'express';

const app = express();
app.get('/', (req, res) => res.send('Bot đang chạy!'));
app.listen(3000, () => console.log('Cổng 3000 đã mở'));

const botOptions = {
    host: 'anhchaovu.aternos.me',
    port: 53131, // Kiểm tra lại cổng này trên Aternos của bạn
    username: 'AFKBot',
    version: false // Để bot tự động dò phiên bản cho nhanh
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log('✅ Bot đã vào server!');
        bot.chat('Bot AFK đã sẵn sàng!');
    });

    bot.on('end', () => {
        console.log('❌ Bot mất kết nối, đang thử lại sau 5 giây...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => console.log('Lỗi kết nối: ' + err.message));
}

createBot();
app.listen(config.features.webDashboard.port, () => {
  console.log(`🌐 Dashboard: http://localhost:${config.features.webDashboard.port}`);
});

createMyBot();
