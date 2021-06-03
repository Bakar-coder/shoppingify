build:
	cd ./client && ${MAKE} build && \
	cd ../server && ${MAKE} build && \
	cd ../docker compose up -d --build
	
destroy:
	docker compose down -v --remove-orphans --rmi local && docker volume prune -f && docker network prune -f
