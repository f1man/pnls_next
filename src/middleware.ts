import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ko', 'ja'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is already localized
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect preferred language from headers
  const acceptLang = request.headers.get('accept-language') || '';
  const preferredLocale = acceptLang.includes('ja') ? 'ja' : 'ko';

  // Redirect to localized path
  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api) and static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
