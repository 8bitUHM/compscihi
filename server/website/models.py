from django.db import models
import uuid
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

class Opportunity(models.Model):
  LOCATION_TYPE_CHOICES = [
    ("Remote", "Remote"),
    ("On-site", "On-site"),
    ("Hybrid", "Hybrid"),
  ]
  
  JOB_TYPE_CHOICES = [
    ("Full-time", "Full-time"),
    ("Part-time", "Part-time"),
    ("Contract", "Contract"),
    ("Internship", "Internship"),
    ("Co-op", "Co-op"),
  ]
  
  id = models.CharField(max_length=255, primary_key=True, unique=True, help_text="Unique identifier for the opportunity. Auto-filled on save.")
  posted_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE, help_text="Opportunity posted by user. Auto-filled on save.")
  active = models.BooleanField(default=True, help_text="Indicates whether the opportunity is currently active and available.")
  title = models.CharField(max_length=255, help_text="The title of the job opportunity (e.g., Software Engineer, Data Analyst).")
  company = models.CharField(max_length=255, help_text="The name of the company offering the opportunity.")
  location = models.CharField(max_length=255, help_text="Physical location of the job (e.g., New York, San Francisco).")
  location_type = models.CharField(max_length=10, choices=LOCATION_TYPE_CHOICES, help_text="Specify if the opportunity is Remote, On-site, or Hybrid.")
  pay = models.DecimalField(max_digits=10,decimal_places=2, null=True, blank=True, help_text="The salary or hourly wage for the position. Leave blank if not specified.")
  pay_per = models.CharField(max_length=50, null=True, blank=True, help_text="The frequency of pay (e.g., per hour, per year). Leave blank if not specified.")
  job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, help_text="Type of employment (e.g., Full-time, Part-time, Internship).")
  description = models.TextField(help_text="Detailed description of the job responsibilities and expectations.")
  posted_date = models.DateField(help_text="The date when the opportunity was posted.")
  expire_date = models.DateField(help_text="The date when the opportunity expires or is no longer active.")
  application_instructions = models.TextField(help_text="Instructions on how to apply for the opportunity (e.g., submit resume, fill online form).")
  apply_link = models.URLField(null=True, blank=True, help_text="Link to the job application or company career page.")

  def __str__(self):
    return f"{self.title} at {self.company} ({self.job_type})"

  @staticmethod
  def generate_unique_hash_id():
    while True:
      new_uuid = str(uuid.uuid4()).replace('-', '')  
      new_id = f"{new_uuid[:3]}-{new_uuid[3:6]}" 
      if not Opportunity.objects.filter(id=new_id).exists():
          return new_id
        
  def clean(self):
    super().clean()
    
    if self.expire_date and self.posted_date:
      if self.expire_date <= self.posted_date:
        raise ValidationError({
          'expire_date': _('Expire date must be after the posted date.')
        })

  class Meta:
    verbose_name_plural = "Opportunities"
