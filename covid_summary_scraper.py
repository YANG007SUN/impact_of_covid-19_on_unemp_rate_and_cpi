import pandas as pd
import datetime
from bs4 import BeautifulSoup as bs
import requests

def scraper():
    # read in master data
    master_data = pd.read_json("resources/mapdata.json")

    #================================= create summary dictionary from master json file =================================
    total_confirmed = 0
    total_die = 0
    state = []
    cases = []
    death = []

    # loop through json file to get the covid number
    for index, data in enumerate(master_data.features):
        total_confirmed+= max(data["properties"]["total_cases"])
        total_die+=max(data["properties"]["total_deaths"])

        # all state and their number
        state.append(data["properties"]["name"])
        cases.append(max(data["properties"]["total_cases"]))
        # deaths number
        death.append(max(data["properties"]["total_deaths"]))
    # change number style
    death_rate = "{:,.1f}%".format(int(total_die)/int(total_confirmed)*100)
    total_confirmed = "{:,}".format(round(total_confirmed))
    total_die = "{:,}".format(round(total_die))

    # find out top 3 states with their confirmed cases and deaths
    top_3_cases = sorted(zip(cases,state),reverse=True)[:3]
    top_3_deaths = sorted(zip(death,state),reverse=True)[:3]
    
    # construct list of dict for top 3 confirmed state
    top_3_confirm = []
    top_3_confirmed_state = [state[1] for state in top_3_cases]
    top_3_confirmed = ["{:,}".format(round(state[0])) for state in top_3_cases]

    for i in range(len(top_3_cases)):
        sub_dict = {"state":top_3_confirmed_state[i],"cases":top_3_confirmed[i]}
        top_3_confirm.append(sub_dict)
    
    # construct list of dict for top 3 deaths state
    top_3_die = []
    top_3_die_state = [state[1] for state in top_3_deaths]
    top_3_death = ["{:,}".format(round(state[0])) for state in top_3_deaths]

    for i in range(len(top_3_deaths)):
        sub_dict_die = {"state":top_3_die_state[i],"cases":top_3_death[i]}
        top_3_die.append(sub_dict_die)
    #===================================================================================================================

    # scrape some headline and news title from WHO
    headline_url = "https://covid19.who.int/"
    news_url = "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/media-resources/news"

    # scrape headline
    page = requests.get(headline_url)
    soup = bs(page.text, "html5lib")
    headline = soup.find("h2","sc-pAZqv").text

    # scrape news and its link
    page = requests.get(news_url)
    soup = bs(page.text, "html5lib")

    news_title = soup.find("div",{"id":"PageContent_C003_Col01"}).find_all("div","list-view")
    news_list = []
    
    # only get 5 news title
    for title in news_title[:5]:
        news_dict = {"title":title.a["aria-label"],"link":title.a["href"]}
        news_list.append(news_dict)
    #===================================================================================================================

    # ============================================= construct summary dict =============================================
    covid_summary ={"total_cases":total_confirmed,
                    "total_deaths":total_die,
                    "death_rate":death_rate,
                    "top_3_confirmed":top_3_confirm,
                    "top_3_deaths":top_3_die,
                    "news":news_list,
                    "headline":headline}

    return covid_summary




