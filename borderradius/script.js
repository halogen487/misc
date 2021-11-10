const stage = document.getElementById("stage")

const ui = {
	canvas: document.getElementById("ui-canvas"),
}
ui.ctx = ui.canvas.getContext("2d")

const gridCanvas = document.getElementById("game-canvas")
const gCtx = gridCanvas.getContext("2d")

const a = Math.PI / 3 // exterior angle of hexagon
const r = 16 // radius
const width = gridCanvas.getAttribute("width")
const height = gridCanvas.getAttribute("height")
const hexColumns = width / (r + r * Math.cos(a)) - 3
const hexRows = height / (2 * r * Math.sin(a)) - 3
gCtx.lineWidth = 3
let moved = true

const Hex = function (team = 0, piece = null) {
	return {
		team: team, // integer, 0 for no team
		piece: piece, // null, decididuous, coniferous, peasant, soldier, knight, slayer, capital, castle, stronghold
		coords: {
			x: null,
			y: null
		}
	}
}

const neighbors = function (i, j) {
	if (j % 2 != 0) { // if odd, so lower column
		return [
			[j, i - 1], // i is row, j is column
			[j - 1, i],
			[j + 1, i],
			[j - 1, i + 1],
			[j, i + 1],
			[j + 1, i + 1]
		]
	} else {
		return [
			[j - 1, i - 1],
			[j, i - 1],
			[j + 1, i - 1],
			[j - 1, i],
			[j + 1, i],
			[j, i + 1]
		]
	}
}

const power = function (piece) {
	let level = 0
	switch (piece) {
		case "peasant":
			level = 1
			break
		case "soldier":
			level = 2
			break
		case "knight":
			level = 3
			break
		case "slayer":
			level = 4
			break
	}
	return level
}

const protection = function (i, j) {
	let level = 0
	for (coord of neighbors(i, j)) {
		if (grid[coord[1]] && grid[coord[1]][coord[0]]) {
			let hex = grid[coord[1]][coord[0]]
			if (power(hex.piece) > level) {
				level = power(hex.piece)
			}
		}
	}
	return level
}

const drawHex = function (x, y, i, j, content) {
	gCtx.beginPath()
	for (let i = 0; i < 6; i++) {
		gCtx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
	}
	gCtx.closePath()
	let colour
	switch (protection(i, j)) {
		case 0:
			colour = "#00A000"
			break
		case 1:
			colour = "#ffcccc"
			break
		case 2:
			colour = "#ff9999"
			break
		case 3:
			colour = "#ff6666"
			break
		case 4:
			colour = "#ff3333"
			break
	}
	if (content) {
		switch (content.piece) {
			case "soldier":
				colour = "black"
				break
		}
	} else {
		colour = "blue"
	}
	if (colour) {
		gCtx.fillStyle = colour
		gCtx.fill()
	}
	gCtx.stroke()
}

const drawHexGrid = function () {
	let sin = Math.sin(a)
	let cos = Math.cos(a)
	for (let i = 0; i < hexRows; i++) { // i means row
		let rowY = (i + 1) * 2 * r * sin
		let xDiff = 0
		for (let j = 0; j < hexColumns; j++) { // j means column
			let yDiff = rowY
			if (j % 2 != 0) { // even columns are higher
				yDiff = rowY + (r * sin)
			}
			if (grid[i][j]) {
				let x = 3 * r + (j * (r + r * cos))
				let y = r * sin + yDiff
				drawHex(x, y, i, j, grid[i][j])
				grid[i][j].coords = {x: x, y: y}
			}
		}
	}
}

const hexAtXy = function (x, y) {
	//let iIsh = 
	let iIsh = Math.round(x / (r + r * Math.cos(a)) - 2)
	let jIsh = Math.round(y / (2 * r * Math.sin(a)) - 2)
	return {i: iIsh, j: jIsh}
}

stage.addEventListener("click", (e) => {
	ui.ctx.clearRect(0, 0, width, height)
	let rect = stage.getBoundingClientRect()
	ui.ctx.strokeStyle = "#FF0000"
	ui.ctx.beginPath()
	ui.ctx.arc(e.clientX - rect.x, e.clientY - rect.y, 20, 0, 2 * Math.PI)
	//console.log(Math.floor(e.clientX - rect.x), Math.floor(e.clientY - rect.y))
	ui.ctx.stroke()
	ui.ctx.fillStyle = "#FF0000"
	ui.ctx.fill()
	console.log(hexAtXy(e.clientX - rect.x, e.clientY - rect.y))
	
})

let grid = []
for (let i = 0; i < hexRows; i++) {
	let row = []
	for (let j = 0; j < hexColumns; j++) {
		if (i > 15) {
			row.push(null)
		} else {
			row.push(Hex())
		}
	}
	grid.push(row)
}
	
grid[1][1] = Hex(0, "peasant")
grid[3][2] = Hex(0, "soldier")
grid[9][9] = Hex(0, "knight")
grid[13][13] = Hex(0, "slayer")
grid[14][7] = null
grid[18][5] = Hex()
grid[18][6] = Hex()
grid[19][5] = Hex()

drawHexGrid()
