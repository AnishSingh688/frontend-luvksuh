import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const isAuthPage = request.nextUrl.pathname.startsWith('/admin/login')
    const isAdminPage = request.nextUrl.pathname.startsWith('/admin/dashboard')

    if (isAdminPage && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
