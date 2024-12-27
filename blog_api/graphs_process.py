import pandas as pd
import numpy as np
from collections import OrderedDict

def heat_data_process(df: pd.DataFrame):
    #df2 = df.groupby(["pacote", "local"])["complete"].sum()
    #pacotes = df2.index.get_level_values(0).unique()
    locais = df['card2'].unique()
    pacotes = df['pacote'].unique()
    #print(locais)
    
    series =[]
    for p in pacotes:
        data = []
        x = {"name": p, "data": data}
        series.append(x)
        for index,row in df.iterrows():
            if row['pacote'] == p:
                if row['card'] == None:
                    y = {'x': row['local'], 'y': row['complete'], 'link': row['cardUrl'], 'med': row['med'], 'eq': row['equipe'], 'nome': row['checklist'],
                         'inicio': row['i2_data'] ,'final': row['i3_data'], 'autoinicio': row['i2_date_auto'] ,'autofinal': row['i3_date_auto'],"macro":row['macro']}
                    data.append(y)
                else:
                    y = {'x': row['card2'], 'y': row['complete'], 'link': row['cardUrl'], 'med': row['med'], 'eq': row['equipe'], 'nome': row['checklist'],
                         'inicio': row['i2_data'], 'final': row['i3_data'], 'autoinicio': row['i2_date_auto'] ,'autofinal': row['i3_date_auto'], "macro":row['macro']}
                    data.append(y)
    
    for d in series: 
        u = []
        for local in d['data']:
            u.append(local['x'])
       
        for i in locais:
            if i not in u:
                d['data'].append({'x': i, 'y': -1})

    for d in series: 
        d['data'] = sorted(d['data'], key=lambda d: d['x']) 
    
    series = sorted(series, key=lambda d: d['name']) 

    #print(series)         
    return series

def heat_data_macros(df: pd.DataFrame):
    
    macros = df['macro'].unique()
    macros = [x for x in macros if x != '']
    macros = sorted(macros)
    macros.append("TODOS")
    
    
    return macros
    

def pie_data_process(df: pd.DataFrame):
    names = ['Nao Liberado', df['item1'][0], df['item2'][0], df['item3'][0], df['item4'][0]]
    pie = df['complete'].value_counts() 
    pie = pie.reindex([0,1,2,3,4], fill_value=0)
    piedata = []
    colors = ['error','warning','success','primary','secondary' ]
    for n , p, c in zip(names,pie,colors):
        x = {'name':n, "value": p, 'color':c}    
        piedata.append(x)
    
    return piedata


def equipe_data_process(df: pd.DataFrame):

    ktop5eq = df['equipe'].value_counts().head(6).keys()
    top5eq = df['equipe'].value_counts().head(6)
    eqdata =[]

    for k,v  in zip(ktop5eq,top5eq):
        x = {'eq':k, 'value':v}
        eqdata.append(x)

    return eqdata

def users_data_process(df: pd.DataFrame):

    i1_users = df['i1_user'].value_counts()
    i2_users = df['i2_user'].value_counts()
    i3_users = df['i3_user'].value_counts()
    i4_users = df['i4_user'].value_counts()
    
    colunas = [dict(i1_users),dict(i2_users),dict(i3_users),dict(i4_users)]
   
    sortedcolunas =[]
     
    keys = set().union(*colunas)
    for d in colunas:
        for k in keys:
            _ = d.setdefault(k, 0)

    for i in colunas:
        sortedcolunas.append(OrderedDict(sorted(i.items())))

    # print(keys)
    # for i in sortedcolunas:
    #     print(i)

    data2 =[]
    
    for c in sortedcolunas:
        data1 =[]
        data2.append(data1)
        
        for k,v in c.items():
            if k != '':
                data1.append({'x':k, "y": v})
    
    names = ['Liberado', 'Iniciado', 'Finalizado', 'Entregue']

    userdata =[]

    for k,v  in zip(names,data2):
        x = {'name':k, 'data':v}
        userdata.append(x)

    return userdata
        
            
def medicoes_data_process(df: pd.DataFrame):

    medicoes = df['med'].unique()
    medicoes = [x for x in medicoes if x != '']
    medicoes = (sorted(medicoes))
    #print(medicoes)
  
    return medicoes

def process_dataframe(df: pd.DataFrame):
    """A dummy docstring."""
    data = {
        'heat': heat_data_process(df),
        'pie': pie_data_process(df),
        'users': users_data_process(df),
        #'eq': equipe_data_process(df),
        
    }

    return data

def process_dataframe2(df: pd.DataFrame):
    """A dummy docstring."""
    data = {
        'macros': heat_data_macros(df),
        'medicoes': medicoes_data_process(df)
    }

    return data
   