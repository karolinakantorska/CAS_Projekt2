const { forwardTo } = require("prisma-binding");

const Query = {
  //users: forwardTo("db"),
  async users(parent, args, ctx, info) {
    //check if is logged in
    //if (!ctx.request.userId) {
    //  throw new Error("You must be logged in to see the Guides");
    //}
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
  /*
  monthsReservationForAGuide(parent, args, ctx, info) {
    const allDays = ctx.db.query.days(
      {
        where: { year: args.year, month: args.month },
      },
      info
    );
  },
  */
  /*
  updateUser(parent, args, ctx, info) {
    hasPermission(ctx, "ADMIN");
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  */
};

module.exports = Query;
