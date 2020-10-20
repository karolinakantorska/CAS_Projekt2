const { forwardTo } = require('prisma-binding');

const Query = {
  //users: forwardTo("db"),
  async users(parent, args, ctx, info){
    // check if is logged in
    //  if (!ctx.request.userId) {
    //     throw new Error('You must be logged in to see the Guides');
    //  }
    return ctx.db.query.users({}, info);
  },
  user: forwardTo("db"),
  currentUser(parent, args, ctx, info) {
    // check if is logged in
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  reservations: forwardTo("db"),
  reservation: forwardTo("db"),
};

module.exports = Query;
