'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static async create({ address, city, state, country, lat, lng, name, description, pricel }) {

      const spot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        pricel
      });
      return await Spot.findByPk(spot.id);
    }
    
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: "ownerId" });
      Spot.hasMany(models.Booking, { foreignKey: "spotId" });
      Spot.hasMany(models.Review, { foreignKey: "spotId" });
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
