from django.core.management.base import BaseCommand
from portal.models import Opportunity

class Command(BaseCommand):
  help = "Remove all Opportunity data"
  
  def isRunningLocalSettingsAndDatabase(self):
    try:
      from core.local_settings import DATABASES
      return DATABASES['default']['ENGINE']=="django.db.backends.sqlite3"
    except ImportError:
      return False

  def handle(self, *args, **kwargs):
    if not self.isRunningLocalSettingsAndDatabase():
      self.stdout.write(self.style.ERROR("This command can only be run if you have local_settings.py setup and running on local SQLite database"))
      return
    
    count = Opportunity.objects.count()
    Opportunity.objects.all().delete()
    self.stdout.write(self.style.SUCCESS(f"Successfully deleted {count} Opportunity entries"))
