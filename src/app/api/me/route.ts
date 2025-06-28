import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// /api/me

  
  export async function POST() {
    
    
    const token = (await cookies()).get("token")?.value;
    return NextResponse.json({ token });
    
  }

  export async function GET() {
    const token = (await cookies()).get("token")?.value;
    return NextResponse.json({ token });
  }
  
  