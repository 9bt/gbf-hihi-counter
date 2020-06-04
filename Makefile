PORT := 2000

build:
	cd client && make build

serve:
	cd client && make dev
	firebase serve --port $(PORT)

kill:
	cd client && make kill

deploy: build
	firebase deploy
