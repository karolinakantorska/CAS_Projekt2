const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isLoggedInn, hasPermission, hasOneOfPermissions, ownReservation } = require("../utils");

const mutations = {
  // create Guide
  async createUser(parent, args, ctx, info) {
    hasPermission(ctx, "ADMIN");
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
  // update Guide
  updateUser(parent, args, ctx, info) {
    hasPermission(ctx, "ADMIN");
    return ctx.db.mutation.updateUser(
      {
        ...args,
      },
      info
    );
  },
  async updateReservation(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateReservation(updates);
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
    const id = args.id;
    return ctx.db.mutation.deleteReservation({
      where: {
        id,
      },
    });
  },
  async deleteManyReservations(parent, args, ctx, info) {
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
    //const transaction = await ctx.db.transaction([deleteReservations, deleteUser]);
    return deleteUser;
  },
};
module.exports = mutations;
