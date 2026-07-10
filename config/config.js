require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV,
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production'
}

const required = ['MONGO_URI'];
required.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
})

module.exports = config;