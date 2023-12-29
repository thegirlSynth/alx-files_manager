import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager'
    } = process.env;

    this.host = DB_HOST;
    this.port = DB_PORT;
    this.database = DB_DATABASE;

    this.client = new MongoClient(`mongodb://${this.host}:${this.port}`, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect();
    this.db = this.client.db(this.database);
  }

  isAlive() {
    return !!this.client && !!this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    const usersCollection = this.db.collection('users');
    const usersCount = await usersCollection.countDocuments();
    return usersCount;
  }

  async nbFiles() {
    const filesCollection = this.db.collection('files');
    const filesCount = await filesCollection.countDocuments();
    return filesCount;
  }
}

const dbClient = new DBClient();
export default dbClient;
