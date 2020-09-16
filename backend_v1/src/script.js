/*
const { PrismaClient } = reguire('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.link.create({
      data: {
        email: "email"
        name : "name"
        surname: "surname"
        description: "description"
      },
    });
    const users = await prisma.user.findMany()
    console.log(users)
};
main()
    .catch(e=> {
        throw e
    })
    .finally(async () => {
        await prisma.disconnect();
    })
*/