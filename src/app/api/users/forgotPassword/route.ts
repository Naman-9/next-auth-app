import User from '@/app/models/userModel';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid Token' }, { status: 400 });
    }

    // password Hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(reqBody.password, salt);


      user.password= hashedPassword;
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;

    
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
