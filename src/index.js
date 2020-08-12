import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import models from '../src/database/models';
import typeDefs from '../src/graphql/schemas';
import resolvers from '../src/graphql/resolvers';
import dataSources from '../src/graphql/dataSources';
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

const context = async ({ req }) => {
  if (req) {
    return {
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
