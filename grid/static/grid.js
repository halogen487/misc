const Article = function ({start, refresh}) {
	let self = {}

	self.mod = null
	self.id = null
	self.config = null
	self.start = start
	self.refresh = refresh

	self.appear = async function () {
		let res = await fetch(`/mods/${this.mod}/article.html`)
		.then(res => res.text())
		document.getElementById("fill-me-with-articles").insertAdjacentHTML("beforeend", res)
		document.getElementById("fill-me-with-articles").lastChild.setAttribute("id", this.id)
	}

	self.info = function (msg) {
		console.info(`${this.mod} #${this.id}: ${msg}`)
	}

	return self
}

let mods = []
let articles = []

// really janky
// make an article.js a simple object export

const loadArticle = async function (mod, id, config) {
	console.info(`grid: fetching article for ${mod}...`)
	let res = await fetch(`/mods/${mod}/article.js`)
	.then(res => res.text())
	notAnon = new Function(res)
	newArticle = notAnon()
	newArticle.mod = mod
	newArticle.id = id
	newArticle.config = config
	articles.push(newArticle)
}

const loadProfile = async function (profile) {
	let res = await fetch(`/profiles/${profile}.json`)
	let config = await res.json()
	//make async
	for (article of config.articles) {
		await loadArticle(article.mod, "x" + String(Math.random()).substr(2), article.config)
	}
	for (article of articles) {
		if (article.config.visible) {
			await article.appear()
		}
		await article.start()
		setInterval(article.refresh, article.config.refresh)
	}
}

loadProfile("config")