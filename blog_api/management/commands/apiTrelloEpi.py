import requests
import json 
import pandas as pd
import threading

class trelloepi:

    def __init__ (self):
        # Original
        # self.key = '7a91b2250265cdb438f5e52de573e6e7'
        # self.token = '401d3b2be397dca5ccfade6ff24a958595e686f9d133bc43b023332cb144e448'

        # self.key = 'b03e7013a271376771dd689c8eba4891'
        # self.token = '90ef0500efa507f3c95d2aea6928f6ae0c6ffab1bbfdea222fda7f38335eb203'

        self.key = 'e6bce68de5dbc076803476188a906594'
        self.token ='631a457099e9c6645fed905e8f2e4f51d0c576a75c74384bbb247bdbb4e34d82'


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
        #boards = boards[0:1]

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

        item6 = []
        item6_status = []
        item6_user = [] 
        item6_date = []
        item7 = []
        item7_status = []
        item7_user = []
        item7_date = []
        item8 = []
        item8_status = []
        item8_user = [] 
        item8_date = []
        item9 = []
        item9_status = [] 
        item9_user = [] 
        item9_date = []
        item10 = []
        item10_status = [] 
        item10_user = []
        item10_date = []

        
        for board in boards:
            #url = 'https://api.trello.com/1/boards/' + board['id'] + '/cards' + '?fields=name&url=true&member_fields=fullName'
            url = 'https://api.trello.com/1/boards/' + board['id'] + '/cards' 
           

            headers = {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            }

            query = {
                'key': self.key,
                'token': self.token,
                #'modifiedSince': '2022-12-08T15:58:36.000Z' 
            }

            call = requests.get(url , headers=headers, params=query)
            dic = json.loads(call.text)
            
            print(board['name'])
            print (len(dic))

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
                checks = json.loads(call.text)

                url2 = 'https://trello.com/1/cards/' + card['id'] + '/actions' 
                    
                query2 = {
                    'key': self.key,
                    'token': self.token,
                    'filter': 'updateCheckItemStateOnCard'
                    }
            
                call2 = requests.get(url2 , headers=headers, params=query2)
                actions = json.loads(call2.text)
                #print(card['name'])

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
                                item2.append(item['checkItems'][1]['name'])
                                item2_status.append(item['checkItems'][1]['state'])
                                first = True
                                checkItems =[]
                                for action in actions:
                                    if item['checkItems'][1]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item2_user.append(action['memberCreator']['username'])
                                            item2_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                if item['checkItems'][1]['id'] not in checkItems:
                                    item2_user.append(None)  
                                    item2_date.append(None)
                                        
                            except IndexError:
                                item2.append(None)
                                item2_status.append(None)
                                item2_user.append(None)
                            
                           
                            try:
                                item3.append(item['checkItems'][2]['name'])
                                item3_status.append(item['checkItems'][2]['state'])
                                first = True
                                checkItems =[]
                                for action in actions:
                                    if item['checkItems'][2]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item3_user.append(action['memberCreator']['username'])
                                            item3_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                if item['checkItems'][2]['id'] not in checkItems:
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
                                item5.append(item['checkItems'][4]['name'])
                                item5_status.append(item['checkItems'][4]['state'])
                                checkItems =[]
                                first = True
                                for action in actions:
                                    if item['checkItems'][4]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item5_user.append(action['memberCreator']['username'])
                                            item5_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                if item['checkItems'][4]['id'] not in checkItems:
                                    item5_user.append(None)          
                                    item5_date.append(None)

                            except IndexError:
                                item5.append(None)
                                item5_status.append(None)
                                item5_user.append(None)

                            try:
                                item6.append(item['checkItems'][5]['name'])
                                item6_status.append(item['checkItems'][5]['state'])
                                first = True
                                checkItems =[]
                                for action in actions:
                                    if item['checkItems'][5]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item6_user.append(action['memberCreator']['username'])
                                            item6_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])

                                if item['checkItems'][5]['id'] not in checkItems:
                                    item6_user.append(None)  
                                    item6_date.append(None)
                                    

                            except IndexError:
                                item6.append(None)
                                item6_status.append(None)
                                item6_user.append(None)
                            
                            try:
                                item7.append(item['checkItems'][6]['name'])
                                item7_status.append(item['checkItems'][6]['state'])
                                first = True
                                checkItems =[]
                                for action in actions:
                                    if item['checkItems'][6]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item7_user.append(action['memberCreator']['username'])
                                            item7_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                if item['checkItems'][6]['id'] not in checkItems:
                                    item7_user.append(None)  
                                    item7_date.append(None)
                                        
                            except IndexError:
                                item7.append(None)
                                item7_status.append(None)
                                item7_user.append(None)
                            
                           
                            try:
                                item8.append(item['checkItems'][7]['name'])
                                item8_status.append(item['checkItems'][7]['state'])
                                first = True
                                checkItems =[]
                                for action in actions:
                                    if item['checkItems'][7]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item8_user.append(action['memberCreator']['username'])
                                            item8_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                if item['checkItems'][7]['id'] not in checkItems:
                                    item8_user.append(None)  
                                    item8_date.append(None)
                                        
                            except IndexError:
                                item8.append(None)
                                item8_status.append(None)
                                item8_user.append(None)
                               
                            
                            
                            try:
                                item9.append(item['checkItems'][8]['name'])
                                item9_status.append(item['checkItems'][8]['state'])
                                checkItems =[]
                                first = True
                                for action in actions:
                                    if item['checkItems'][8]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item9_user.append(action['memberCreator']['username'])
                                            item9_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                if item['checkItems'][8]['id'] not in checkItems:
                                    item9_user.append(None)  
                                    item9_date.append(None)
                                        
                            except IndexError:
                                item9.append(None)
                                item9_status.append(None)
                                item9_user.append(None)

                            try:
                                item10.append(item['checkItems'][9]['name'])
                                item10_status.append(item['checkItems'][9]['state'])
                                checkItems =[]
                                first = True
                                for action in actions:
                                    if item['checkItems'][9]['id'] == action['data']['checkItem']['id']:
                                        
                                        if first:
                                            first = False
                                            item10_user.append(action['memberCreator']['username'])
                                            item10_date.append(action['date'])
                                            checkItems.append(action['data']['checkItem']['id'])
                                            
                                if item['checkItems'][9]['id'] not in checkItems:
                                    item10_user.append(None)          
                                    item10_date.append(None)

                            except IndexError:
                                item10.append(None)
                                item10_status.append(None)
                                item10_user.append(None)

                            
                            

                        else:
                            item1.append(None), item2.append(None),item3.append(None), item4.append(None),item5.append(None), item6.append(None), item7.append(None),item8.append(None), item9.append(None),item10.append(None),      
                            item1_status.append(None),item2_status.append(None),item3_status.append(None),item4_status.append(None),item5_status.append(None),item6_status.append(None),item7_status.append(None),item8_status.append(None),item9_status.append(None),item10_status.append(None),
                            item1_user.append(None),item2_user.append(None),item3_user.append(None),item4_user.append(None),item5_user.append(None), item6_user.append(None),item7_user.append(None),item8_user.append(None),item9_user.append(None),item10_user.append(None),
                            item1_date.append(None),item2_date.append(None),item3_date.append(None),item4_date.append(None),item5_date.append(None),item6_date.append(None),item7_date.append(None),item8_date.append(None),item9_date.append(None),item10_date.append(None),
                               


        data = {'idboard': cardIds, 'board': cardBoards, 'card': cardNames,'cardUrl': cardUrls,'checklist': checkName, 
        "item1": item1, "i1_status": item1_status, 'item1_user':item1_user, 'item1_date': item1_date,
        "item2": item2, "i2_status": item2_status, 'item2_user':item2_user, 'item2_date': item2_date,
        "item3": item3, "i3_status": item3_status, 'item3_user':item3_user, 'item3_date': item3_date, 
        "item4": item4, "i4_status": item4_status, 'item4_user':item4_user, 'item4_date': item4_date, 
        "item5": item5, "i5_status": item5_status, 'item5_user':item5_user, 'item5_date': item5_date,
        "item6": item6, "i6_status": item6_status, 'item6_user':item6_user, 'item6_date': item6_date,
        "item7": item7, "i7_status": item7_status, 'item7_user':item7_user, 'item7_date': item7_date,
        "item8": item8, "i8_status": item8_status, 'item8_user':item8_user, 'item8_date': item8_date, 
        "item9": item9, "i9_status": item9_status, 'item9_user':item9_user, 'item9_date': item9_date, 
        "item10": item10, "i10_status": item10_status, 'item10_user':item10_user, 'item10_date': item10_date,}

        df = pd.DataFrame(data)
       
        return df

       
        

       






































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


   
        

        