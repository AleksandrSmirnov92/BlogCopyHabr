const app = require("../dist/index");
<<<<<<< HEAD
const port = "9999";
=======
const port = process.env.PORT || "9999";
>>>>>>> fe9ca836d143b5ada9a2ef432ba3eeba4dcc9fe0

app.listen(port, () => {
  console.log("Server has started on port: 9999");
});
