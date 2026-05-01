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
  
  const jaIndex = acceptLang.indexOf('ja');
  const koIndex = acceptLang.indexOf('ko');
  
  let preferredLocale = 'ko'; // default to Korean
  // If Japanese is present, and either Korean is missing or Japanese has higher priority (appears first)
  if (jaIndex !== -1 && (koIndex === -1 || jaIndex < koIndex)) {
    preferredLocale = 'ja';
  }

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
