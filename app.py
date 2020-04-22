import pandas as pd

data = pd.read_csv('..\Resources\cities.csv') 

#render dataframe as html
html = data.to_html()

#write html to file
text_file = open("index.html", "w")
text_file.write(html)
text_file.close()