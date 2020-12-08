const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            nick: {
                type: Sequelize.STRING(20),
                allowNULL: false,
                unique: true,
            },
            passwd: {
                type: Sequelize.STRING(100),
                allowNULL: false,
            },
            todo: {
                type: Sequelize.TEXT,
                allowNULL: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNULL: true,
                defaultValue: Sequelize.NOW,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){
        db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
    }
};