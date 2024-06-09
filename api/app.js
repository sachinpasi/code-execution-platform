const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
