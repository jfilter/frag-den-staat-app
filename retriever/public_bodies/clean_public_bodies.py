import json

new_data = {}

with open('public_bodies_full.json') as json_data:
    bodies = json.load(json_data)

    for item in bodies:
        new_item = {}
        new_item['jurisdictionName'] = item['jurisdiction']['name']
        new_item['publicBodyName'] = item['name']
        isAsString = str(item['id'])
        new_data[isAsString] = new_item

    with open('../../app/data/public_bodies.json', 'w') as outfile:
        json.dump(new_data, outfile)
