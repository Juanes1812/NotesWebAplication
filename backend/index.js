import app from './app.js'
import { sequelize } from "./models/models.js"; 

//Server Port
const PORT = process.env.PORT || 3000;

await sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database connected successfully");
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    //In case of error
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Check and try again.`);
        console.log(`Try accessing your application at http://localhost:${PORT}`);
      } else {
        console.error("Server has encountered an error:", err);
      }
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
