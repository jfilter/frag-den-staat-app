import requests
import json

new_data = {}

with open('public_bodies.json') as json_data:
    bodies = json.load(json_data)

    for item in bodies:
        new_item = {}
        # j_url = item['jurisdiction']
        # if j_url not in js:
        #     r = requests.get(base_url + j_url)
        #     j_data = json.loads(r.content)
        #     js[j_url] = j_data['name']
        # j_name = js[j_url]
        new_item['jurisdictionName'] = item['jurisdiction']['name']
        new_item['publicBodyName'] = item['name']
        isAsString = str(item['id'])
        new_data[isAsString] = new_item

    with open('public_bodies_cleaned.json', 'w') as outfile:
        json.dump(new_data, outfile)
