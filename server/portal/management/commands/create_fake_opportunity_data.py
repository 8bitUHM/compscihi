import random
from django.core.management.base import BaseCommand
from faker import Faker
from datetime import datetime, timedelta
from portal.models import Opportunity, OpportunitySkill, OpportunityQualification, OpportunityBenefit, User
from core.settings import DATABASES

class Command(BaseCommand):
  help = "Create 100 fake Opportunity entries"
  
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
    
    fake = Faker()
    location_types = ['Remote', 'On-site', 'Hybrid']
    job_types = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Co-op']

    for _ in range(100):
      posted_by = random.choice(User.objects.all()) 
      title = fake.job()
      company = fake.company()
      location = fake.city()
      location_type = random.choice(location_types)
      pay = round(random.uniform(30000, 150000), 2)
      pay_per = random.choice(['per hour', 'per year'])
      job_type = random.choice(job_types)
      description = fake.text(max_nb_chars=500)
      posted_date = fake.date_between(start_date='-1y', end_date='today')
      expire_date = posted_date + timedelta(days=random.randint(30, 180))
      apply_link = fake.url()
      application_instructions = f"Apply online at {apply_link}"

      opportunity = Opportunity.objects.create(
        id=Opportunity.generate_unique_hash_id(),
        posted_by=posted_by,
        title=title,
        company=company,
        location=location,
        location_type=location_type,
        pay=pay,
        pay_per=pay_per,
        job_type=job_type,
        description=description,
        posted_date=posted_date,
        expire_date=expire_date,
        application_instructions=application_instructions,
        apply_link=apply_link
      )

      for _ in range(random.randint(1, 5)):
        OpportunitySkill.objects.create(
          opportunity=opportunity,
          skill=fake.word()
        )

      for _ in range(random.randint(1, 3)):
        OpportunityQualification.objects.create(
          opportunity=opportunity,
          qualification=fake.sentence()
        )

      for _ in range(random.randint(1, 3)):
        OpportunityBenefit.objects.create(
          opportunity=opportunity,
          benefit=fake.sentence()
        )

    self.stdout.write(self.style.SUCCESS("Successfully created 100 fake Opportunity entries"))
