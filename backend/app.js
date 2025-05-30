import express from 'express';
import cors from 'cors';
import categoriesRouter from './routes/categoriesRoutes.js';
import notesRouter from './routes/notesRoutes.js';

const app = express();

app.use(cors());
app.use(express.json()); // To be able to read JSON in the request body

//  Set the routers with their prefixes
app.use("/categories", categoriesRouter);
app.use("/notes", notesRouter);

//Not found routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

export default app;
