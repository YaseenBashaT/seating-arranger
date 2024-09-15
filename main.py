from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId
import random
from dependencies import room, std, seatarranger

uri = 'mongodb+srv://admin:9182377052@cluster0.48jda.mongodb.net/'
client = MongoClient(uri, server_api = ServerApi('1'))
db = client['esp']

app = Flask(__name__)
CORS(app)

@app.route('/')
def apphome():
    return "hello"

@app.route('/', methods=["POST"])
def apphomepost():
    return "hello posted"


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
    # print("is json" , request.is_json, "requwst json ", request.json, " requwst get data ")
    req = request.json
    result = db.branches.insert_one(req) #, result.inserted_id
    req['_id'] = str(result.inserted_id)
    return jsonify(response = req)


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


# @app.route('/getbranches')
# def getbranches():
#     branches = db.branches.find()
#     res = []
#     for doc in branches:
#         doc['_id'] = str(doc['_id'])
#     return jsonify(branches = res)


# funcions for get, update, delete rooms
@app.route('/getrooms')
def getrooms():
    rooms = db.rooms.find()
    res = []
    for i in rooms:
        i['_id'] = str(i['_id'])
        res.append(i)
    return jsonify(response = res)

@app.route('/getrooms', methods=["POST"])
def getroomspost():
    # print("is json" , request.is_json, "requwst json ", request.json, " requwst get data ")
    req = request.json
    result = db.rooms.insert_one(req) #, result.inserted_id
    req['_id'] = str(result.inserted_id)
    return jsonify(response = req)

@app.route('/getrooms/<roomid>', methods=["PUT"])
def getroomsput(roomid):
    search = {'_id':ObjectId(roomid)}
    result = db.rooms.replace_one(search, request.json)
    return jsonify(response = str(result.acknowledged))

@app.route('/getrooms/<roomid>', methods=["DELETE"])
def getroomsdelete(roomid):
    search = {'_id':ObjectId(roomid)}
    result = db.rooms.delete_one(search)
    return jsonify(response = str(result.acknowledged),count = str(result.deleted_count), ntg =str(result.raw_result))


# to handle requests from arrange
# branch = {branch, strength, sub} roms = { rno, strength}
@app.route('/arrangerooms', methods = ["POST"])
def arrangerooms():
    try:
        resp = request.json
        rooms = [ room(rno = x['rno'], strength= int(x['strength'])) for x in resp.get('rooms', [])]
        branches = [std(branch = x['branch'], strength=int(x['strength']) , sub= x.get('subject', random.randint(0,100))) for x in resp.get('branches',[])]
        arr = seatarranger(rooms, branches)
        response = str(arr.arr1())
        chart = str(arr.getAttChart())
    except Exception as e:
        response = str(e)
        chart = "dont know"
    return jsonify(response = "SUccess" ,res = response, attChart = chart)
app.run(port = 12435, host='0.0.0.0')