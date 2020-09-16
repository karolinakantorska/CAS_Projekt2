function createUser(parent, args, context, info ) {
        return context.prisma.user.create({
          data: {
            email: args.email,
            name: args.name,
            surname: args.surname,
            description: args.description,
            photo: args.photo,
            bigPhoto: args.bigPhoto,
          },
        });
}
module.exports = {
    createUser,
}