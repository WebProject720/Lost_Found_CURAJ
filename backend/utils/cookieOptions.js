
export const CookieOption = (production, bool = false) => {
    if (bool) {
        return {
            httpOnly: true,     // Cookie accessible only by web server
            secure: production,       // Cookie sent only over HTTPS
            sameSite: production ? 'None' : 'Lax', // Cookie sent only to the same site
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),    // Cookie expiry 2 days
            path: '/',
        }
    }
    return {
        httpOnly: true,     // Cookie accessible only by web server
        secure: !production,       // Cookie sent only over HTTPS
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),    // Cookie expiry 2 days
        sameSite: production ? 'Lax' : 'None', // Cookie sent only to the same site
        path: '/',
    }
}
