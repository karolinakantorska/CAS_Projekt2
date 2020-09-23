const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mutations = {
  async createUser(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
        },
      },
      info
    );
    console.log(user);
    return user;
  },
  updateUser(parent, args, ctx, info) {
    //copy of updates
    const updates = { ...args };
    //remove Id
    delete updates.id;
    //update methode
    //updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
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

  async deleteUser(parent, args, ctx, info) {
    const where = { id: args.id };
    // find user
    const user = await ctx.db.query.user({ where }, `{ id}`);
    // check permission
    // TODO
    // delete
    return ctx.db.mutation.deleteUser({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password: password,
          permissions: { set: ["USER"] },
        },
      },
      info
    );
    // create JWT
    // TODO make env work! process.env.APP_SECRET instead of 'jwtsecret1983'
    const token = jwt.sign({ userId: user.id }, "jwtsecret1983");
    // set jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // a day cookie
    });
    return user;
  },
  async signin(parent,  {email, password }, ctx, info) {
    // is there a user with this email
    const user = await ctx.db.query.user({ where: { email }});
    if (!user){
      throw new Error(`There is no user with this email: ${email}`);
    }
    // if the pass is proper
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Invalid Password`);
    }
    // generate jwt token
    // TODO make env work! process.env.APP_SECRET instead of 'jwtsecret1983'
    const token = jwt.sign({ userId: user.id }, "jwtsecret1983");
    // set cookie with token
    // TODO awoid repetition
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // a day cookie
    });
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!'};
  }
};

module.exports = mutations;
