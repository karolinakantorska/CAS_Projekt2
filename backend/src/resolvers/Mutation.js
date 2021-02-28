const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  errorMessagesEditGuide,
  isLoggedInn,
  hasPermission,
  hasOneOfPermissions,
} = require("../utils");

//TODO check existence instead of quering
const mutations = {
  // create Guide
  async createUser(parent, args, ctx, info) {
    hasPermission(ctx, "ADMIN");
    errorMessagesEditGuide(args);
    const password = await bcrypt.hash(args.password, 10);
    args.email = args.email.toLowerCase();
    const userExist = await ctx.db.exists.User({ email: args.email });
    if (userExist) {
      throw new Error(`
      There is already an user with this email: ${args.email},
      if you want to change an user permisson,
      use 'change permission form'`);
    }
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password: password,
          permissions: "GUIDE",
        },
      },
      info
    );
    return user;
  },
  // update Guide
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

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const userExist = await ctx.db.exists.User({ email: args.email });
    if (userExist) {
      throw new Error(`There is already an user with this email: ${args.email}`);
    }
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password: password,
          permissions: "USER",
        },
      },
      info
    );
    // create JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "None",
      secure: true,
      //domain:'/mtb-yoga-prod.herokuapp'
      //domain:'//mtb-front.vercel.app'
      //maxAge: 1000 * 60 * 60, // a hour cookie
    });
    return user;
  },

  async signin(parent, args, ctx, info) {
    const { email, password } = args;
    // is there a user with this email
    const userExist = await ctx.db.exists.User({ email: args.email });
    if (!userExist) {
      throw new Error(`There is no user with this email: ${email}`);
    }
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`There is no user with this email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Invalid Password`);
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "None",
      secure: true,
      //domain='/mtb-yoga-prod.herokuapp'
      //domain:'//mtb-front.vercel.app'
      //maxAge: 1000 * 60 * 60, // a hour cookie
    });
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  },

  async createDay(parent, args, ctx, info) {
    isLoggedInn(ctx);
    if (args.time === "") {
      throw new Error(`Please choose a time of a day`);
    }
    const dayExist = await ctx.db.exists.Day({
      year: args.data.year,
      month: args.data.month,
      day: args.data.day,
    });
    if (!dayExist) {
      const day = await ctx.db.mutation.createDay({
        ...args,
      });
      return day;
    }
    if (dayExist) {
      throw new Error(`This termin is just gone, please try again, or choose another time.`);
    }
  },

  async updateDay(parent, args, ctx, info) {
    isLoggedInn(ctx);
    if (args.time === "") {
      throw new Error(`Please choose a time of a day`);
    }
    const dayId = args.where.id;
    const guideId = args.data.reservations.create[0].guide.connect.id;
    const existingReservations = await ctx.db.query.reservations({
      where: { relatedDay: { id: dayId }, guide: { id: guideId } },
    });
    // if are [time: ...]
    // if empty day []
    if (existingReservations.length > 0) {
      if (existingReservations.length > 1 || existingReservations[0].time === "DAY") {
        throw new Error(
          `Termin just has been booked by another person! Please book an another termin`
        );
      }
    }
    const day = await ctx.db.mutation.updateDay({
      ...args,
    });
    return day;
  },

  async deleteReservation(parent, args, ctx, info) {
    hasOneOfPermissions(ctx, "ADMIN", "GUIDE");
    // TODO check if it is a right guide!! not that they delete each other termins
    // TODO is Quering reservations needed?
    ownReservation(ctx, args.guideId);
    const id = args.id;
    const reservation = await ctx.db.query.reservation({
      where: {
        id,
      },
    });
    return ctx.db.mutation.deleteReservation({
      where: {
        id,
      },
    });
  },
  async deleteManyReservations(parent, args, ctx, info) {
    console.log(args);
    const deleteReservations = await ctx.db.mutation.deleteManyReservations({
      where: { guide: { id: args.id } },
    });
    return deleteReservations;
  },
  // delete Guide
  async deleteUser(parent, args, ctx, info) {
    hasPermission(ctx, "ADMIN");
    const id = args.id;
    const deleteUser = ctx.db.mutation.deleteUser({ where: { id } }, info);
    //const deleteReservations = await ctx.db.mutation.deleteManyReservations({
    //  where: { guide: { id } },
    //});
    //console.log(ctx.db);
    //const transaction = await ctx.db.transaction([deleteReservations, deleteUser]);
    return deleteUser;
  },
};
module.exports = mutations;
