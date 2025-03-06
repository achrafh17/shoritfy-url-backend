const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require("crypto");
app.use(express.json());
const PORT= process.env.PORT || 3000

app.use(cors());

const urls = {};
app.post("/app", async (req, res) => {
  const key = crypto.randomBytes(5).toString("hex");
  const url = req.body.url;
  urls[key] = url;
  const shorturl = "http://localhost:3000/" + key;
  res.json({ shorturl });
});
app.get("/:key", (req, res) => {
  const key = req.params.key;
  if(urls[key] ){
    res.redirect(urls[key]);
  }else {
    res.status(404).json({"eroor":"url not found"})
  }


});

app.listen(PORT, () => console.log(`runing on ${PORT}`));
