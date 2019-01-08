import pandas as pd
import json as js

if __name__ == "__main__":
    
    data_path = '../data/stormdetails_2017.csv'
    

    data = pd.read_csv(data_path)

    events = data['EVENT_TYPE'].drop_duplicates().values
    events_json = [{'name': e} for e in events]
    
    with open('../data/events.json', 'w') as outfile:
        js.dump(events_json, outfile)
    