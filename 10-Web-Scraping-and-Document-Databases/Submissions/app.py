from flask import Flask, render_template, redirect
from scrape_mars import marsData
import pymongo

scraper = marsData()

# Create an instance of Flask]
app = Flask(__name__)

# init helper classes
conn = 'mongodb://localhost:27017'

        # Pass connection to the pymongo instance.
engine = pymongo.MongoClient(conn)

        # Connect to a database. Will create one if not already available.
db = engine.mars_db_20

def insertData(self, data):
    # Drops collection if available to remove duplicates
    self.db.mars_db_20.drop()

    # Creates a collection in the database and inserts two documents
    self.db.mars_db_20.insert_many(
        [
            data
        ]
    )



# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    mydata = list(db.db.mars_db_20.find())[0]
    return render_template('index.html', space=mydata)

# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function and save the results to a variable
    # DO SCRAPING WORK
    data = scraper.scrape_mars()


    # Update the Mongo database using update and upsert=True
    db.space.insertData(data)

    # Redirect back to home page
    return redirect("/")



if __name__ == "__main__":
    app.run(debug=True)
