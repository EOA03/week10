const {MongoClient} = require("mongodb")

const dataMiddleware = async (req, res, next)=>{
  const mongoClient = await new MongoClient('mongodb://127.0.0.1:27017').connect()
  db = mongoClient.db('week10')
  
  req.db = db
  
  next()
}

module.exports = dataMiddleware