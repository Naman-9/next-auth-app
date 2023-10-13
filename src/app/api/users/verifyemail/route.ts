import User from "@/app/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";



connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("token", token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({error: "Invalid Token"}, {status: 400});
        }

        console.log("Token User", user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message: "Email Verified Successfully", success: true});

    } catch (e:any) {
        return NextResponse.json({error: e.message}, {status: 500});
    }
}