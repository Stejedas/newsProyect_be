import {} from "dotenv/config";
import express from 'express';
import cors from 'cors';
import newsRouter from './newsBook/newsBook.router.js'

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/news', newsRouter);


app.listen(port, () => console.log(`Server up on port: ${port}`))