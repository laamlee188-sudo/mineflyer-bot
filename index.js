import mineflayer from 'mineflayer';
import express from 'express';

const app = express();
app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(3000);

const createBot = () => {
    const bot = mineflayer.createBot({
        host: 'anhchaovu.aternos.me',
        port: 33107, // Đã cập nhật theo cổng của bạn
        username: 'AFKBot',
        version: false 
    });

    bot.on('spawn', () => {
        console.log('✅ Đã vào game thành công!');
        bot.chat('Bot AFK đã online!');
    });
    
    bot.on('end', () => {
        console.log('❌ Mất kết nối, đang thử lại...');
        setTimeout(createBot, 5000);
    });
    
    bot.on('error', (err) => console.log('Lỗi:', err.message));
};

createBot();
