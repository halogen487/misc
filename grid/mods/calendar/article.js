let article = Article({

	start: function () {
		console.log(`start this: ${this}`)
		let face = document.querySelector(`#${this.id}`)
		this.info("am alive")
	},

	refresh: async function () {
		console.log(`refresh this: ${this}`)
		// cant do this bit because its cross-origin
		let res = await fetch(this.config.url)
		.then(res.text())
		this.info(res)
	}
})

return article