import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./lib/utils";
import { Role } from "./constants/type";

const managePaths = ["/manage"];
const guestPaths = ["/guest"];
const privatePaths = [...managePaths, ...guestPaths];
const unAuthPaths = ["/login"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (privatePaths.some((path) => pathname.startsWith(path) && !refreshToken)) {
    const url = new URL("/login", request.url);
    url.searchParams.set("clearTokens", "true");
    return NextResponse.redirect(url);
  }

  //truong hop da dang nhap
  if (refreshToken) {
    //1. Co tinh vao login(unAuthPats) thi se redirect ve trang chu
    if (unAuthPaths.some((path) => pathname.startsWith(path)))
      return NextResponse.redirect(new URL("/", request.url));

    //chỉ check xem có acc hay ref_ hay ko chứ ko check có đúng ở server ko
    //2. accessToken het han
    if (
      privatePaths.some((path) => pathname.startsWith(path) && !accessToken)
    ) {
      const url = new URL("/refresh-token", request.url);
      url.searchParams.set("refreshToken", refreshToken as string);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    //3. vao ko dung role, redirect ve trang chu
    const role = decodeToken(refreshToken).role;
    if (
      (role === Role.Guest &&
        managePaths.some((path) => pathname.startsWith(path))) ||
      (role !== Role.Guest &&
        guestPaths.some((path) => pathname.startsWith(path)))
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/manage/:path*", "/guest/:path*"],
};
