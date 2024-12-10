const mongoose = require('mongoose');
const dns = require('dns');

async function testDNS() {
  return new Promise((resolve, reject) => {
    dns.resolveSrv('_mongodb._tcp.cluster0.pw3jd.mongodb.net', (err, addresses) => {
      if (err) {
        console.error('Error resolving DNS:', err);
        reject(err);
      } else {
        console.log('DNS Lookup Successful:', addresses);
        resolve(addresses);
      }
    });
  });
}

const connectDB = async () => {
  try {
    console.log('Testing DNS resolution...');
    await testDNS();

    console.log('Attempting MongoDB connection...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
