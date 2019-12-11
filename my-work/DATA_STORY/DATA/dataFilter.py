# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import pandas as pd

dataFile = pd.read_csv("listings.csv", index_col = 'id')

#print(list(dataFile[0])

room_type = list(dataFile['room_type'])
name = list(dataFile['name'])
lat = list(dataFile['latitude'])
lon = list(dataFile['longitude'])
price = list(dataFile['price'])
hostStartdate = list(dataFile['host_since'])
propType = list(dataFile['property_type'])


#property_type
#room_type
#square_feet
#price,hostStartdate,propType
locationList = list(zip(name, lat, lon, price, hostStartdate, propType))

#,'price','host_since','property_type
#dataframe object
dataFrame = pd.DataFrame(data=locationList, columns=['name','latitude', 'longitude', 'price', 'hostStart','propType'])

dataFrame.to_csv('listingLocation.csv',index=True,header=True)
