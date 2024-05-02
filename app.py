import json
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import time

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
client = OpenAI()



@app.route("/")
@cross_origin()
def hello_world():
    return "ok"

@app.route('/prompt', methods=['POST'])
@cross_origin()
def prompt():
    time.sleep(1)
    prompt = "Create a character sheet including in JSON: Name, Type, Alignment, Description, HP, Defense, Speed (ft. suffix), Statistics (no Ability Score Modifiers), Abilities (key-value, 1 value per key), Actions (key-value, 1 value per key)"
    data = request.json
    if (data['prompt'] == None):
        return "Error: No prompt provided.", 400
    print(data['prompt'])
        
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={ "type": "json_object" },
        max_tokens=2500,
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": data['prompt']}
        ]
        )

    # return data['prompt']
    print(completion.choices[0].message.content)
    response = jsonify(completion.choices[0].message.content)
    return response
    
