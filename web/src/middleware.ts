export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        '/',
        '/team/:path*',
        '/task/:path*',
        '/project/:path*'
    ]
}