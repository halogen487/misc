let article = new Article({

	start: function () {
		let face = document.getElementById(this.id)

		let date = ""
		if (this.config.year) {
			date += `<span class="clock-year">YYYY</span>`
		}
		if (this.config.year && this.config.month) {
			date += "-"
		}
		if (this.config.month) {
			date += `<span class="clock-month">MM</span>`
		}
		if (this.config.month && this.config.day) {
			date += "-"
		}
		if (this.config.day) {
			date += `<span class="clock-day">DD</span>`
		}

		let time = ""
		if (this.config.hour) {
			time += `<span class="clock-hour">hh</span>`
		}
		if (this.config.hour && this.config.minute) {
			time += ":"
		}
		if (this.config.minute) {
			time += `<span class="clock-minute">mm</span>`
		}
		if (this.config.minute && this.config.second) {
			time += ":"
		}
		if (this.config.second) {
			time += `<span class="clock-second">ss</span>`
		}

		face.querySelector(".clock-date").insertAdjacentHTML("beforeend", date)
		face.querySelector(".clock-time").insertAdjacentHTML("beforeend", time)

		this.info("am alive")
	},

	refresh: function () {
		let now = new Date()
		for (i of document.querySelectorAll(".clock-year")) {
			i.innerText = String(now.getFullYear()).padStart(4, "0")
		}
		for (i of document.querySelectorAll(".clock-month")) {
			i.innerText = String(now.getMonth() + 1).padStart(2, "0")
		}
		for (i of document.querySelectorAll(".clock-day")) {
			i.innerText = String(now.getDay()).padStart(2, "0")
		}
		for (i of document.querySelectorAll(".clock-hour")) {
			i.innerText = String(now.getHours()).padStart(2, "0")
		}
		for (i of document.querySelectorAll(".clock-minute")) {
			i.innerText = String(now.getMinutes()).padStart(2, "0")
		}
		for (i of document.querySelectorAll(".clock-second")) {
			i.innerText = String(now.getSeconds()).padStart(2, "0")
		}
	}
})

return article