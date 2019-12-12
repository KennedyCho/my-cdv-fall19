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
I began by mapping out my website. However, soon enough I found myself making changes as I began to understand my datasets more clearly. A primary issue I had was understanding what was possible with the datasets I possessed. 

Step 01
First, I worked on creating the skeleton of my page. In exlusively working in my html file first, I was able to map out the page's contents well in advance so that I could apply style changes easily through the external CSS file. 

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <!-- RENAME -->
    <title>Living in "Parardise"</title>

    <!-- link CSS style sheet  -->
    <link rel="stylesheet" type="text/css" href="CSS/style.css">

    <!-- link d3 library  -->
    <script src="https://d3js.org/d3.v5.min.js" charset="utf-8"></script>

    <!-- link font -->
    <link href="https://fonts.googleapis.com/css?family=Bebas+Neue|Chonburi|Elsie|Pavanam|Quicksand|Staatliches&display=swap" rel="stylesheet">

  </head>
  <body>
    <div class="title">

      <h1>TITLE</h1>
      <p>NAME</p>

      <div class="introContainer">
        <p>INTRODUCTION
        </p>
      </div>
    </div>
    <div id="locationName">
      <text id="locationTitle">NAME OF LOCATION</text>
    </div>
    <div id="container">
      <div id="mapContainer"></div>

      <div id="comparisonContainer"></div>

      <div id="graphOverviewContainer"></div>
 
    </div>

    <div id="footer"></div>
    
    <!-- link external js script -->
    <script src="JS/script.js" charset="utf-8"></script>
  </body>
</html>
```

Step 02 
Next, I tried to tackle creating the interactive map. 

Step 03 
Because of the issues I ran into creating the listing points on the map decided to repurpose it. I tried to make it 

Step 04  
I really liked the map I created however, I was simply unable to include the features that I originally wanted to. Therefore, I kept the map as a reference for any users new to the state of Hawaii. This way people who were unfamiliar with the state could get a macro view of how the state is divvied up. 

In order to cut down the size of my data file, I used the pandas library to filter the file listings.csv. Each entry inlcuded the title of the AirBnb listing, latitude, longitude, the date the host joined AirBnb, and the property type. 

![Image of graph 1](https://github.com/KennedyCho/my-cdv-fall19/blob/master/my-work/DATA_STORY/1.png)
![Image of graph 2](https://github.com/KennedyCho/my-cdv-fall19/blob/master/my-work/DATA_STORY/2.png)
![Image of graph 3](https://github.com/KennedyCho/my-cdv-fall19/blob/master/my-work/DATA_STORY/3.png)

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
My greatest challenge was to determine what kinds of graphs would help my audience understand the datasets I was trying to present. I felt that because my intended audience was legislative offcials simple minimalisitic graphs would help the most. This created the issue of keeping my audience engaged because simple graphs can easily become boring. 

**COMPROMISES**
For the sake of time, I was unable to implement the location pin and interaction features of the map. This is something I'd like to work on more. Additionally, I couldn't find a way to usefully compare housing listings and AirBnb listings. This is something I think could benefit from an algorithm (similar to how Robert Theory was devised) where housing and AirBnb's could be compared on a shared level. 

**IMPROVEMENTS**
Overall, I don't feel that my data visualization completely achieved my primary goal which was to create a visualization that could be used to inform legislation. In order to remedy this I would complete the following steps. 

1. complete map features 
2. create section design that was more concrete and that ended with a conclusion
3. add axis labels and keys 
4. add interaction features in order to make data more "readable" (i.e., hover features)


