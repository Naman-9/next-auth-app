import { connect } from '@/dbConfig/dbConfig';
import User from '@/app/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log('db', reqBody);

    //check if user already exists
    const user = await User.findOne({ email });
    console.log('db user', user);

    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log('db saving..');
    const savedUser = await newUser.save();
    console.log('db saved');

    console.log(savedUser);

    //send verification email

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log('db error');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
