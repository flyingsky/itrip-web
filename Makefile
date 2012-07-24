
p:
	supervisor -w .,routes/,controllers/,models/ app.js

### npm install -g mocha
test:
	mocha

.PHONY: p test
