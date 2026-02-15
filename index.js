import mineflayer from 'mineflayer';
import express from 'express';

const app = express();
app.get('/', (req, res) => res.send('Bot AFK đang chạy!'));
app.listen(3000, () => console.log('Cổng Web 3000 đã mở'));

const createBot = () => {
    console.log('--- Đang thử kết nối vào Server... ---');
    const bot = mineflayer.createBot({
        host: 'anhchaovu.aternos.me',
        port: 33107,
        username: 'AFKBot',
        version: false 
    });

    bot.on('spawn', () => {
        console.log('✅ THÀNH CÔNG: Bot đã vào được server!');
        bot.chat('Bot AFK đã online và sẵn sàng!');
    });

    bot.on('end', () => {
        console.log('❌ Mất kết nối! Đang tự động thử lại sau 5 giây...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        console.log('⚠️ Lỗi kết nối: ' + err.message);
    });
};

createBot();
