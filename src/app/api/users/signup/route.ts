import { connect } from "@/configDb/configDb";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, contact, password } = reqBody;

    console.log(reqBody, "alredy there");

    //condition checks for sign up

    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password : hashedPassword,
      contact,
    });
    console.log(newUser, "amnan");

    const respo = await newUser.save();

    console.log(respo);
    return NextResponse.json({
        message : "User successfully created ",
        success : true,
        respo,
    })


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
