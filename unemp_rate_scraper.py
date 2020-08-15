import pandas as pd
from bs4 import BeautifulSoup as bs
from splinter import Browser
import os
from splinter.exceptions import ElementDoesNotExist
import time

# open browser
executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
browser = Browser('chrome', **executable_path, headless=True)

url = "https://data.bls.gov/lausmap/showMap.jsp;jsessionid=D95B58230E1061C5E02A918C434BE5D6._t3_07v"
browser.visit(url)
time.sleep(2)
# ========================================================================================================

# create soup object and find out selector value
html = browser.html
soup = bs(html, "html5lib")

year_selector_value = soup.find_all("select")[0].find_all("option")
month_selector_value = soup.find_all("select")[1].find_all("option")

years = [int(year.text) for year in year_selector_value]
months = [month["value"] for month in month_selector_value]
# ========================================================================================================


# loop through each year and month 
state_data = []
unemp_data = []
year_data = []
month_data = []

for year in years[-2:]:
    for month in months: 
        # select year and month
        browser.find_by_id("year").select(year)
        browser.find_by_id("period").select(month)
        
        # click draw map
        browser.find_by_id('btn_sumbit').click()
        time.sleep(0.5)
        # table content
        html = browser.html
        soup = bs(html, "html5lib")
        # try scrape table info if there is
        try:
            table = soup.find("table",{"id":"tb_data"}).find("tbody").find_all("tr")
            state = [t.find_all("td")[0].text for t in table]
            unemp = [t.find_all("td")[1].text for t in table]
            year_1 = [year for i in range(len(table))]
            month_1 = [month for i in range(len(table))]
        except:
            print(f"Error in table in {year}, {month}-----")
        # append to the current list
        state_data.extend(state)
        unemp_data.extend(unemp)
        year_data.extend(year_1)
        month_data.extend(month_1)
# ========================================================================================================
# create csv file
unempt_table = pd.DataFrame(list(zip(state_data,unemp_data,year_data,month_data)),columns = ["state","unempt_rate","year","month"])
unempt_table.to_csv("resources/unemployment.csv", index=False)




