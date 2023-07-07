import { Prisma, PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const getUsers = (): Prisma.userCreateInput => {
  return {
    email: 'dev.jun28@gmail.com',
    name: 'seongjun',
  };
};

// const getCartItem = (user: user, cart: cart[]): Prisma.userCreateInput => {
//   return {
//     id: user.id,
//     email: user.email,
//     name: user.name,
//     cart: { connect: { id: cart[0].id } },
//   };
// };

const main = async () => {
  const user = await getUsers();
  console.log(user);
  const test = await client.user.create({
    data: user,
  });
};

main();
