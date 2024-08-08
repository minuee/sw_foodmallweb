import {
    RequestCookies,
    ResponseCookies,
  } from "next/dist/compiled/@edge-runtime/cookies";
  import { NextRequest, NextResponse } from "next/server";
  
  export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const code = req.cookies.get("currentUser")?.value;
    console.log("middleware",req.url)
    if (!code ) {
      console.log("middleware 2222",req.cookies)
      const res = NextResponse.redirect(req.url);
      //res.cookies.set("currentUser", "code value");
      applySetCookie(req, res);
      return NextResponse.next();
    }else{
      return NextResponse.next();
    }

  }
  
  export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  };
  
  function applySetCookie(req: NextRequest, res: NextResponse): void {
    const resCookies = new ResponseCookies(res.headers);
    const newReqHeaders = new Headers(req.headers);
    const newReqCookies = new RequestCookies(newReqHeaders);
  
    resCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  
    NextResponse.next({
      request: { headers: newReqHeaders },
    }).headers.forEach((value, key) => {
      if ( key === "x-middleware-override-headers" || key.startsWith("x-middleware-request-") ) {
        res.headers.set(key, value);
      }else{
        return NextResponse.next();
      }
    });
  }