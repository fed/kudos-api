module.exports = (sequelize, DataTypes) => {
    const Star = sequelize.define(
        'Star',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            sender_id: DataTypes.STRING,
            receiver_id: DataTypes.STRING,
            value_id: DataTypes.STRING,
            comment: DataTypes.TEXT,
            is_anonymous: DataTypes.BOOLEAN
        },
        {
            tableName: 'stars',
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    Star.associate = models => {
        Star.belongsTo(models.User, {
            as: 'Sender',
            foreignKey: 'sender_id'
        });

        Star.belongsTo(models.User, {
            as: 'Receiver',
            foreignKey: 'receiver_id'
        });

        Star.belongsTo(models.Value, {
            foreignKey: 'value_id'
        });
    };

    Star.prototype.parse = function() {
        return {
            id: this.id,
            sender: this.is_anonymous ? null : this.Sender.parse(),
            receiver: this.Receiver.parse(),
            value: this.Value,
            comment: this.comment,
            is_anonymous: this.is_anonymous,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    };

    return Star;
};
