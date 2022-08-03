import sequelize, { Model } from "sequelize";
import { sequelizeInstance } from ".";
import { print } from "../Libs/logs";

class commands extends Model {
    declare id: BigInt;
    declare name: string;
    declare options: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

commands.init({
    id: {
        type: sequelize.BIGINT({ length: 32 }),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize.STRING(),
        allowNull: false,
        unique: true
    },
    options: {
        type: sequelize.JSON,
        allowNull: false
    }
}, { sequelize: sequelizeInstance });

commands.sync().then(() => {
    print('Commands table initialized', 'Database/Tables').success();
}).catch(error => {
    print('Error: %s', 'Database', true).error(error);
});

export default commands;