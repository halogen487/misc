class Pokemon:

	def __init__(self, name, pokeId, pokeType, level, maxHp, moves):
		self.name = name
		self.pokeId = pokeId
		self.pokeType = pokeType
		self.level = level
		self.maxHp = maxHp
		self.moves = moves
		self.status = ""

	def use(self, move, target):
		self.moves[move].execute(self, target)

class Move:

	def __init__(self, name, maxPp, accuracy, moveType, execute):
		self.name = name
		self.pp = maxPp
		self.accuracy = accuracy
		self.moveType = moveType
		self.execute = execute

class Tackle(Move):

	def __init__():

# just realised callback functions dont really work in python
# python is trash