'''
Author: Liangwei Wang liangweioio27@gmail.com
Date: 2024-07-04 16:57:38
LastEditTime: 2024-07-05 18:48:18
LastEditors: Liangwei Wang
'''
from flask import Flask, jsonify, request, send_from_directory
import os
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/images/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(app.root_path, 'public/images'), filename)

# 读取 config.json 文件并提供API
@app.route('/api/studyOneList', methods=['GET'])
def get_list_one():
    try:
        with open('config.json') as f:
            data = json.load(f)
        study_one_images = data.get('studyOne', [])
        print(study_one_images)
        return jsonify(study_one_images)
    except Exception as e:
        return str(e), 500

# read config.json and provide API
@app.route('/api/studyTwoList', methods=['GET'])
def get_list_two():
    try:
        with open('config.json') as f:
            data = json.load(f)
        study_two_images = data.get('studyTwo', [])
        print(study_two_images)
        return jsonify(study_two_images)
    except Exception as e:
        return str(e), 500


@app.route('/api/save-ratings', methods=['POST'])
def save_ratings_one():
    try:
        ratings = request.json
        with open('user_ratings.json', 'w') as f:
            json.dump(ratings, f)
        return jsonify({"status": "success"})
    except Exception as e:
        return str(e), 500
    
if __name__ == '__main__':
    app.run(debug=True)