from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from pymongo import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import ConnectionFailure, ConfigurationError

uri = "mongodb+srv://anand6129:6129@mine.kym3qui.mongodb.net/?retryWrites=true&w=majority&appName=mine"
# uri = "mongodb+srv://admin:9182377052@cluster0.48jda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    try:
        client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        # Test the connection
        client.admin.command('ping')
        print("MongoDB connection successful!")
    except ConnectionFailure:
        print("Failed to connect to MongoDB. Check if the server is running and the URI is correct.")
    except ConfigurationError as e:
        print(f"Configuration error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")
    return jsonify({"hello": "anand", "data":str("checking..")})

@app.route('/getrooms')
def getRooms():
    data = [{'id':1, 'rno':'vtf 1', 'rows': "5", 'columns':'5', 'strength':"40" },
            {'id':2,'rno':'llf 1', 'rows': "5", 'columns':'5', 'strength':"40" },
            {'id':3,'rno':'llf 2', 'rows': "5", 'columns':'5', 'strength':"40" },
            {'id':4,'rno':'llf 3', 'rows': "5", 'columns':'5', 'strength':"40" },
            {'id':5,'rno':'llf 4', 'rows': "5", 'columns':'5', 'strength':"40" },
            {'id':6,'rno':'vtf 10', 'rows': "5", 'columns':'5', 'strength':"40" }]
    res = jsonify(response = data)
    return res

@app.route('/', methods = ['post'])
def indexpost():
    return jsonify({"method":"post"})

app.run(debug=True, port = 8080)










"""
# import requests
# import json
# url = "https://ap-south-1.aws.data.mongodb-api.com/app/data-opccxbo/endpoint/data/v1/action/findOne"

# payload = json.dumps({
#     "collection": "branches",
#     "database": "esp",
#     "dataSource": "Cluster0",
#     # "projection": {
#     #     "_id": 1
#     # }
# })
# headers = {
#   'Content-Type': 'application/json',
#   'Access-Control-Request-Headers': '*',
#   'api-key': 'lxY694wqSo9upOoFCEqbd6LAGlstHLHGkp9bzrk5AXTsVL7pNsqTLiJPHDJvIWnP',
# }

# response = requests.request("POST", url, headers=headers, data=payload)

# print(response.text)


# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi

# # uri = "mongodb+srv://admin:9182377052@cluster0.48jda.mongodb.net/"
# uri = "mongodb+srv://anand:22fe1a6129@cluster0.48jda.mongodb.net"


# client = MongoClient(uri, server_api=ServerApi('1'))
# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

"""