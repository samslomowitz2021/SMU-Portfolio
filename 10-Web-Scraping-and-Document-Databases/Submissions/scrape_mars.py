
import time
from datetime import datetime

from splinter import Browser
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import numpy as np

import requests

class marsData():
    def __init__(self):
        pass
        
    def scrape_mars(self):
        url = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        executable_path = {'executable_path': ChromeDriverManager().install()}
        browser = Browser('chrome', **executable_path, headless=False)
        browser.visit(url)

        # browser.click_link_by_partial_text('development jQuery 3.6.0')

        # for x in range(12):
        #     try:
        #         browser.click_link_by_id("reload-button")
        #     except:
        #         pass

        url = 'https://redplanetscience.com/'

        
        
        browser.visit(url)

        response = requests.get(url)

        html = response.text

        html = browser.html
        soup = BeautifulSoup(html)

        news_title = soup.find_all("div", {"class":"content_title"})

        news_title2=soup.find_all("div", {"class":"content_title"})[0].text
        news_title2
                
        
        news_para = soup.find_all("div", {"class":"article_teaser_body"})

        news_para2=soup.find_all("div", {"class":"article_teaser_body"})[0].text
        news_para2

        url = 'https://spaceimages-mars.com/'
        
        browser.visit(url)

        browser.click_link_by_partial_text('FULL IMAGE')

        html = browser.html
        soup = BeautifulSoup(html)

        featured_image_url = url + soup.find("img", {"class":"headerimage"})["src"]
        featured_image_url



        url ="https://galaxyfacts-mars.com/"

        tables = pd.read_html(url)

        df=tables[0]

        url = "https://marshemispheres.com/"
        browser.visit(url)

        html = browser.html
        soup = BeautifulSoup(html)

        information = soup.find_all("div", {"class": "item"})

        list10 = []

        for x in information:
        
            link = x.find("div", {"class", "description"}).find("a")
            url2 = url + link["href"]
            title = link.text.strip().strip("Enhanced").strip()
            
        
            browser.visit(url2)
            html2 = browser.html
            soup2 = BeautifulSoup(html2)
            information_url = url + soup2.find("img", {"class": "wide-image"})["src"]
            
            data_1 = {"title": title, "img_url": url2}
            list10.append(data_1)
        list10

        data = {}
        # data["news_paragraph"] = news_para2
        # data["news_title"] = news_title2
        data["featured_image_url"] = featured_image_url
        data["mars_facts"] = df.to_html()
        data["hemispheres"] = list10

        return(data)







































        