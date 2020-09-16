const { forwardTo } = require('prisma-binding');

const Query = {
  users: forwardTo('db'),
  
//  async users(parent, args, ctx, info) {
//     console.log('Getting Users!!');
//    const users = await ctx.db.query.users();
 //    return users;
 // },
  user: forwardTo('db'),

};

module.exports = Query;