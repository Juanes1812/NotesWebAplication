
import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

//Create the table Notes
const Note = sequelize.define('Note', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  
  //Create the table Category
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#fff',
    },
  });
  
  // relation
  Category.hasMany(Note, {
    foreignKey: 'categoryId', 
  });
  Note.belongsTo(Category, {
    foreignKey: 'categoryId', 
  });
  
  
  // (async () => {
  //   try {
  //     await sequelize.sync({ alter: true }); // { force: true } is used to drop the tables. { alter: true } is used to verify the existance
  //     console.log('Synchronized database');
  //   } catch (error) {
  //     console.error('Error synchronizing database:', error);
  //   }
  // })();
  
  
  export { sequelize, Category, Note };