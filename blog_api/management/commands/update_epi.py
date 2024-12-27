from . import trelloEpi_services
from . import apiTrelloEpi

from django.core.management import BaseCommand
import csv
from blog.models import BoardEpi, Card, UpdateData, Epi, Board


from schedule import Scheduler
import threading
import time
from django.utils import timezone
from datetime import datetime, time
#

class Command(BaseCommand):
    def input(self):
        file_path = 'blog_api/management/commands/trelloepi.csv'
        with open(file_path, "r") as csv_file:
                data = csv.reader(csv_file, delimiter=",")
                next(data)
                Boards = []
                for row in data:
                    if row[3] not in Boards:
                        Boards.append(row[3])
                        BoardEpi.objects.update_or_create(
                        #id = len(Boards),
                        id = row[3],
                        defaults = dict(
                            board = row[2],
                            card = row[3]
                        )
                    )
                    for i in [9, 13, 17, 21, 25, 29, 33, 37, 41, 45]:
                        if row [i] == "":
                            row[i] = None
                    Epi.objects.update_or_create(
                        #id = row[2] + "_" + row[36],
                        id = row[0],
                        defaults = dict(
                            #board = BoardEpi.objects.get(board=row[2]),
                            board = row[2],
                            card = row[3],
                            cardUrl = row[4],
                            checklist = row[5],
                           
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

                            item6 = row[26],
                            i6_status = row[27],
                            i6_user = row[28],
                            i6_date_auto = row[29],
                            
                            item7= row[30],
                            i7_status = row[31],
                            i7_user = row[32],
                            i7_date_auto = row[33],

                            item8 = row[34],
                            i8_status = row[35],
                            i8_user = row[36],
                            i8_date_auto = row[37],

                            item9= row[38],
                            i9_status = row[39],
                            i9_user = row[40],
                            i9_date_auto = row[41],

                            item10= row[42],
                            i10_status = row[43],
                            i10_user = row[44],
                            i10_date_auto = row[45],

                        ))
                        
    # def handle(self, *args, **options):
    #     now = datetime.now()
    #     now_time = now.time()
    #     print(now_time)
    #     if now_time >= time(7,00) and now_time <= time(23,00):
    #         print ("Day")
    #         start_time1 = timezone.now()
    #         start_time2 = timezone.now()
    #         APITrelloEpi = apiTrelloEpi.trelloepi()
    #         df = APITrelloEpi.getAllBoards2()
    #         end_time2 = timezone.now()
    #         seconds2 = (end_time2-start_time2).total_seconds()
    #         minutes2 = ((end_time2-start_time2).total_seconds()) / 60
    #         print("-------------------------------------------------")
    #         print(f"Trello Total request took: {(seconds2)} seconds.")
    #         start_time4 = timezone.now()
    #         trelloEpi_services.trelloepi_data_process(df)
    #         end_time4 = timezone.now()
    #         seconds4 = ((end_time4-start_time4).total_seconds()) 
    #         minutes4 = ((end_time4-start_time4).total_seconds()) / 60
    #         print(f"Data Process took: {(minutes4)} seconds.")
    #         start_time3 = timezone.now()
    #         self.input()
    #         end_time3 = timezone.now()
    #         seconds3 = (end_time3-start_time3).total_seconds()
    #         minutes3 = ((end_time3-start_time3).total_seconds()) / 60
    #         print(f"Data Input took: {(seconds3)}seconds.")
    #         print('Database Updated!')
    #         end_time1 = timezone.now()
    #         seconds = (end_time1-start_time1).total_seconds()
    #         minutes = ((end_time1-start_time1).total_seconds()) / 60
    #         print(f"Loading Data took: {(seconds)} seconds.")
    #         # UpdateData.objects.update_or_create(
    #         #             last_update = timezone.now(),
    #         #             trello_request = minutes2,
    #         #             data_input = minutes3,
    #         #         )
    #     else:
    #         print("Night")


    def handle(self, *args, **options):
        now = datetime.now()
        now_time = now.time()
        print(now_time)
       
        print ("Day")
        start_time1 = timezone.now()
        start_time2 = timezone.now()
        APITrelloEpi = apiTrelloEpi.trelloepi()
        df = APITrelloEpi.getAllBoards2()
        end_time2 = timezone.now()
        seconds2 = (end_time2-start_time2).total_seconds()
        minutes2 = ((end_time2-start_time2).total_seconds()) / 60
        print("-------------------------------------------------")
        print(f"Trello Total request took: {(seconds2)} seconds.")
        start_time4 = timezone.now()
        trelloEpi_services.trelloepi_data_process(df)
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
        # UpdateData.objects.update_or_create(
        #             last_update = timezone.now(),
        #             trello_request = minutes2,
        #             data_input = minutes3,
        #         )
       