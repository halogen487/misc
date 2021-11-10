#! /usr/bin/env node

const path = require("path")
const fs = require("fs")
const utils = require("./utils")
const express = require("express")
const app = express()

app.engine("html", require("ejs").renderFile)

app.use("/css", express.static("css"))
app.use("/img", express.static("img"))

app.use("/", function (req, res, next) {
	console.log(`${req.method} req from ${req.ip} for ${req.path}`)
	next()
})

app.get("/", function (req, res) {
	res.render(path.join(__dirname, "/html/index.html"))
})
app.get("/about", function(req, res) {
	res.render(path.join(__dirname, "/html/about.html"))
})
app.get("/article:articleId(*)", function (req, res) {
	let md
	let mdPath = path.join(__dirname, "article", req.params.articleId)
	try {
		md = fs.readFileSync(mdPath + ".md").toString()
	} catch (e) {
		if (e.name = "EISDR") {
			md = fs.readFileSync(path.join(mdPath, "index.md")).toString()
			console.info(`${req.path} is a dir, sending its index.md`)
		} else {
			console.error(error)
		}
	}
	res.render(path.join(__dirname, "/html/article.html"), {md: md})
})
// app.get("/article", function(req, res) {
// 	res.redirect(301, "/article/")
// })

app.listen(80)
console.info("server alive")
