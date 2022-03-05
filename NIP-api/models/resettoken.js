// _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
// resettoken: { type: String, required: true },
// createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },


module.exports = (sequelize, Sequelize) => {
    const passwordResetToken = sequelize.define("passwordResetToken", {
 
      _userId: {
        type:  Sequelize.INTEGER 
      },
      resettoken: {
        type: Sequelize.STRING
      },

      createdAt: {
        type: Sequelize.DATE, allowNull: false, defaultValue: DataTypes.NOW      
      }

    });
  
    return passwordResetToken;
  };