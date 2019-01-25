// server.js
import express from 'express';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('combined'));
app.use('/', express.static('UI'));

// server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started On Port ${port}`);
});

export default app;
