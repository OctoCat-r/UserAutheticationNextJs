import { connect } from "@/configDb/configDb";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { use } from "react";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists " },
        { status: 400 }
      );
    }

    //checking password
    const validPass = await bcryptjs.compare(password, user.password);
    if (!validPass) {
      return NextResponse.json({ error: "Invalid Password " }, { status: 400 });
    }

    //creating token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      contact: user.contact,
    };
    //creating token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;

    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
