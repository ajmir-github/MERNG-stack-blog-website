const mongoose = require("mongoose");
require("dotenv").config();
const createApp = require("./app");

function main() {
  // Create app
  const app = createApp();
  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

// Database Setup
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DATABASE_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (error) throw error;
    main();
  }
);
