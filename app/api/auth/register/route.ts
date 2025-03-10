/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/mobels/User";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide email and password" },
        { status: 400 }
      );
    }

    // connect to database;
    await connectToDatabase();

    // check if user is already registered;
    const exitingUser = await User.findOne({ email });

    if (exitingUser) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 400 }
      );
    }


    // create new user;
    



  } catch (error) {}
}
