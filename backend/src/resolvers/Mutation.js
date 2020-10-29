const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function checkIfUserIsAnAdmin(ctx){
    // check if is logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to add the guide');
    }
    // check if user has ADMIN permission
    console.log('request user: ', ctx.request.user.permissions);
    if(ctx.request.user.permissions !== 'ADMIN'){
       throw new Error(`You do not have ADMIN permission to create a guide`);
    }
}

const mutations = {
  async createUser(parent, args, ctx, info) {
    checkIfUserIsAnAdmin(ctx);
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password: password,
          permissions: 'GUIDE',
        },
      },
      info
    );

    return user;
  },
  updateUser(parent, args, ctx, info) {
    checkIfUserIsAnAdmin(ctx);
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
    checkIfUserIsAnAdmin(ctx);
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
          permissions: 'USER',
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
      maxAge: 1000 * 60 * 60 * 24, // a day year cookie
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
      maxAge: 1000 * 60 * 60 * 24, // a day year cookie
    });
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!'};
  },
  // reservations
  async createReservation(parent, args, ctx, info){
    const reservation = await ctx.db.mutation.createReservation(
      {
        data: {
          reservationID: args.reservationID,
          year: args.year,
          month: args.month,
          day: args.day,
          time: args.time,
          guideID: args.guideID,
          userName: args.userName,
          userEmail: args.userEmail,
          nrOfPeople: args.nrOfPeople,
          description: args.description,
          guide: {
            connect: {id: args.guideID}
          },
        }
      },
      info
    );
    return reservation;
  },
  async updateReservation(parent, args, ctx, info){
    const updates = { ...args };
    delete updates.id;
    const reservation =  await ctx.db.mutation.updateReservation(
      
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
    return reservation
  },
  async deleteReservation(parent, args, ctx, info) {
    const where = { id: args.id };
    // find Reservation
    const user = await ctx.db.query.Reservation({ where }, `{ id}`);
    // delete
    return ctx.db.mutation.deleteReservation({ where }, info);
  },
};

module.exports = mutations;
