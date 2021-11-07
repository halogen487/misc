// pokemon, featuring object orientation
// just the OOP, no actual gameplay
// by jacob

function Pokemon (name, id, type, level, maxHp, moves) {
	this.name = name
	this.id = id
	this.type = type
	this.level = level
	this.hp = maxHp
	this.moves = moves
	this.status = ""
	this.use = function (move, target) {
		self.moves[move].execute(this, target)
	}
}

function Move (name, maxPp, accuracy, type, execute) {
	this.name = name
	this.pp = maxPp
	this.accuracy = accuracy
	this.type = type
	this.execute = execute
}

function Tackle () {
	Move.call(this, "Tackle", 35, 100, "normal", function(from, to) {
		console.log(`${from.name} tackled ${to.name}`)
		this.pp -= 1
		to.hp -= 10
		console.log(`${to.name}: -10HP!`)
	})
}

function Bite () {
	Move.call("Bite", 25, 100, "dark", function(from, to) {
		console.log(`${from.name} bit ${to.name}`)
		this.pp -= 1
		to.hp -= 60
		console.log(`${to.name}: -60HP!`)
	})
}

const bite = new Move("Bite")

let kathy = new Pokemon("Kathy", 5, "electric", 5, 100, [new Tackle()])

let becky = new Pokemon("Becky", 6, "water", 5, 120, null, [new Bite()])

console.log(kathy)

console.log(new Move("Tackle", 35, 100, "normal", function(from, to) {
		to.hp -= 10
		console.log(`${to.name}: -10HP!`)
	}))

console.log(new Tackle)