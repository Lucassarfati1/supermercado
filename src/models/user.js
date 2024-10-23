
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",
    {
    // Configuraciones de las columnas.

    id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER
    },

    email: {
        allowNull: false,
        type: dataTypes.STRING
    },
    password: {
        allowNull: false,
        type: dataTypes.STRING
    }
    },
    {
    tableName: 'Users',
    //Si el nombre de la tabla no coincide con el del modelo
    timestamps: false,
    //Si no tengo timestamps
    });
   
    return User;
    }