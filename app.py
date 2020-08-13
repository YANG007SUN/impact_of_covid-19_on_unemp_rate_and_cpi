from flask import render_template, redirect, Flask, jsonify
from flask_pymongo import PyMongo
import pymongo
from flask import request
import pandas as pd
import json
import covid_summary_scraper

app = Flask(__name__)

# set up mongodb connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/covid_project")
json_list = []  

@app.route("/")
def home():
    # create collections in mongo called covid
    covid = mongo.db.covid
    # read in json file
    with open("resources/mapdata2.json") as c:
        covid_data = json.load(c)
    # update covid collection with json data in the directory
    covid.update({},covid_data,upsert=True)

    # create another collections in mongo called covid_summary
    covid_summary = mongo.db.covid_summary
    # run scraper function to scrape value
    summary_data = covid_summary_scraper.scraper()
    # update covid summary data to covid_summary collections
    covid_summary.update({},summary_data,upsert=True)
    covid_summary_data = mongo.db.covid_summary.find_one()

    return render_template("index.html",covid = covid_summary_data)


@app.route("/json")
def json_data():
    rawdata = []
    covid_master = mongo.db.covid.find_one()
    del covid_master["_id"]
    return covid_master


if __name__=="__main__":
    app.run(debug=True)


