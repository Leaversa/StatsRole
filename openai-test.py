import os
import json
from openai import OpenAI
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv()

client = OpenAI()

prompt = json.dumps({
        "name": "Frostfang Drake",
        "flavor_description": "A winged predator of icy peaks, its breath freezes the very air it touches."
      })


completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are an experienced Dungeon Master and can only respond in JSON.  Given the following create a character/npc StatSheet."},
    {"role": "user", "content": prompt}
  ]
)

print(json.loads(completion.choices[0].message.content))