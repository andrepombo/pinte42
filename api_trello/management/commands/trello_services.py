import pandas as pd

def trello_data_process(df: pd.DataFrame):
    """A dummy docstring."""

    i1 = df['item1'].str.split(':', n=2,  expand=True)
    i2 = df['item2'].str.split(':', n=2,  expand=True)
    i3 = df['item3'].str.split(':', n=2,  expand=True)
    i4 = df['item4'].str.split(':', n=2,  expand=True)
    i5 = df['item5'].str.split(':', n=2,  expand=True)

    lista =[i1,i2,i3,i4,i5]

    for i, df2 in enumerate(lista):
        lista[i] = lista[i].assign(A=None,B=None,C=None)
        lista[i] = lista[i].replace('', None)
    
    i1_nome = lista[0].iloc[:, 0].str.split(expand=True)
    i2_nome = lista[1].iloc[:, 0].str.split(expand=True)
    i3_nome = lista[2].iloc[:, 0].str.split(expand=True)
    i4_nome = lista[3].iloc[:, 0].str.split(expand=True)
    i5_nome = lista[4].iloc[:, 0].str.split(expand=True)

    i1_data = lista[0].iloc[:, 1].str.split(expand=True)
    i2_data = lista[1].iloc[:, 1].str.split(expand=True)
    i3_data = lista[2].iloc[:, 1].str.split(expand=True)

    med = lista[3].iloc[:, 1].str.split(expand=True)

    if lista[4].iloc[:, 1].str.split(expand=True).empty == True:
        equipe = None
    else:
        equipe = lista[4].iloc[:, 1].str.split(expand=True)

    df['item1'] = i1_nome[0]
    df['item2'] = i2_nome[0]
    df['item3'] = i3_nome[0]
    df['item4'] = i4_nome[0]
    df['item5'] = i5_nome[0]

    if i1_data.empty ==True:
        df['i1_data'] = None
    else:
        df['i1_data'] = i1_data[0]
    
    if i2_data.empty ==True:
        df['i2_data'] = None
    else:
        df['i2_data'] = i2_data[0]
    
    if i3_data.empty ==True:
        df['i3_data'] = None
    else:
        df['i3_data'] = i3_data[0]
    
    df['medicao'] = med[0]
    df['medicao'] = df['medicao'].str.upper()

    if equipe is None:
        df['equipe'] = None
    else:
        df['equipe'] = equipe[0]
    
   
    df['equipe'] = df['equipe'].str.upper()

    df['card2'] = df['card']
    df[['local','card']] = df['card'].str.split('|',expand=True)
    df[['macro','resto']] = df['card'].str.split(n=1, expand=True)
    df[['pacote','checklist']] = df['checklist'].str.split('|',expand=True)
    df['code'] = (df['local'] + df['pacote']).str.replace(" ","")
    df['complete'] = (df[['i1_status','i2_status','i3_status','i4_status']] == 'complete').sum(axis=1)



    # df["i1_date"] = df["i1_date"].astype('datetime64[ns]')
    # # #df["i1_date"] = pd.to_datetime(df["i1_date"],infer_datetime_format=True).dt.strftime('%d/%m/%Y')
    # # df['i1_date'] = df['i1_date'].dt.strftime('%d/%m/%Y')

    # df["i2_date"] = df["i2_date"].astype('datetime64[ns]')
    # # #df["i2_date"] = pd.to_datetime(df["i2_date"],infer_datetime_format=True).dt.strftime('%d/%m/%Y')
    # # df['i2_date'] = df['i2_date'].dt.strftime('%d/%m/%Y')

    # df["i3_date"] = df["i3_date"].astype('datetime64[ns]')
    # # #df["i3_date"] = pd.to_datetime(df["i3_date"],infer_datetime_format=True).dt.strftime('%d/%m/%Y')
    # # df['i3_date'] = df['i3_date'].dt.strftime('%d/%m/%Y')

    # # df["i4_date"] = df["i4_date"].astype('datetime64[ns]')
    # # #df["i4_date"] = pd.to_datetime(df["i4_date"],infer_datetime_format=True).dt.strftime('%d/%m/%Y')
    # # df['i4_date'] = df['i4_date'].dt.strftime('%d/%m/%Y')

    # df["i5_date"] = df["i5_date"].astype('datetime64[ns]')
    # # #df["i5_date"] = pd.to_datetime(df["i5_date"],infer_datetime_format=True).dt.strftime('%d/%m/%Y')
    # # df['i5_date'] = df['i5_date'].dt.strftime('%d/%m/%Y')

    #df = df.where(pd.notnull(df), None)
    df_obj = df.select_dtypes(['object'])
    df[df_obj.columns] = df_obj.apply(lambda x: x.str.strip())

    #df.to_csv('trello.csv')
    #df.to_csv('./blog_api/management/commands/trello2.csv', na_rep='None')
    df.to_csv('./blog_api/management/commands/trello2.csv')
    
    
