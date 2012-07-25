
MOCHA=./node_modules/mocha/bin/mocha

p:
	supervisor -w .,routes/,services/,models/ app.js

### npm install -g mocha
test:
	$(MOCHA)

.PHONY: p test
