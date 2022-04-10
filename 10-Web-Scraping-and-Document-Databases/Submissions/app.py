from flask import Flask, render_template, redirect
from scrape_mars import marsData
from helperClass import MongoHelper




# Create an instance of Flask]
app = Flask(__name__)

# init helper classes

mongo = MongoHelper()
scraper = marsData()



# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    mars_data = list(mongo.db.mars.find())[0]
    return render_template('index.html', mars=mars_data)

# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function and save the results to a variable
    # DO SCRAPING WORK
    data = scraper.scrape_mars()


    # Update the Mongo database using update and upsert=True
    mongo.insertData(data)

    # Redirect back to home page
    return redirect("/")



if __name__ == "__main__":
    app.run(debug=True)
