import connect from "@/lib/db/mongo";
import User from "@/lib/modals/user";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await connect();
        const user = await User.find();
        return new NextResponse(JSON.stringify(user));
    } catch (err: unknown) {
        return new NextResponse("Error fetching users", { status: 500 });
    }
}   