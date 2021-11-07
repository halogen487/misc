global cash
cash=5000
class account:
	def __init__(self, accountName, balance):
		self.accountName = accountName
		self.balance = balance

	def withdraw(self, emigrant):
		self.balance -= emigrant
		cash += emigrant

	def deposit(self, immigrant):
		self.balance += immigrant
		cash -= immigrant

class currentAccount(account):
	def __init__(self, accountName, balance, maxWithdraw):
		super().__init__(accountName, balance)
		self.maxWithdraw = maxWithdraw

cash = 5000
steve = currentAccount("steve's account", 10000, 40)
print(steve.accountName)
print(steve.balance)
print(steve.maxWithdraw)
steve.withdraw(40)