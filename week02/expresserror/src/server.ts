import express, { Express, Request, Response , Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import log4js from 'log4js';
import path from 'path';
import { notFound, errorHandler } from './error';
import axios from 'axios';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", 'public', 'index.html'))
})

const API_URL = `http://localhost:3000`;

app.get('/persons', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get(`${API_URL}/persons`); 
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});


app.get('/persons/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    console.log('Fetching person with ID:', id);
    const response = await axios.get(`${API_URL}/persons/${id}`);

    if (!response.data) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching person:', error);
    next(error);
  }
});




app.post('/persons', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newPerson = req.body;
    const response = await axios.post(API_URL, newPerson); 
    res.status(201).json(response.data);
  } catch (error) {
    next(error);
  }
});


app.put('/persons/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updatedPerson = req.body;
    const response = await axios.put(`${API_URL}/persons/${id}`, updatedPerson); 
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});


app.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    console.log('Received form data:', data);
   
    res.send('Form data received successfully');
  } catch (error) {
    next(error);
  }
});


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});


