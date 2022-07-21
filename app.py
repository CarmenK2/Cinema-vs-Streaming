from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pymongo
from flask import Response 
from bson import json_util
from flask import jsonify
import json
from bson.json_util import ObjectId



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
    return render_template("index.html", mars=_data, titles = [0])

@app.route("/streaming")
def streaming():
    # Find one record of data from the mongo database
    _data = mongo.db.collection.find_one()
    a = "static/Resources/box_office_scrape.json"

    return render_template("streaming.html")

@app.route("/cinema")
def cinema():
    # Find one record of data from the mongo database
    _data = mongo.db.collection.find_one()
    a = "static/Resources/box_office_scrape.json"

    return render_template("cinema.html", mars=_data, titles = [0])



@app.route('/test')
def get_data():
    # Declare the database
    db = client.Cace_db
    collection = db.boxoffice.find({}, {'_id': False})

    x = []

    for col in collection:
        print(col)
        x.append(col)
    return jsonify(x)


@app.route('/cs_data')
def get_data1():
    # Declare the database
    db = client.Cace_db
    collection = db.streamingfee.find({}, {'_id': False})

    x = []

    for col in collection:
        print(col)
        x.append(col)
    return jsonify(x)

@app.route('/ce_data')
def get_data2():
    # Declare the database
    db = client.Cace_db
    collection = db.cinemadata.find({}, {'_id': False})

    x = []

    for col in collection:
        print(col)
        x.append(col)
    return jsonify(x)
    



if __name__ == "__main__":
    app.run(debug=True)
