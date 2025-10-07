export const MONGODB = {
    DB_CONNECTION: process.env.DB_CONNECTION,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USERNAME: process.env.DB_USERNAME
        ? `${process.env.DB_USERNAME}:`
        : '',
    DB_PASSWORD: process.env.DB_PASSWORD
        ? `${process.env.DB_PASSWORD}@`
        : '',   
}

export const OPENAI = {
    API_KEY: process.env.OPENAI_API_KEY,
}
