const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

async function getMongoUri() {
  const mongod = await MongoMemoryServer.create();
  console.log(mongod.getUri());
  return mongod.getUri();
}

module.exports = async function mongooseConnect() {
  try {
    const uri = await getMongoUri();
    await mongoose.connect(uri, { dbName: "boo_db" });
  } catch (error) {
    console.log(error);
  }
};
