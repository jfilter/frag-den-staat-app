import requests
import json

base_url = 'https://fragdenstaat.de'
next_url = '/api/v1/law/'
data = []

while(next_url):
    url = base_url + next_url
    r = requests.get(url)
    j = json.loads(r.content)
    objects = j['objects']
    for o in objects:
        d = {}
        d['name'] = o['name']
        d['site_url'] = o['site_url']
        d['resource_uri'] = o['resource_uri']
        data.append(d)

    next_url = j['meta']['next']
    print("next_url", next_url)

with open('../../app/data/laws.json', 'w') as outfile:
    json.dump(data, outfile)
