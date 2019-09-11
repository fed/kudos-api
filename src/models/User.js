module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            image_url: DataTypes.STRING,
            is_admin: DataTypes.BOOLEAN
        },
        {
            tableName: 'users',
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    User.prototype.parse = function() {
        return {
            id: this.id,
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
            image_url: this.image_url,
            is_admin: this.is_admin,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    };

    return User;
};
