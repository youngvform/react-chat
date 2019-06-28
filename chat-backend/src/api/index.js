const Router = require('koa-router');
const chats = require('./chats');

const api = new Router();

api.use('/chats', chats.routes());

// 라우터를 내보냅니다.
module.exports = api;
