'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Travel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Travel.belongsTo(models.User)
    }
  };
  Travel.init({
    title:{
      type: DataTypes.STRING,
      validate:{
         notEmpty:{
           msg:"Title cannot empty"
         }
      }
     }, 
     destination: {
      type: DataTypes.STRING,
      validate:{
       notEmpty:{
         msg:"Destination cannot empty"
         }
       }
     },
     status: {
      type: DataTypes.STRING,
      validate:{
       notEmpty:{
         msg:"Status cannot empty"
         }
       }
     },
     date: {
       type: DataTypes.DATE,
       validate: {
         isAfter: {
           args: new Date().toString(),
           msg: "Date must be now or future."
         },
         notEmpty:{
           msg:"Date cannot empty"
         }
       }
     },
     UserId: {
      type: DataTypes.INTEGER,
       validate:{
         notEmpty:{
           msg: "UserId cannot empty"
         }
       }
     }
  }, {
    sequelize,
    modelName: 'Travel',
  });
  return Travel;
};