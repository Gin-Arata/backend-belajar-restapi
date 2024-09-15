import connect from "@/lib/db/mongo";
import User from "@/lib/modals/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const user = await User.find();
    return new NextResponse(JSON.stringify(user));
  } catch (err: unknown) {
    return new NextResponse("Error fetching users", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connect();
    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: "User created successfully",
        data: { user: newUser },
      })
    );
  } catch (err: any) {
    return new NextResponse("Error creating user " + err.message, {
      status: 500,
    });
  }
};

