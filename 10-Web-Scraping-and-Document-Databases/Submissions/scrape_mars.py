
import time
from datetime import datetime

from splinter import Browser
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd

import requests

class marsData():
    def __init__(self):
        pass
        
    def scrape_mars(self):
        executable_path = {'executable_path': ChromeDriverManager().install()}
        browser = Browser('chrome', **executable_path, headless=False)
        
        browser.visit("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js")

        url = 'https://redplanetscience.com/'
        browser.visit(url)

        for x in range(100):
            try:
                browser.reload()
            except:
                pass

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
       

        items = soup.find_all("div", {"class": "item"})

        hemi_info = []

        for item in items:
            # parse page 1
            item_link = item.find("div", {"class", "description"}).find("a")
            item_url = url + item_link["href"]
            item_title = item_link.text.strip().strip("Enhanced").strip()
            
            # visit the found URL
            browser.visit(item_url)
            browser.click_link_by_id('wide-image-toggle')
            html2 = browser.html
            soup2 = BeautifulSoup(html2)
            hemi_url = url + soup2.find("img", {"class": "wide-image"})["src"]
            
            data = {"title": item_title, "img_url": hemi_url}
            hemi_info.append(data)
        
        data_scraped = {}
        data_scraped["news_p"] = news_para2
        data_scraped["news_title"] = news_title2
        data_scraped["featured_image_url"] = featured_image_url
        data_scraped["mars_facts"] = df.to_html(header=False)
        data_scraped["hemispheres"] = hemi_info

        browser.quit()
        
        return(data)







































        