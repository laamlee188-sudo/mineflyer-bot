import mineflayer from 'mineflayer';
import express from 'express';

const app = express();
app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(3000);

const createBot = () => {
    const bot = mineflayer.createBot({
        host: 'anhchaovu.aternos.me',
        port: 33187, 
        username: 'AFKBot',
        version: false 
    });

    bot.on('spawn', () => console.log('✅ Bot đã vào game!'));
    bot.on('end', () => setTimeout(createBot, 5000));
    bot.on('error', (err) => console.log('Lỗi:', err.message));
};

createBot();
