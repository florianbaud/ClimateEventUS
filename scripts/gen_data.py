import pandas as pd
import json as js
import argparse


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('data_path')
    parser.add_argument('outfile_path')
    args = parser.parse_args()

    data = pd.read_csv(args.data_path)
    json = {'ditems': [], "themes": [], "perspectives": []}

    # ditems :
    ditems_json = {"type": "ditem",
                   "name": "",
                   "description": "",
                   "ditem": 1,
                   "date": "",
                   "slug": "",
                   "links": []}

    events = data['EVENT_TYPE'].drop_duplicates().values
    for event_id, event in enumerate(events):
        states = data[data['EVENT_TYPE'] ==
                      event]['STATE'].drop_duplicates().values
        ditems_json['name'] = event
        ditems_json['ditem'] = event_id + 1
        ditems_json['links'] = states.tolist().copy()
        json['ditems'].append(ditems_json.copy())

    # themes :
    themes_json = {
        "type": "theme",
        "name": "",
        "description": "",
        "slug": ""
    }

    themes = data['STATE'].drop_duplicates().values
    len_themes = round(themes.shape[0]/2)

    for theme in themes[0:len_themes]:
        themes_json['name'] = theme
        json['themes'].append(themes_json.copy())

    # perspectives :
    pers_json = {
        "type": "perspective",
        "name": "",
        "description": "",
        "slug": ""
    }

    for pers in themes[len_themes:]:
        pers_json['name'] = pers
        json['perspectives'].append(pers_json.copy())

    # save json :
    with open(args.outfile_path, 'w') as outfile:
        js.dump(json, outfile)
