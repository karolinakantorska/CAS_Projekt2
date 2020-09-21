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
    const where = {id: args.id };
    // find user
    // passing gql querry
    const user = await ctx.db.query.user({ where} , `{ id}`);
    // check permission
    // TODO
    // delete
    return ctx.db.mutation.deleteUser({ where }, info)
  },

};

module.exports = mutations;
