import { NextResponse } from 'next/server';
import { FORGOT_PASSWORD, LOGIN_URL, SIGNUP_URL, NAVBAR_DASHBOARD, HOME_URL, ADMIN_DASHBOARD } from '@/app/api/routes/page';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === LOGIN_URL || path === SIGNUP_URL || path === FORGOT_PASSWORD;

  const token = request.cookies.get('currentUserToken');
  const admin_token = request.cookies.get('currentAdminToken');

  if (!(token || admin_token) && !isPublicPath) {
    return NextResponse.redirect(new URL(LOGIN_URL, request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL(NAVBAR_DASHBOARD, request.url));
  } else if (token && path == HOME_URL) {
    return NextResponse.redirect(new URL(NAVBAR_DASHBOARD, request.url));
  }

  if (admin_token && isPublicPath) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
  } else if (admin_token && path == HOME_URL) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/forgot_password",

    "/dashboard",
    "/contact",
    "/about",
    "/profile",
    "/blogs",
    "/blogs_details",
    "/blogs/[id]",
    
    "/admin/dashboard",
    "/admin/blogs",
    "/admin/blogs/[id]",
    "/admin/blogs/add_blogs",
    "/admin/blogs/edit_blogs",
    "/admin/blogs/edit_blogs/[id]",
    "/admin/users",
    "/admin/contact_form_messages",
    "/admin/privacy_policy",
    "/admin/profile",
    "/admin/terms_and_conditions",
    "/admin/hobbies",
    
    "/privacy_policy",
    "/terms_and_conditions",
  ],
}