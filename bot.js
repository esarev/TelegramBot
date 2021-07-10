require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const api = require('covid19-api');
const COUNTRIES_LIST = require('./constants');
// const Markup = require('telegraf/src/markup');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`
Привет ${ctx.message.from.first_name}!😉
Узнай статистику по Covid-19.
Введи страну на английском языке и получи информацию.
Посмотреть весь список стран можно командой /help
`, 
    Markup.keyboard([
      ['US', 'Russia'],
      ['Germany', 'Italy'],
      ['Ukraine', 'Kazakhstan'],
    ])
    .resize()
  )
);

bot.help((ctx) => ctx.reply(COUNTRIES_LIST));

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
    ctx.reply('Ошибка, ввод не верен! Попробуйте ввести на "eng" или обратитесь к /help.');
  }
});

bot.launch();
console.log('Бот запущен');


