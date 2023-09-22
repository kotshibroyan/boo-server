const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

async function getMongoUri() {
  const mongod = await MongoMemoryServer.create();
  console.log(mongod.getUri());
  return mongod.getUri();
}

module.exports = async function andmongooseConnect() {
  try {
    const uri = await getMongoUri();
    await mongoose.connect(uri, { dbName: "boo_profiles" });
  } catch (error) {
    console.log(error);
  }
};
