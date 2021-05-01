const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isLoggedInn, hasPermission } = require("../utils");

const mutations = {
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
    const token = jwt.sign({ userId: user.id, userPermission: "USER" }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return user;
  },
  async signin(parent, args, ctx, info) {
    const { email, password } = args;
    if (!email) {
      throw new Error(`Please enter the email`);
    }
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`There is no user with this email: ${email}`);
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Invalid Password`);
    }
    const token = jwt.sign(
      { userId: user.id, userPermission: user.permissions },
      process.env.APP_SECRET
    );

    
    ctx.response.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  },
  // create Guide
  async createUser(parent, args, ctx, info) {
    //hasPermission(ctx, "ADMIN");
    const password = await bcrypt.hash(args.data.password, 10);
    args.data.email = args.data.email.toLowerCase();
    const updates = { ...args };
    delete updates.data.password;
    updates.data.password = password;
    const userExist = await ctx.db.exists.User({ email: args.data.email });
    if (userExist) {
      throw new Error(`
      There is already an user with this email: ${args.data.email}.`);
    }
    const user = await ctx.db.mutation.createUser(
      {
        ...updates,
      },
      info
    );
    return user;
  },
  updateUser(parent, args, ctx, info) {
    //hasPermission(ctx, "ADMIN");
    return ctx.db.mutation.updateUser(
      {
        ...args,
      },
      info
    );
  },
  async deleteUser(parent, args, ctx, info) {
    //hasPermission(ctx, "ADMIN");
    return ctx.db.mutation.deleteUser({ ...args });
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
  async updateReservation(parent, args, ctx, info) {
    return ctx.db.mutation.updateReservation({ ...args });
  },
  async updateReservationAddGuide(parent, args, ctx, info) {
    return ctx.db.mutation.updateReservation({ ...args });
  },
  async deleteReservation(parent, args, ctx, info) {
    //hasPermission(ctx, "ADMIN");
    return ctx.db.mutation.deleteReservation({
      ...args,
    });
  },
  async deleteManyReservations(parent, args, ctx, info) {
    const deleteReservations = await ctx.db.mutation.deleteManyReservations({
      where: { guide: { id: args.id } },
    });
    return deleteReservations;
  },
  async createInfo(parent, args, ctx, info) {
    //hasPermission(ctx, "ADMIN");
    const myInfo = ctx.db.mutation.createInfo({
      ...args,
    });
    return myInfo;
  },
  async updateInfo(parent, args, ctx, info) {
    //hasPermission(ctx, "ADMIN");
    const myInfo = ctx.db.mutation.updateInfo({
      ...args,
    });
    return myInfo;
  },
  async createTrip(parent, args, ctx, info) {
    //hasPermission(ctx, "GUIDE");
    const trip = ctx.db.mutation.createTrip({
      ...args,
    });
    return trip;
  },
  async updateTrip(parent, args, ctx, info) {
    //hasPermission(ctx, "GUIDE");
    const trip = ctx.db.mutation.updateTrip({
      ...args,
    });
    return trip;
  },
  async deleteTrip(parent, args, ctx, info) {
    //hasPermission(ctx, "GUIDE");
    return ctx.db.mutation.deleteTrip({
      ...args,
    });
  },
};
module.exports = mutations;
