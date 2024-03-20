import { NextResponse } from 'next/server'
import { FORGOT_PASSWORD, LOGIN_URL, SIGNUP_URL, HOME_URL } from '@/app/api/routes/page';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === LOGIN_URL || path === SIGNUP_URL || path === FORGOT_PASSWORD;

  const token = request.cookies.get('currentUserToken');

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL(LOGIN_URL, request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL(HOME_URL, request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/common/login",
    "/common/signup",
    "/common/forgot_password",
    "/common/navbar/profile"
  ],
}