const {Router} = require("express")
const {allUsers, register, login} = require("../controller/auth-control")

const authRoute = Router()

authRoute.get("/", allUsers)
authRoute.post("/register", register)
authRoute.post("/login", login)

module.exports = authRoute