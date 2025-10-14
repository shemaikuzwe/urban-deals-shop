import { auth } from "@/lib/action/server";
import { NextResponse } from "next/server";

export default async function session() {
  try {
    const session = await auth();
    return NextResponse.json({ session });
  } catch (err) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 },
    );
  }
}
