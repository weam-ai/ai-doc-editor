const ironOption = {
    cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME || 'weam',
    password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD || 'eNfUm7mmU2tIrG7fl0zTmswH7ibarfLo',
    cookieOptions: {
        httpOnly: true,
        secure: false,
    },
};

export default ironOption;
