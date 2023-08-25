require("dotenv").config()

const express = require("express")
const dataMiddleware = require("./middleware/database-middleware")
const transferRouter = require("./routes/transfer-route")
const authRoute = require("./routes/auth-route")
const bodyParser = require("body-parser")
const swaggerUi = require("swagger-ui-express")
const yaml = require("yaml")
const fs = require("fs")

const openApiPath = "./doc/openapi.yaml"
const file = fs.readFileSync(openApiPath, "utf8")
const swaggerDocument = yaml.parse(file)

const app = express()

app.use(bodyParser.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(dataMiddleware)

app.get("/", (req, res)=>{
    res.send("Transfer Request Management API")
})

app.use("/auth", authRoute)
app.use("/transfer", transferRouter)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})