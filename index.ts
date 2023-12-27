import express from "express";
import { Save, Load, List } from './routes';
import bodyParser from 'body-parser';

// Configure and start the HTTP server.
const port = 8088;
const app = express();
app.use(bodyParser.json());

app.post("/api/save", Save);
app.get("/api/load/", Load);
app.get("/api/list", List);
app.listen(port, () => console.log(`Server listening on ${port}`));
