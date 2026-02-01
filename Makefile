# Nexus Geom Lab - Development Commands

# Frontend (Vite dev server)
f:
	cd $(CURDIR) && npm run dev

# Backend (Node server)
b:
	cd $(CURDIR)/nexus-geom-lab-backend && node index.js

# Start both (requires 2 terminals or use &)
all:
	@echo "Run 'make f' and 'make b' in separate terminals"

# Install all dependencies
install:
	cd $(CURDIR) && npm install
	cd $(CURDIR)/nexus-geom-lab-backend && npm install

# Seed dev user manually
seed:
	cd $(CURDIR)/nexus-geom-lab-backend && node seedDevUser.js

.PHONY: f b all install seed
