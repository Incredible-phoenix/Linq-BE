import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import models from '../src/database/models';
import typeDefs from '../src/graphql/schemas';
import resolvers from '../src/graphql/resolvers';
import dataSources from '../src/graphql/dataSources';
import { assertSession } from '../src/graphql/permissions';
import seeds from '../src/database/seeds';

const GRAPHQL_SERVER_URL = '/graphql';

require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(`MongoDB Connection Error: ${err.message}`));

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json('Hello World');
});

app.get('/seed', async (req, res) => {
  await seeds.seedData();
  res.status(200).json('Success');
});

app.get('/drop', async (req, res) => {
  await seeds.dropData();
  res.status(200).json('Success');
});
const getUser = async req => {
  const tokenWithBearer = req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1];
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log("index- assert session")
      assertSession();
    }
  }
};

const context = async ({ req }) => {
  
  if (req) {
    const me = await getUser(req);
    return {
      me,
      models
    };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources
});

server.applyMiddleware({
  app,
  path: GRAPHQL_SERVER_URL
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
});
