# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import pandas as pd

dataFile = pd.read_csv("listings.csv", index_col = 'id')

#print(list(dataFile[])

room_type = list(dataFile['room_type'])
name = list(dataFile['name'])
lat = list(dataFile['latitude'])
lon = list(dataFile['longitude'])
price = list(dataFile['price'])

#property_type
#room_type
#square_feet

locationList = list(zip(name, lat, lon))


#dataframe object 
dataFrame = pd.DataFrame(data=locationList, columns=['name','latitude', 'longitude'])

dataFrame.to_csv('listingLocation.csv',index=True,header=False)

