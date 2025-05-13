import { Bot } from 'grammy';

const TELEGRAM_BOT_TOKEN = '7883292217:AAF0paNwkHAT-jhtFkWeh0yNLbUDhkkqZbQ';
const CHAT_ID = '7668454529';

const bot = new Bot(TELEGRAM_BOT_TOKEN);

export const sendTelegramMessage = async (message: string) => {
  try {
    await bot.api.sendMessage(CHAT_ID, message);
    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
};

export const sendTelegramNotification = async (type: 'content' | 'action' | 'community', title: string, description: string) => {
  const message = `
🔔 New ${type} Update

${title}

${description}

#ImpactConnect #${type}
`;

  return sendTelegramMessage(message);
};