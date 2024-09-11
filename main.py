from flask import Flask, jsonify, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId

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

# funcions for get, update, delete rooms
@app.route('/getrooms')
def getrooms():
    rooms = db.rooms.find()
    res = []
    for i in rooms:
        i['_id'] = str(i['_id'])
        res.append(i)
    return jsonify(rooms = res)

@app.route('/getrooms', methods=["POST"])
def getroomspost():
    req = request.json
    result = db.rooms.insert_one(req)
    return jsonify(room = str(result.inserted_id))

@app.route('/getrooms/<roomid>', methods=["PUT"])
def getroomsput(roomid):
    search = {'_id':ObjectId(roomid)}
    result = db.rooms.replace_one(search, request.json)
    return jsonify(room = str(result.acknowledged))

@app.route('/getrooms/<roomid>', methods=["DELETE"])
def getroomsdelete(roomid):
    search = {'_id':ObjectId(roomid)}
    result = db.rooms.delete_one(search)
    return jsonify(ack = str(result.acknowledged),count = str(result.deleted_count), ntg =str(result.raw_result))



# funcions for get, update, delete branches
@app.route('/getbranches')
def getbranches():
    rooms = db.branches.find()
    res = []
    for i in rooms:
        i['_id'] = str(i['_id'])
        res.append(i)
    return jsonify(response = res)

@app.route('/getbranches', methods=["POST"])
def getbranchespost():
    req = request.json
    result = db.branches.insert_one(req)
    return jsonify(response = str(result.inserted_id))

@app.route('/getbranches/<branchesid>', methods=["PUT"])
def getbranchesput(branchesid):
    search = {'_id':ObjectId(branchesid)}
    result = db.branches.replace_one(search, request.json)
    return jsonify(response = str(result.acknowledged))

@app.route('/getbranches/<branchesid>', methods=["DELETE"])
def getbranchesdelete(branchesid):
    search = {'_id':ObjectId(branchesid)}
    result = db.branches.delete_one(search)
    return jsonify(response = str(result.acknowledged),count = str(result.deleted_count), ntg =str(result.raw_result))
    


app.run(port = 12435, host='0.0.0.0')