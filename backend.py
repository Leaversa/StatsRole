from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import time

load_dotenv()

app = Flask(__name__)
CORS(app)
client = OpenAI()

@app.route("/")
def hello_world():
    return "ok"

@app.route('/prompt', methods=['POST'])
def prompt():
    time.sleep(5)
    data = request.json
    
    data = {'name': 'Frostfang Drake', 'flavor_description': 'A winged predator of icy peaks, its breath freezes the very air it touches.', 'stats': {'strength': 18, 'dexterity': 14, 'constitution': 16, 'intelligence': 10, 'wisdom': 12, 'charisma': 8}, 'skills': {'perception': 10, 'stealth': 12, 'intimidation': 15}, 'damage_resistances': ['cold'], 'damage_immunities': ['cold'], 'special_abilities': [{'name': 'Icy Breath', 'description': 'The Frostfang Drake can unleash a cone of freezing cold air in front of it, dealing 4d6 cold damage. Creatures in the area must make a DC 15 Constitution saving throw or be paralyzed for 1 minute.', 'usage': '3/day'}, {'name': 'Flight', 'description': 'The Frostfang Drake can fly at a speed of 60 feet.', 'usage': 'at will'}]}
    
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
