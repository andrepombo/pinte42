import csv
from django.core.management import BaseCommand
from django.utils import timezone
from blog.models import Card


class Command(BaseCommand):
    """Command for importing a properly-formatted CSV file with
    customer data into the database.

    # Notes
    - Handles both creating and updating customer records.
    - Uses the file's `id` column as the `id` primary key for our database row.
    - Log messages uses stdout.

    # Expected format:
    ```csv
    id,first_name,last_name,email,gender,company,city,title
    1,Laura,Richards,lrichards0@reverbnation.com,Female,Meezzy,"Warner, NH",Biostatistician I
    ```
    """

    help = "Import customers from CSV into database. Expects one argument containing the file path."

    def add_arguments(self, parser):
        parser.add_argument("trello.csv", type=str)

    def handle(self, *args, **options):
        start_time = timezone.now()
        file_path = options["trello.csv"]
        with open(file_path, "r") as csv_file:
            data = csv.reader(csv_file, delimiter=",")
            next(data)
            for row in data:
                Card.objects.update_or_create(
                    id = row[0],
                    defaults = dict(
                        pavimento = row[1],
                        coluna = row[2],
                        data_inicio = row[3],
                        dia_semana_inicio = row[4],
                        equipe_inicio = row[5],
                        data_fim = row[6],
                        dia_semana_fim = row[7],
                        equipe_fim = row[8],)
                )
        end_time = timezone.now()
        self.stdout.write(
            self.style.SUCCESS(
                f"Loading CSV took: {(end_time-start_time).total_seconds()} seconds."
            )
        )

       

        