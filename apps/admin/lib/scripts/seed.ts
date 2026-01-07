import { auth } from "@urban-deals-shop/auth";

async function seed() {
  const choice = prompt(
    "This will clear Existing Data Do you want to proceed Y/N"
  );
  if (!choice || choice.toLowerCase() !== "y") {
    console.log("Existing the program");
    return;
  }
  const email = process.env.DEFAULT_EMAIL as string;
  const password = process.env.DEFAULT_PASSWORD as string;
  await auth.api.createUser({
    body: {
      email,
      password,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("Admin created");
  process.exit(0);
}
seed();
