const Chat = require('models/chat');
const Joi = require('joi');

const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  if(!ObjectId.isValid(id)) {
    ctx.status = 400;
    return null;
  }

  return next();
};

exports.create = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    user: Joi.string().required(),
    userIds: Joi.array().items(Joi.string()).required()
  });

  const result = Joi.validate(ctx.request.body, schema);
  // 오류 발생 시 오류 내용 응답
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, user, userIds } = ctx.request.body;
  const chat = new Chat({
    title, user, userIds
  })

  try{
    await chat.save();
    ctx.body = chat;
  } catch(e) {
    ctx.throw(e, 500);
  }
};

exports.list = async (ctx) => {
  const query = {};

  try {
    const chats = await Chat.find(query)
      .sort({ _id: -1 })
      .lean()
      .exec();

    const titleLimit = chat => ({
      ...chat,
      title: chat.title.length < 100 ? chat.title : `${chat.title.slice(0, 100)}...`
    });
    ctx.body = chats.map(titleLimit);

  } catch (e) {
    ctx.throw(500, e);
  }
}

exports.enter = async (ctx) => {
  const { id } = ctx.params;
  try {
    const chat = await Chat.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    }).exec();

    if (!chat) {
      ctx.status = 404;
      return;
    }
    ctx.body = chat;
  } catch(e) {
    ctx.throw(e, 500);
  }
}


exports.exit = async (ctx) => {
  const { id, userId } = ctx.params;
  try {
    const updateQuery = { $pull: { userIds: userId}}
    const chat = await Chat.findByIdAndUpdate(id, updateQuery, {
      new: true
    }).exec();

    if (!chat) {
      ctx.status = 404;
      return;
    }
    ctx.body = chat;
  } catch(e) {
    ctx.throw(e, 500);
  }
}

exports.receive = async (ctx) => {
  const { id } = ctx.params;
  try {
    const chat = await Chat.findById(id).exec();
    if (!chat){
      ctx.status = 404;
      return;
    }
    ctx.body = chat;

  } catch(e) {
    ctx.throw(e, 500);
  }
}

exports.send = async (ctx) => {
  const { id } = ctx.params;
  try {
    console.log(ctx.request.body);
    let { messages } = ctx.request.body;
    messages.date = new Date();
    const updateQuery = { $push: { messages: messages}}
    const chat = await Chat.findByIdAndUpdate(id, updateQuery, {
      new: true
    }).exec();

    if (!chat) {
      ctx.status = 404;
      return;
    }
    ctx.body = chat;
  } catch(e) {
    ctx.throw(e, 500);
  }
}

exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Chat.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
}