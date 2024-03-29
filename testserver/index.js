#! /usr/bin/env node

const path = require("path")
const express = require("express"); const app = express()

app.use("/css", express.static("css"))
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(80)
console.info("server alive")
