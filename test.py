import json
import requests

with open('public/pizza_main.json', 'r') as file:
    data = json.load(file)

ids = []
for i in data["results"]:
    # print(i["id"])
    ids.append(str(i["id"]))
    
id_str = ','.join(ids)
endpoint = "https://api.spoonacular.com/recipes/informationBulk?apiKey=<INSERT_API_KEY>&ids=" + id_str

res = requests.get(endpoint)
# print(res.json())

recipes = res.json()
with open ('public/pizza_detail.json', 'w') as file:
    json.dump(recipes, file)
