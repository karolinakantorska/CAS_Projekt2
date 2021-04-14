const { forwardTo } = require("prisma-binding");

const Query = {
  //users: forwardTo("db"),
  async users(parent, args, ctx, info) {
    return ctx.db.query.users({}, info);
  },
  user: forwardTo("db"),
  currentUser(parent, args, ctx, info) {
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
  days: forwardTo("db"),
  day: forwardTo("db"),
  reservations: forwardTo("db"),
  reservation: forwardTo("db"),
  trips: forwardTo("db"),
  trip: forwardTo("db"),
  infoes: forwardTo("db"),
};

module.exports = Query;
