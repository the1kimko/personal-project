from flask import Flask
from config import Config, db, migrate
from routes import initialize_routes

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
migrate.init_app(app, db)

# Initialize routes
initialize_routes(app)

if __name__ == "__main__":
    app.run(debug=True)