import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;
    
    // Allow requests if the following is true...
    // 1. Its a request for next-auth session & provider fetching
    // 2. the token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect them to login if no token & requesting a protected route
    if (!token && pathname !== '/login') {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.rewrite(url);
    }



}