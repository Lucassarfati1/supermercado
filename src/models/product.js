
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product",
    {
    // Configuraciones de las columnas.
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: dataTypes.STRING
    },
   
    image: {
        allowNull: true,
        type: dataTypes.STRING
    },
    price: {
        type:dataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type:dataTypes.STRING,
        allowNull:true
    },
    discount: {
        type:dataTypes.INTEGER,
        allowNull:true
    },
    category: {
        type: dataTypes.STRING,
        allowNull: false
    }
    },
    {
    tableName: 'Products',
    //Si el nombre de la tabla no coincide con el del modelo
    timestamps: false,
    //Si no tengo timestamps
    });
   
    return Product;
    }