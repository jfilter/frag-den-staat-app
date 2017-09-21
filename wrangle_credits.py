import json
import os

with open('credits.json') as data_file:
    data = json.load(data_file)

    txt = ''
    for key, value in data.items():

        if key.startswith('FragDenStaat'):
            continue

        publisher_txt = ''
        if 'publisher' in value:
            publisher_txt = f' by {value["publisher"]}'

        email_txt = ''
        if 'email' in value:
            email_txt = ' (' + value['email'] + ')'

        repo_txt = ''
        if 'repository' in value:
            repo_txt = f'Repository: {value["repository"]} '

        url_txt = ''
        if 'url' in value:
            url_txt = f'URL: {value["url"]} '

        txt += f"{key}{publisher_txt}{email_txt} licensed under {value['licenses']}. {repo_txt}{url_txt}\n\n"

        if 'licenseFile' in value:
            lincenseFile = value['licenseFile']
            possibleNames = []
            possibleNames.append(lincenseFile.replace('LICENSE.html', 'LICENSE.md'))
            possibleNames.append(lincenseFile[:-len('README.md')] + 'LICENSE.md')
            possibleNames.append(lincenseFile[:-len('README.md')] + 'LICENSE')
            possibleNames.append(lincenseFile[:-len('README.md')] + 'license')
            possibleNames.append(lincenseFile[:-len('README')] + 'LICENSE.md')
            possibleNames.append(lincenseFile[:-len('README')] + 'LICENSE')
            possibleNames.append(lincenseFile[:-len('README')] + 'license')
            possibleNames.append(lincenseFile.replace('Readme.md', 'LICENSE.md'))

            for n in possibleNames:
                if(os.path.isfile(n) and not 'readme' in n.lower()): # ignore the ones without a valid LICENSE file
                    file = open(n, 'r')
                    txt += file.read() + '\n'
                    file.close()
                    break

    # print(txt)
    with open("app/components/profile/credits.txt", "w") as text_file:
        print(f"{txt}", file=text_file)
