const app = require("../dist/index");

const port = process.env.PORT || "9999";

app.listen(port, () => {
  console.log("Server has started on port: 9999");
});
