const Router = require('koa-router');
const chatsCtrl = require('./chats.ctrl');

const chats = new Router();

chats.get('/', chatsCtrl.list);
chats.post('/', chatsCtrl.create);
chats.get('/chatroom/:id', chatsCtrl.checkObjectId, chatsCtrl.receive);
chats.patch('/chatroom/:id', chatsCtrl.checkObjectId, chatsCtrl.send);
chats.patch('/:id', chatsCtrl.checkObjectId, chatsCtrl.enter);
chats.patch('/:id/:userId', chatsCtrl.checkObjectId, chatsCtrl.exit);
chats.delete('/:id', chatsCtrl.checkObjectId, chatsCtrl.remove);

module.exports = chats;