import {Sequelize} from "sequelize";

const sequelize = new Sequelize('cms', 'root', 'wordpress', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
})

const test = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test();

export default sequelize