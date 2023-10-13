import { getDataFromToken } from '@/helpers/getDataFromToken';

import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select('-password');
    return NextResponse.json({ message: 'User Found', data: user });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
