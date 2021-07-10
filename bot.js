require('dotenv').config();
const { Telegraf } = require('telegraf');
const api = require('covid19-api');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}`));

bot.on('text', async (ctx) => {
  let data = {};

  try {
  data = await api.getReportsByCountries(ctx.message.text);

  let formatData = `
Страна: ${data[0][0].country}
Заболевших: ${data[0][0].cases}
Смертей: ${data[0][0].deaths}
Вылечились: ${data[0][0].recovered}
  `;
  ctx.reply(formatData);
  } catch {
    console.warn('Error');
    ctx.reply('Ошибка! Такой страны не существует.');
  }
});

bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
console.log('Бот запущен');


