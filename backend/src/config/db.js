const mongoose = require('mongoose');

/**
 * Establishes the connection to MongoDB using the URI supplied via
 * environment variables. The process exits if the connection fails,
 * since the API cannot serve requests without a database.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Modern mongoose (>= 6) no longer needs useNewUrlParser / useUnifiedTopology,
      // they are kept here as comments for readers coming from older versions.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`[db] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error(`[db] MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[db] MongoDB disconnected');
    });
  } catch (error) {
    console.error(`[db] Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
