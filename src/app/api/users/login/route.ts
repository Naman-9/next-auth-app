import { connect } from '@/dbConfig/dbConfig';
import User from '@/app/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log('login', reqBody);

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User does'nt exists." }, { status: 400 });
    }

    // check if password is correct.
    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({ error: 'Invalid User Credentials.' }, { status: 400 });
    }

    //  after verification - create token(jsonWebToken- encrypt it ) - send this token to user cookies(not local Storage can be manipulated)
    // create Token Data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create Token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

    const response = NextResponse.json({
        message: "Login Successful",
        success: true,
    })

    response.cookies.set("token", token, {
        httpOnly: true,
    });

    return response;
    
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
