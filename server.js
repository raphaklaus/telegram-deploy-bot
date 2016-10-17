require('dotenv').config();
const simpleGit = require('simple-git'),
  TelegramBot = require('node-telegram-bot-api'),
  bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
  bunyan = require('bunyan'),
  logger = bunyan.createLogger({
    name: 'Bot'
  });

var exec = require('child_process').exec;

logger.info(`I\'m alive!`);

bot.onText(/\/deploy/, (msg) => {
  var fromId = msg.from.id;
  simpleGit(process.env.REPO_DEPLOY_DIR)
    .push('deploy', 'master', (data) => {
      logger.info('Deployed!');
      bot.sendMessage(fromId, 'It\'s done! Check your app.');
  });
});
