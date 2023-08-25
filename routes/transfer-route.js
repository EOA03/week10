const {Router} = require("express")
const {allTransfers, createTransfers, updateTransfers} = require("../controller/transfer-control")
const {authMiddleware, approverMiddleware} = require("../middleware/auth-middleware.js")

const transferRouter = Router()

transferRouter.get("/", allTransfers)
transferRouter.post("/", authMiddleware, createTransfers)
transferRouter.patch("/:transferId", approverMiddleware, updateTransfers)

module.exports = transferRouter