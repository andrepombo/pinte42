import pandas as pd
import numpy as np



def teste(dict1,dict2):
    graph_list =[]
    for (k, v), (z,h) in zip(dict1.items(),dict2.items()):
        x = {'card': k, 'pv': v, "uv": round(h,4)}
        graph_list.append(x) 
    return graph_list


def get_graph_data(df: pd.DataFrame, col_name: str):
    """A dummy docstring."""
    if df.empty:
        return None

    # cleanup the dataset first
    df_cleaned = df[col_name].replace("", np.nan).dropna()

    graph_data = df_cleaned.value_counts().to_dict()
    graph_data2 = df_cleaned.value_counts(normalize=True).to_dict()

    # format results as per the charting library
    #graph_data_formatted = [{'name': k, 'pv': v} for k, v in graph_data.items()]

    graph_data_formatted = teste(graph_data,graph_data2)
    
    return graph_data_formatted

def process_dataframe(df: pd.DataFrame):
    """A dummy docstring."""
    data = {
        # 'stats': {
        #     'total_events_count': df.shape[0],
        #     'total_drafts_count': df.loc[df['status'] == 'Draft'].shape[0],
        #     'clients_count': df['client_id'].unique().shape[0],
        #     'loc_count': df['state'].unique().shape[0],
        #     'cm_events_count': get_cm_events_count(df, 'event_submitted_date', datetime.now()),
        #     'pct_change_events_count': get_pct_change_events_count(df, 'event_submitted_date',
        #                                                                datetime.now()),
        #     'most_active_submitter': get_most_active_type(df, 'submitter_name'),
        #     'most_active_camop': get_most_active_type(df, 'camop_name'),
        #     'most_active_state': get_most_active_type(df, 'state'),
        #     'most_active_country': get_most_active_type(df, 'country'),
        # },
        # 'top_clients_data': get_top_clients_data(df, 'client_name'),
        'nome': get_graph_data(df, 'pacote'),
        'pacote': get_graph_data(df, 'pacote'),
        # 'author': get_graph_data(df, 'author'),
        # 'time_series_data': get_time_series_data(df),
    }
    
   

    return data