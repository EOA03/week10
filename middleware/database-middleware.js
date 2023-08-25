const {MongoClient} = require("mongodb")

const dataMiddleware = async (req, res, next)=>{
  const mongoClient = await new MongoClient('mongodb://mongo:FzOjFgAFOAT5OTtMRFGV@containers-us-west-176.railway.app:5500').connect()
  db = mongoClient.db('week10')
  
  req.db = db
  
  next()
}

module.exports = dataMiddleware