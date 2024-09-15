import connect from "@/lib/db/mongo";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
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

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, newUsername, newEmail, newPassword } = body;

    await connect();

    if (!userId || (!newUsername && !newEmail && !newPassword)) {
      return new NextResponse("Invalid data", { status: 400 });
    } else if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid user ID", { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { username: newUsername, email: newEmail, password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse("User not found", { status: 400 });
    } else {
      return new NextResponse(
        JSON.stringify({
          status: 200,
          message: "User has been updated successfully",
        })
      );
    }
  } catch (err: any) {
    return new NextResponse("Error updating user " + err.message, {
      status: 500,
    });
  }
};
