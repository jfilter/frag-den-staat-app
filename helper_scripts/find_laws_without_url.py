import requests
import json

next_url = 'https://fragdenstaat.de/api/v1/law/'
data = []

while(next_url):
    url = next_url
    r = requests.get(url)
    j = json.loads(r.content)
    objects = j['objects']
    for o in objects:
        d = {}
        d['name'] = o['name']
        d['url'] = o['url']
        d['id'] = o['id']

        if (o['url'] == ''):
            data.append(d)

    next_url = j['meta']['next']
    print("next_url", next_url)

with open('laws_no_url.json', 'w') as outfile:
    json.dump(data, outfile)
