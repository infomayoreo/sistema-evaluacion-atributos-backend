import { Sequelize } from 'sequelize';
import config from '../config/config';

const { db_name, db_username, db_password, db_host, db_port } = config;

const db = new Sequelize(db_name, db_username, db_password, {
    host: db_host,
    dialect: 'mysql',
    port: db_port
});

export default db;