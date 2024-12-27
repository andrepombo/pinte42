import pandas as pd

def trelloepi_data_process(df: pd.DataFrame):
    """A dummy docstring."""

    i1 = df['item1'].str.split(':', n=2,  expand=True)
    i2 = df['item2'].str.split(':', n=2,  expand=True)
    i3 = df['item3'].str.split(':', n=2,  expand=True)
    i4 = df['item4'].str.split(':', n=2,  expand=True)
    i5 = df['item5'].str.split(':', n=2,  expand=True)
    i6 = df['item6'].str.split(':', n=2,  expand=True)
    i7 = df['item7'].str.split(':', n=2,  expand=True)
    i8 = df['item8'].str.split(':', n=2,  expand=True)
    i9 = df['item9'].str.split(':', n=2,  expand=True)
    i10 = df['item10'].str.split(':', n=2,  expand=True)

    lista =[i1,i2,i3,i4,i5,i6,i7,i8,i9,i10]

    for i, df2 in enumerate(lista):
        lista[i] = lista[i].assign(A=None,B=None,C=None)
    
    i1_nome = lista[0].iloc[:, 1].str.split(expand=True)
    i2_nome = lista[1].iloc[:, 1].str.split(expand=True)
    i3_nome = lista[2].iloc[:, 1].str.split(expand=True)
    i4_nome = lista[3].iloc[:, 1].str.split(expand=True)
    i5_nome = lista[4].iloc[:, 1].str.split(expand=True)
    i6_nome = lista[5].iloc[:, 1].str.split(expand=True)
    i7_nome = lista[6].iloc[:, 0].str.split(expand=True)
    i8_nome = lista[7].iloc[:, 0].str.split(expand=True)
    i9_nome = lista[8].iloc[:, 0].str.split(expand=True)
    i10_nome = lista[9].iloc[:, 0].str.split(expand=True)


    if i1_nome.empty ==True:
        df['item1'] = None
    else:
        df['item1'] = i1_nome[0]

    if i2_nome.empty ==True:
        df['item2'] = None
    else:
        df['item2'] = i2_nome[0]

    if i3_nome.empty ==True:
        df['item3'] = None
    else:
        df['item3'] = i3_nome[0]

    if i4_nome.empty ==True:
        df['item4'] = None
    else:
        df['item4'] = i4_nome[0]

    if i5_nome.empty ==True:
        df['item5'] = None
    else:
        df['item5'] = i5_nome[0]

    if i6_nome.empty ==True:
        df['item6'] = None
    else:
        df['item6'] = i6_nome[0]
    
    
   

   
   
    # df['item1'] = i1_nome[0]
    # df['item2'] = i2_nome[0]
    # df['item3'] = i3_nome[0]
    # df['item4'] = i4_nome[0]
    # df['item5'] = i5_nome[0]
    # df['item6'] = i6_nome[0]
    df['item7'] = i7_nome[0]
    df['item8'] = i8_nome[0]
    df['item9'] = i9_nome[0]
    df['item10'] = i10_nome[0]

    # df['item1'] = i1_nome
    # df['item2'] = i2_nome
    # df['item3'] = i3_nome
    # df['item4'] = i4_nome
    # df['item5'] = i5_nome
    # df['item6'] = i6_nome
    # df['item7'] = i7_nome
    # df['item8'] = i8_nome
    # df['item9'] = i9_nome
    # df['item10'] = i10_nome


    # df["item1_date"] = pd.to_datetime(df["item1_date"]).dt.strftime('%d/%m/%Y')
    # df["item2_date"] = pd.to_datetime(df["item2_date"]).dt.strftime('%d/%m/%Y')
    # df["item3_date"] = pd.to_datetime(df["item3_date"]).dt.strftime('%d/%m/%Y')
    # df["item4_date"] = pd.to_datetime(df["item4_date"]).dt.strftime('%d/%m/%Y')
    # df["item5_date"] = pd.to_datetime(df["item5_date"]).dt.strftime('%d/%m/%Y')
   
    df_obj = df.select_dtypes(['object'])
    df[df_obj.columns] = df_obj.apply(lambda x: x.str.strip())

    df.to_csv('./blog_api/management/commands/trelloepi.csv')
    
    
