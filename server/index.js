const express = require("express");
const { mongoose } = require("mongoose");

const app = express();

//database connection
mongoose
  .connect(
    "mongodb+srv://madalinaoancea:pass123@festivals.nsw64np.mongodb.net/festivals?retryWrites=true&w=majority&appName=festivals"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

//middleware
app.use(express.json());

app.use("/", require("./routes/scheduleRoute"));

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
