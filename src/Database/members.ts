import sequelize, { Model } from "sequelize";
import { sequelizeInstance } from ".";
import { print } from "../Libs/logs";

class members extends Model {
    declare id: BigInt;
    declare createdAt: Date;
    declare updatedAt: Date;
}

members.init({
    id: {
        type: sequelize.BIGINT({ length: 32 }),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    }
}, { sequelize: sequelizeInstance });

members.sync({ alter: true }).then(() => {
    print('Members table initialized', 'Database/Tables').success();
}).catch(error => {
    print('Error: %s', 'Database', true).error(error);
});

export default members;