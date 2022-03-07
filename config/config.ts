import dotenv from 'dotenv';

// Configurar dotenv
dotenv.config();

const config = {
    db_name: process.env.DB_NAME || '',
    db_username: process.env.DB_USERNAME || '',
    db_password: process.env.DB_PASSWORD || '',
    db_host: process.env.DB_HOST || '',
    db_port: Number(process.env.DB_PORT) || 3306,
    jwtSecretPrivateKey: process.env.SECRETORPRIVATEKEY || '',
}

export default config;
