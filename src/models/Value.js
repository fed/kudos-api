module.exports = (sequelize, DataTypes) => {
    const Value = sequelize.define(
        'Value',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            image_url: DataTypes.STRING,
            slack_logo: DataTypes.STRING
        },
        {
            tableName: 'values',
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Value;
};
