.PHONY: p test sass-dev

###
### apt-get install ruby
### gem install sass compass
### 
COMPASS=compass
UI_DIR=ui

###
### Test
###
MOCHA=./node_modules/mocha/bin/mocha

p:
	supervisor -w .,routes/,services/,models/ app.js

###
### npm install -g mocha
###
test:
	$(MOCHA)

sass-dev:
	$(COMPASS) watch $(UI_DIR)


###
### TODO: production build
###

