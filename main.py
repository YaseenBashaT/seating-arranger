from flask import Flask, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = 'mongodb+srv://admin:9182377052@cluster0.48jda.mongodb.net/'
client = MongoClient(uri, server_api = ServerApi('1'))
db = client['esp']

app = Flask(__name__)

@app.route('/')
def apphome():
    return "hello"

@app.route('/', methods=["POST"])
def apphomepost():
    return "hello posted"

@app.route('/getrooms')
def getrooms():
    rooms = db.rooms.find({},{'_id':False})
    return jsonify(rooms = [x for x in rooms])

@app.route('/getbranches')
def getbranches():
    branches = db.branches.find({}, {'_id':False})
    return jsonify(branches = [x for x in branches])


app.run(port = 12435)