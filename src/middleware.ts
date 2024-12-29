import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//nyalakan cookie disini
export default function middleware(request: NextRequest) {
  // export default function middleware() {
  const cookie = request.cookies.get('token')?.value
  // TODO delete this console.log
  // eslint-disable-next-line no-console
  // console.log('inside middleware', cookie)
  // const response = NextResponse.next()
  // return response
  // if (cookie && cookie.expires && cookie.expires < Date.now()) { return response } else { return response }
  // validate cookie validity and return response
  //nyalakan cookie disini
  if (!cookie) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  return NextResponse.next()
}

// "Matching Paths"
// execute the middleware and return the response object
// if matching paths are found
export const config = {
  matcher: ['/admin/user-management', '/admin/product-management'],
}