export const host =
    process.env.NODE_ENV === 'production'
        ? 'https://toystationapi.vercel.app/api'
        : 'http://localhost:3000/api';
