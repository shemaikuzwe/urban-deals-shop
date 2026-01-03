import { db } from "@urban-deals-shop/db";
import bcrypt from "bcryptjs";

async function seed() {
  const choice = prompt(
    "This will clear Existing Data Do you want to proceed Y/N"
  );
  if (!choice || choice !== "Y") {
    console.log("Existing the program");
    return;
  }
  const email = "admin@urban-deals.shop";
  const password = await bcrypt.hash("admin", 10);
  await db.admin.create({
    data: {
      email,
      password,
      name: "Admin",
      id: crypto.randomUUID(),
    },
  });
  console.log("Admin created");
  process.exit(0);
}
seed();
