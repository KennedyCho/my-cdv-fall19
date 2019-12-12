# Data Story Project
By Kennedy Cambra-Cho 

In text, describe your process, compromises you made, and self-evaluate the quality of your project in your own words:
Is it successful? Why?
Which parts could be improved? How?

**Project Objective**
Create a website where a dataset is used to share a story.

Through this project, I will explore the relation between the state of Hawaii's housing market, tourism industry and the recent introduction of short-term vacation rentals. I will show whether or not there is substantial evidence to suggest a  correlation between short-term vacation rentals and tourism profits and housing prices. 

Following the 2008 recession, housing markets everywhere took several years to fully recuperate. Hawaii's housing market has seen a steady rise in housing prices over the couple years recently overtaking pre-recession rates. This indicates an underlying phenomena that must be explored. 
Local media coverage of rising housing prices cite many things as the cause however, a popular reason is the substantial growth in short-term vacation rentals popping up all across the islands. The correlation between these two do not seem obvious to me nor do I see its apparent legitimacy. Local legislation, such as Bill 89, are examples of this idea creating real life consequences. Bill 89 seeks to limit the number of vacation rentals within the City and County of Honolulu (this does not apply statewide just within the county). For local residents operating these rentals, this would take away a valuable source of income. 

**PRODUCTION**
make website 
edit csv data 

```
import pandas as pd

dataFile = pd.read_csv("listings.csv", index_col = 'id')

room_type = list(dataFile['room_type'])
name = list(dataFile['name'])
lat = list(dataFile['latitude'])
lon = list(dataFile['longitude'])
price = list(dataFile['price'])
hostStartdate = list(dataFile['host_since'])
propType = list(dataFile['property_type'])

locationList = list(zip(name, lat, lon, price, hostStartdate, propType))

dataFrame = pd.DataFrame(data=locationList, columns=['name','latitude', 'longitude', 'price', 'hostStart','propType'])

dataFrame.to_csv('listingLocation.csv',index=True,header=True)

```

**CHALLENGES**
choosing right graphs 
making diverse choices 

**COMPROMISES**
map locations of airbnbs

**IMPROVEMENTS**
Overall, I don't feel that my data visualization completely achieved 


