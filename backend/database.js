import { Sequelize } from 'sequelize';

//Create a dataBase
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});


// const testConnection = async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Conexión a la base de datos exitosa.");
//     } catch (error) {
//       console.error("No se pudo conectar a la base de datos:", error);
//     }
//   };
  
//   testConnection();


export { sequelize };