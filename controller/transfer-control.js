const { ObjectId } = require("mongodb")

const allTransfers = async (req, res)=>{
    try{
      const transfers = await req.db.collection("transfers").find().toArray()
      
      res.status(200).json({
        message: "Transfer successfully retrieved",
        data: transfers
      })
    } catch(error){
      res.status(500).json({error: error.message})
    }
  }
  
const createTransfers = async (req, res)=>{
  const {amount, destinationAccount} = req.body
    
  try{
    const newTransfer = await req.db.collection("transfers").insertOne({
      amount,
      destinationAccount,
      "status": "pending"
    })
      
    res.status(200).json({
      message: "Transfer successfully created",
      data: newTransfer
    })
  } catch(error){
    res.status(500).json({error: error.message})
  }
  return {amount, destinationAccount}
}

const updateTransfers = async (req, res)=>{
  const transferId = new ObjectId(req.params.transferId)
  const {status} = req.body

  console.log(transferId);

  try{
    const data = await req.db.collection("transfers").find({transferId}).toArray()
    if(Object.keys(data) === 0){
      res.status(404).json({
        message: "Data not found"
      })
      res.end()
      return
    }
    const newStatus = await req.db.collection("transfers").updateOne({
      _id: transferId
    }, {
      $set: {status}
    })

    res.status(200).json({
      message: "Update successfully created",
      data: {
        newStatus
      }
    })
  } catch(error){
    res.status(500).json({error: error.message})
  }
}
  
  module.exports = {
    allTransfers,
    createTransfers,
    updateTransfers
  }