YARN := yarn

clean:
	cd dist && rm -rf *
	touch dist/.gitkeep

deps:
	$(YARN)

dev: deps
	ENV_FILE=.env $(YARN) run watch >> ./tmp/webpack.log 2>&1 & echo $$! > ./tmp/webpack.PID

kill:
	test -f ./tmp/webpack.PID && pkill -TERM -P `cat ./tmp/webpack.PID`

build:
	ENV_FILE=.env.production $(YARN) run build
