game_round = 0
white_turn = True
board_size = 8
blank_icon = "X"
board = ([])
for i in range(board_size):
	board.append([])
	for j in range(board_size):
		board[i].append(blank_icon)

def print_board():
	pivot = []
	for row in board:
		for column, cell in enumerate(row):
			if len(pivot) == column:
				pivot.append([])
			pivot[column].append(cell)
	print(" O-----------------------------------O","\n", 
		"|                                   |")
	for row in pivot:
		line = ""
		for cell in row:
			line += "  " + cell + " "
		print(" |", line, " | ", "\n", "|                                   |")
	print(" O-----------------------------------O")

class piece:

	def __init__(self, is_white, x, y):
		self.is_white = is_white
		self.x = x
		self.y = y
		self.possible_moves = self.possible_moves()

	def move(self, x, y):
		if (x, y) in self.possible_moves():
			board[self.x][self.y] = blank_icon
			self.x = x
			self.y = y
			board[x][y] = self.icon

class pawn(piece):

	def __init__(self, is_white, x, y):
		super().__init__(is_white, x, y)
		self.icon = "i"
		board[x][y] = self.icon

	def possible_moves(self):
		moves = []
		moves.append((self.x, self.y + 1))
		if game_round == 0:
			moves.append((self.x, self.y + 2))
		return moves

geoff = pawn(True, 1, 1)
print_board()
print(geoff.possible_moves)