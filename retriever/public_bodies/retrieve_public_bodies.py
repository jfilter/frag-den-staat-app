import requests
import json

base_url = 'https://fragdenstaat.de'
next_url = '/api/v1/publicbody/'
data = []

while(next_url):
    url = base_url + next_url
    r = requests.get(url)
    j = json.loads(r.content)
    data += j['objects']
    next_url = j['meta']['next']
    print("next_url", next_url)

with open('public_bodies_full.json', 'w') as outfile:
    json.dump(data, outfile)
