import requests
import json 
import pandas as pd
import threading
from django.utils import timezone

import environ

from datetime import date, timedelta

# Initialise environment variables
env = environ.Env()
environ.Env.read_env()

class trello:

    def __init__ (self):
        
        self.key = '7a91b2250265cdb438f5e52de573e6e7'
        self.token = '401d3b2be397dca5ccfade6ff24a958595e686f9d133bc43b023332cb144e448'

        # Idibra
        # self.key = 'b03e7013a271376771dd689c8eba4891'
        # self.token = '90ef0500efa507f3c95d2aea6928f6ae0c6ffab1bbfdea222fda7f38335eb203'
       
        self.day = date.today() - timedelta(days=5)
        #yesterday = yesterday.strftime('%m%d%y')

    # def __init__ (self):
    #     self.key = env('KEY')
    #     self.token = env('TOKEN')


    def getAllBoards2(self):
        
        url = "https://api.trello.com/1/members/me/boards" + '?fields=name&id=true'

        headers = {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        }

        query = {
            'key': self.key,
            'token': self.token
        }

        call = requests.get(url , headers=headers, params=query)
        boards = json.loads(call.text)
        #boards = boards[0:5]
        print(len(boards))

        cardIds = []
        cardBoards = []
        cardNames = []
        #cardActive =[]
        cardUrls =[]
        checkName = []
        item1 = []
        item1_status = []
        item1_user = [] 
        item1_date = []
        item2 = []
        item2_status = []
        item2_user = []
        item2_date = []
        item3 = []
        item3_status = []
        item3_user = [] 
        item3_date = []
        item4 = []
        item4_status = [] 
        item4_user = [] 
        item4_date = []
        item5 = []
        item5_status = [] 
        item5_user = []
        item5_date = []

        
        for board in boards:
            
            #url = 'https://api.trello.com/1/boards/' + board['id'] + '/cards' + '?fields=name&url=true&member_fields=fullName'
            url = 'https://api.trello.com/1/boards/' + board['id'] + '/cards' 
           

            headers = {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            }

            query = {
                'key': self.key,
                'token': self.token,
                #'modifiedSince': '2022-11-22T15:58:36.000Z' 
                #'modifiedSince': self.day 
            }

            call = requests.get(url , headers=headers, params=query)
            dic = json.loads(call.text)
            
            print(board['name'])
            print(len(dic))
            #print(len(cardIds),len(cardBoards),len(cardNames),len(cardUrls))
            
            #dic = dic[10:15]
            
            start_time1 = timezone.now()
            for card in dic:
                
                #url = 'https://trello.com/1/cards/' + card['id'] + '/checklists' + '?fields=name&state=true&checkItem_fields=name&state'
                url = 'https://trello.com/1/cards/' + card['id'] + '/checklists' 
            
                headers = {
                    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                }

                query = {
                'key': self.key,
                'token': self.token
                }   

                call = requests.get(url , headers=headers, params=query)
                
                #if call:
                checks = json.loads(call.text)
                #print(checks)

                url2 = 'https://trello.com/1/cards/' + card['id'] + '/actions' 
                    
                query2 = {
                    'key': self.key,
                    'token': self.token,
                    'filter': 'updateCheckItemStateOnCard'
                    }
            
                call2 = requests.get(url2 , headers=headers, params=query2)
                if call2:
                    actions = json.loads(call2.text)

                #print(card['id'])
                if checks:
                    for item in checks:
                        cardIds.append(board['id'])
                        cardBoards.append(board['name'])
                        cardNames.append(card['name'])
                        #cardActive.append(card['dateLastActivity']) 
                        cardUrls.append(card['shortUrl'])
                        checkName.append(item['name'])
                        
                        if item['checkItems']:
                            try:
                                item1.append(item['checkItems'][0]['name'])
                                item1_status.append(item['checkItems'][0]['state'])
                                first = True
                                checkItems =[]
                                for action in actions:
                                    if item['checkItems'][0]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item1_user.append(action['memberCreator']['username'])
                                            item1_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])

                                if item['checkItems'][0]['id'] not in checkItems:
                                    item1_user.append(None)  
                                    item1_date.append(None)
                                    

                            except IndexError:
                                item1.append(None)
                                item1_status.append(None)
                                item1_user.append(None)
                            
                            try:
                                item2.append(item['checkItems'][4]['name'])
                                item2_status.append(item['checkItems'][4]['state'])
                                first = True
                                checkItems =[]
                                for action in actions:
                                    if item['checkItems'][4]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item2_user.append(action['memberCreator']['username'])
                                            item2_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                if item['checkItems'][4]['id'] not in checkItems:
                                    item2_user.append(None)  
                                    item2_date.append(None)
                                        
                            except IndexError:
                                item2.append(None)
                                item2_status.append(None)
                                item2_user.append(None)
                            
                           
                            try:
                                item3.append(item['checkItems'][1]['name'])
                                item3_status.append(item['checkItems'][1]['state'])
                                first = True
                                checkItems =[]
                                for action in actions:
                                    if item['checkItems'][1]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item3_user.append(action['memberCreator']['username'])
                                            item3_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                if item['checkItems'][1]['id'] not in checkItems:
                                    item3_user.append(None)  
                                    item3_date.append(None)
                                        
                            except IndexError:
                                item3.append(None)
                                item3_status.append(None)
                                item3_user.append(None)
                               
                            
                            
                            try:
                                item4.append(item['checkItems'][3]['name'])
                                item4_status.append(item['checkItems'][3]['state'])
                                checkItems =[]
                                first = True
                                for action in actions:
                                    if item['checkItems'][3]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item4_user.append(action['memberCreator']['username'])
                                            item4_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                if item['checkItems'][3]['id'] not in checkItems:
                                    item4_user.append(None)  
                                    item4_date.append(None)
                            except IndexError:
                                item4.append(None)
                                item4_status.append(None)
                                item4_user.append(None)

                            try:
                                item5.append(item['checkItems'][2]['name'])
                                item5_status.append(item['checkItems'][2]['state'])
                                checkItems =[]
                                first = True
                                for action in actions:
                                    if item['checkItems'][2]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item5_user.append(action['memberCreator']['username'])
                                            item5_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                    
                                if item['checkItems'][2]['id'] not in checkItems:
                                    item5_user.append(None)  
                                    item5_date.append(None)        
                                        
                            except IndexError:
                                item5.append(None)
                                item5_status.append(None)
                                item5_user.append(None)

                            
                            
                        else:
                            # item1.append(None), item2.append(None),item3.append(None), item4.append(None),item5.append(None)       
                            # item1_status.append(None),item2_status.append(None),item3_status.append(None),item4_status.append(None),item5_status.append(None),
                            # item1_user.append(None),item2_user.append(None),item3_user.append(None),item4_user.append(None),item5_user.append(None)

                            item1.append(None), item2.append(None),item3.append(None), item4.append(None),item5.append(None)       
                            item1_status.append(None),item2_status.append(None),item3_status.append(None),item4_status.append(None),item5_status.append(None),
                            item1_user.append(None),item2_user.append(None),item3_user.append(None),item4_user.append(None),item5_user.append(None),
                            item1_date.append(None),item2_date.append(None),item3_date.append(None),item4_date.append(None),item5_date.append(None),
            
            end_time1 = timezone.now()
            seconds = ((end_time1-start_time1).total_seconds()) 
            print(f"Trello request for cards  took: {(seconds)} seconds.")
                               
      

        data = {'idboard': cardIds,'board': cardBoards, 'card': cardNames,'cardUrl': cardUrls,'checklist': checkName, 
        "item1": item1, "i1_status": item1_status, 'i1_user':item1_user, 'i1_date': item1_date,
        "item2": item2, "i2_status": item2_status, 'i2_user':item2_user, 'i2_date': item2_date,
        "item3": item3, "i3_status": item3_status, 'i3_user':item3_user, 'i3_date': item3_date, 
        "item4": item4, "i4_status": item4_status, 'i4_user':item4_user, 'i4_date': item4_date, 
        "item5": item5, "i5_status": item5_status, 'i5_user':item4_user, 'i5_date': item4_date, 
        }

        # for i in data:
        #     print(i)
        #     print(len(i))

        

        df = pd.DataFrame(data)
       
        return df

        print(item2, item2_user)






































    def getBoard(self):
        
        url = "https://api.trello.com/1/boards/" + self.board

        querystring = {"actions":"all","boardStars":"none","cards":"none","card_pluginData":"false","checklists":"none","customFields":"false","fields":
        "name,desc,descData,closed,idOrganization,pinned,url,shortUrl,prefs,labelNames","lists":"open","members":"none","memberships":"none",
        "membersInvited":"none","membersInvited_fields":"all","pluginData":"false","organization":"false","organization_pluginData":"false","myPrefs":"false",
        "tags":"false","key":self.key,"token":self.token}

        response = requests.request("GET", url, params=querystring)

        #print(response.text)
        print(json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": ")))


      
    def getCardID(self):
        self.idCard = '621f9650bcd8700b4ac05d5b'
        
        
        url = 'https://trello.com/1/boards/' + self.board + '/cards/' + self.idCard + '?key=' + self.key + '&token=' + self.token
        #url = 'https://trello.com/1/cards/'  + self.idCard + '/actions?filter=commentCard' + '?key=' + self.key + '&token=' + self.token
        #url = "https://api.trello.com/1/cards/" + self.idCard + '/actions?filter=commentCard&key='+ self.key + '&token=' + self.token
         
        
        headers = {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        }

        query = {
                'key': self.key,
                'token': self.token
            }

        call = requests.get(url , headers=headers, params=query)
        dic = json.loads(call.text)

        print(dic)

    def getCardActions(self):
        idCard = '6286852ce3ca8f427e4e32ba'
        
        #url = 'https://trello.com/1/cards/'  + self.idCard + '/actions?filter=commentCard' + '?key=' + self.key + '&token=' + self.token
        #url = "https://api.trello.com/1/cards/" + self.idCard + '/actions?filter=commentCard&key='+ self.key + '&token=' + self.token
        url = 'https://trello.com/1/cards/' + idCard + '/actions' 
            
        headers = {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        }

        query = {
        'key': self.key,
        'token': self.token,
        'filter': 'updateChecklist'
        }
        call = requests.get(url , headers=headers, params=query)
        actions = json.loads(call.text)

        #print(dic[0]['data'])
        print(actions)


    def getMember(self):
        self.member = '550a1457c58a3212b6851477'

        url = "https://api.trello.com/1/members/" + self.member

        querystring = {"boardBackgrounds":"none","boardsInvited_fields":"name,closed,idOrganization,pinned","boardStars":"false","cards":"none",
        "customBoardBackgrounds":"none","customEmoji":"none","customStickers":"none","fields":"all","organizations":"none","organization_fields":"all",
        "organization_paid_account":"false","organizationsInvited":"none","organizationsInvited_fields":"all","paid_account":"false","savedSearches":"false",
        "tokens":"none","key": self.key,"token":self.token}

        response = requests.request("GET", url, params=querystring)

        print(response.text)


   
        

        