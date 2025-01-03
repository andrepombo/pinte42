from . import trello_services
from . import apiTrello

from django.core.management import BaseCommand
import csv
from apps.boards.models import Board
from apps.cards.models import Card
from apps.update.models import UpdateData
from apps.teams.models import Equipe




from schedule import Scheduler
import threading
import time
from django.utils import timezone
from datetime import datetime, time


class Command(BaseCommand):
    def input(self):
        file_path = 'blog_api/management/commands/trello2.csv'
        with open(file_path, "r") as csv_file:
                data = csv.reader(csv_file, delimiter=",")
                next(data)
                Boards = []
               
                for row in data:
                    if row[1] not in Boards:
                        Boards.append(row[1])
                        Board.objects.update_or_create(
                        #id = len(Boards),
                        id = row[1],
                        defaults = dict(
                            board = row[2]
                        )
                    )
                    if row[30] != "":
                        Equipe.objects.update_or_create(
                                nome = row[30],
                                obra = Board.objects.get(board=row[2]),
                                # pintor1 = "",
                                # pintor2 = ""
                        )  
                
                    for i in [9, 13, 17, 21, 25]:
                        if row [i] == "":
                            row[i] = None
                    Card.objects.update_or_create(
                        id = row[2] + "_" + row[36],
                        #id =  row[33],
                        #id = row[0],
                        defaults = dict(

                            board = Board.objects.get(board=row[2]),
                            card = row[3],
                            cardUrl = row[4],
                            
                            checklist = row[5],
                            #cardActive = row[5],
                            
                            item1 = row[6],
                            i1_status = row[7],
                            i1_user = row[8],
                            i1_date_auto = row[9],
                            

                            item2= row[10],
                            i2_status = row[11],
                            i2_user = row[12],
                            i2_date_auto = row[13],

                            item3 = row[14],
                            i3_status = row[15],
                            i3_user = row[16],
                            i3_date_auto = row[17],


                            item4= row[18],
                            i4_status = row[19],
                            i4_user = row[20],
                            i4_date_auto = row[21],

                            item5= row[22],
                            i5_status = row[23],
                            i5_user = row[24],
                            i5_date_auto = row[25],
                
                            i1_data = row[26],
                            i2_data = row[27],
                            i3_data = row[28],

                            med = row[29],
        
                            equipe = row[30],

                            card2 = row[31],
                            
                            local = row[32],

                            macro = row[33],
                            
                            pacote = row[35],

                            code = row[36],

                            complete = row[37]
                    ))
                        
    def handle(self, *args, **options):
        now = datetime.now()
        now_time = now.time()
        print(now_time)
        if now_time >= time(7,00) and now_time <= time(23,00):
            print ("Day")
            start_time1 = timezone.now()
            start_time2 = timezone.now()
            APITrello = apiTrello.trello()
            df = APITrello.getAllBoards2()
            end_time2 = timezone.now()
            seconds2 = (end_time2-start_time2).total_seconds()
            minutes2 = ((end_time2-start_time2).total_seconds()) / 60
            print("-------------------------------------------------")
            print(f"Trello Total request took: {(seconds2)} seconds.")
            start_time4 = timezone.now()
            trello_services.trello_data_process(df)
            end_time4 = timezone.now()
            seconds4 = ((end_time4-start_time4).total_seconds()) 
            minutes4 = ((end_time4-start_time4).total_seconds()) / 60
            print(f"Data Process took: {(minutes4)} seconds.")
            start_time3 = timezone.now()
            self.input()
            end_time3 = timezone.now()
            seconds3 = (end_time3-start_time3).total_seconds()
            minutes3 = ((end_time3-start_time3).total_seconds()) / 60
            print(f"Data Input took: {(seconds3)}seconds.")
            print('Database Updated!')
            end_time1 = timezone.now()
            seconds = (end_time1-start_time1).total_seconds()
            minutes = ((end_time1-start_time1).total_seconds()) / 60
            print(f"Loading Data took: {(seconds)} seconds.")
            UpdateData.objects.update_or_create(
                        last_update = timezone.now(),
                        trello_request = minutes2,
                        data_input = minutes3,
                    )
        else:
            print("Night")