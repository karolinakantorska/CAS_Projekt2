const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  errorMessagesEditGuide,
  isLoggedInn,
  hasPermission,
  hasOneOfPermissions,
} = require("../utils");

const mutations = {
  // create Guide
  async createUser(parent, args, ctx, info) {
    hasPermission(ctx, "ADMIN");
    errorMessagesEditGuide(args);
    const password = await bcrypt.hash(args.password, 10);
    args.email = args.email.toLowerCase();
    const existingUser = await ctx.db.query.user({ where: { email: args.email } });
    if (existingUser !== null) {
      throw new Error(`
      There is already an user with this email: ${args.email},
      if you want to change an user permisson,
      use 'change permission form'`);
      /*
      console.log("existingUser.permissions", existingUser.permissions);
      if (existingUser.permissions === "GUIDE") {
        throw new Error(`There is already an guide with this email: ${email}`);
      }
      if (existingUser.permissions === "USER") {
        delete updates.id;
        delete updates.permissions;
        console.log(updates);
        return ctx.db.mutation.updateUser(
          {
            data: {
              ...updates,
              password: password,
              permissions: "GUIDE",
            },
            where: {
              id: existingUser.id,
            },
          },
          info
        );
      }
      */
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
  // delete Guide
  async deleteUser(parent, args, ctx, info) {
    hasPermission(ctx, "ADMIN");
    const where = { id: args.id };
    const user = await ctx.db.query.user({ where }, `{ id}`);
    return ctx.db.mutation.deleteUser({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const userExist = await ctx.db.query.user({ where: { email: args.email } });
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
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, // a hour cookie
    });
    return user;
  },

  async signin(parent, args, ctx, info) {
    const { email, password } = args;
    // is there a user with this email
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
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, // a hour cookie
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
    const checkIfDayExist = await ctx.db.query.days({
      where: {
        year: args.data.year,
        month: args.data.month,
        day: args.data.day,
      },
    });
    // console.log("args", args);
    //console.log("checkIfDayExist", checkIfDayExist);
    //console.log("checkIfDayExist.length", checkIfDayExist.length);
    if (checkIfDayExist.length === 0) {
      //console.log(args);
      //console.log(args.data.reservations);
      const day = await ctx.db.mutation.createDay({
        ...args,
      });
      return day;
    }
    if (checkIfDayExist.length > 0) {
      throw new Error(`This termin is just gone, please try again, or choose another time.`);
    }
  },
  async createReservation(parent, args, ctx, info) {
    isLoggedInn(ctx);
    if (args.time === "") {
      throw new Error(`Please choose a time of a day`);
    }
    //console.log(args);
    //console.log(args.guide.connect.id);
    const id = args.relatedDay.connect.id;
    const guideId = args.guide.connect.id;
    const existingReservations = await ctx.db.query.reservations({
      where: {
        relatedDay: { id },
        // related Guide !!!
        guide: { id: guideId },
      },
    });
    //console.log(existingReservations);
    const reservedTime = [];
    existingReservations.map((reservation) => {
      reservedTime.push(reservation.time);
    });
    // errors by booking already booked time
    const isAmBooked = reservedTime.includes("AM");
    const isPmBooked = reservedTime.includes("PM");
    const isDayBooked = reservedTime.includes("DAY");
    if (isDayBooked) {
      throw new Error(`This day is fully booked!`);
    }
    if (isAmBooked && isPmBooked) {
      throw new Error(`This day is fully booked!`);
    }
    if (args.time === "AM" && isAmBooked) {
      throw new Error(`Morning trip is already booked!`);
    }
    if (args.time === "PM" && isPmBooked) {
      throw new Error(`Aftenoon trip is already booked!`);
    }
    const reservation = await ctx.db.mutation.createReservation({
      data: {
        ...args,
      },
    });
    return reservation;
  },
  async deleteReservation(parent, args, ctx, info) {
    hasOneOfPermissions(ctx, "ADMIN", "GUIDE");
    // TODO check if it is a wrighte guide!! not that they delete each other termins
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
};
module.exports = mutations;
