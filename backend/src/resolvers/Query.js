const { forwardTo } = require('prisma-binding');

const Query = {
  users: forwardTo("db"),
  //  async users(parent, args, ctx, info) {
  //     console.log('Getting Users!!');
  //    const users = await ctx.db.query.users();
  //    return users;
  // },
  user: forwardTo("db"),
  currentUser(parent, args, ctx, info) {
    // check if someone is logged in
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId }
    }, info);
  },
};

module.exports = Query;