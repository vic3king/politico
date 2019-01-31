// server.js
import express from 'express';
import 'babel-polyfill';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/route';

dotenv.load();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('combined'));
app.use('/', express.static('UI'));
app.use(routes);

// server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started On Port ${port}`);
});

export default app;
