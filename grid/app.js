const fs = require("fs")
const path = require("path")
const express = require("express"); const app = express()
const jsdom = require("jsdom")

app.use("/static", express.static("static"))
app.use("/profiles", express.static("profiles"))
app.use("/mods", express.static("mods"))

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "grid.html"))
})

app.listen(80)