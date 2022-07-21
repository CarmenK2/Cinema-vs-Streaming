from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pymongo
from flask import Response 
from bson import json_util

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/cace_db")

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    _data = mongo.db.collection.find_one()
    a = "static/Resources/box_office_scrape.json"


    # Return template and data
    return render_template("index.html", mars=a, titles = [0])


@app.route('/test')
def get_barchart_data():
    # Declare the database
    db = client.Cace_db
    collection = db.boxoffice
    cur = collection.find()

    face = {
        "1":"test",
        "2":"test2"
    }

    return face






# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function
    mars_data = scrape_mars.scrape()

    # Update the Mongo database using update and upsert=True
    mongo.db.collection.update({}, mars_data, upsert=True)

    # Redirect back to home page
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
