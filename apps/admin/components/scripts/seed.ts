
import bcrypt from "bcryptjs";
import { db } from "@urban-deals-shop/db";


async function seed() {
  console.log("start seed");
  console.log(process.env.DEFAULT_PASSWORD);
  console.log(process.env.DEFAULT_EMAIL);
  const hashPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD!, 10);
  const email = process.env.DEFAULT_EMAIL;
  await db.user.create({
    data: {
      email,
      password: hashPassword,
      name: "Admin",
      id: crypto.randomUUID(),
    },
  });
}

seed()
  .then(() => {
    console.log("seed completed");
  })
  .catch((error) => {
    console.error("seed failed", error);
  });
