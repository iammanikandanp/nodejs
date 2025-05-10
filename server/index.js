import express from "express"
import dotenv from "dotenv"
import connectdb from "./database/db.js"
import router from "./routers/router.js"
import cors from "cors"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1', router);
const port=process.env.PORT || 5000


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectdb()
  });
  