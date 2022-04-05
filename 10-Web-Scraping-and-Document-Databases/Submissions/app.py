from flask import Flask, render_template, redirect
from scrape_mars import marsData
from helperClass import HelperClass




# Create an instance of Flask]
app = Flask(__name__)

# init helper classes

scraper = marsData()
database1 = HelperClass()


# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    mydata = list(database1.db.space.find())[0]
    return render_template('index.html', space=mydata)

# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function and save the results to a variable
    # DO SCRAPING WORK
    data = scraper.scrape_mars()


    # Update the Mongo database using update and upsert=True
    database1.insertData(data)

    # Redirect back to home page
    return redirect("/")



if __name__ == "__main__":
    app.run(debug=True)
