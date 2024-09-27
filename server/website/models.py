from django.db import models

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
    
    id = models.CharField(
        max_length=255, 
        primary_key=True, 
        help_text="Unique identifier for the opportunity."
    )
    active = models.BooleanField(
        default=True, 
        help_text="Indicates whether the opportunity is currently active and available."
    )
    title = models.CharField(
        max_length=255, 
        help_text="The title of the job opportunity (e.g., Software Engineer, Data Analyst)."
    )
    company = models.CharField(
        max_length=255, 
        help_text="The name of the company offering the opportunity."
    )
    location = models.CharField(
        max_length=255, 
        help_text="Physical location of the job (e.g., New York, San Francisco)."
    )
    location_type = models.CharField(
        max_length=10, 
        choices=LOCATION_TYPE_CHOICES, 
        help_text="Specify if the opportunity is Remote, On-site, or Hybrid."
    )
    pay = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True, 
        help_text="The salary or hourly wage for the position. Leave blank if not specified."
    )
    pay_per = models.CharField(
        max_length=50, 
        null=True, 
        blank=True, 
        help_text="The frequency of pay (e.g., per hour, per year). Leave blank if not specified."
    )
    job_type = models.CharField(
        max_length=20, 
        choices=JOB_TYPE_CHOICES, 
        help_text="Type of employment (e.g., Full-time, Part-time, Internship)."
    )
    description = models.TextField(
        help_text="Detailed description of the job responsibilities and expectations."
    )
    posted_date = models.DateField(
        help_text="The date when the opportunity was posted."
    )
    expire_date = models.DateField(
        help_text="The date when the opportunity expires or is no longer active."
    )
    application_instructions = models.TextField(
        help_text="Instructions on how to apply for the opportunity (e.g., submit resume, fill online form)."
    )
    apply_link = models.URLField(
        null=True, 
        blank=True, 
        help_text="Link to the job application or company career page."
    )

    def __str__(self):
        return f"{self.title} at {self.company} ({self.job_type})"

    class Meta:
        verbose_name_plural = "Opportunities"
