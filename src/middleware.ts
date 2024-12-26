
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup";

    const userRefreshToken = request.cookies.get("userrefreshToken");
    if (!isPublicPath && !userRefreshToken) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    if (isPublicPath && userRefreshToken) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/profile", "/signup", "/login"],
};
