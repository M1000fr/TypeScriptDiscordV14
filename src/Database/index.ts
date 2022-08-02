import * as sequelize from 'sequelize';
import 'dotenv/config';

export const sequelizeInstance = new sequelize.Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    dialect: 'mariadb',
    define: {
        timestamps: true
    },
    logging: false
});

export { default as members } from './members';