import { NextResponse } from "next/server"

export const middleware =(req:Request) => {
    console.log('Hello from middleware')
    return NextResponse.redirect(new URL('/', req.url))
}


export const config = {
    matcher: ['/info/:path*']
}