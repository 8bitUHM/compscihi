from django.contrib import admin
from .models import Opportunity

# Register your models here.
@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = (
        "title", 
        "company", 
        "location", 
        "location_type",  # Updated to snake_case
        "job_type",       # Updated to snake_case
        "active", 
        "posted_date",    # Updated to snake_case
        "expire_date"     # Updated to snake_case
    )
    search_fields = ("title", "company", "location")
    list_filter = ("location_type", "job_type", "active")  # Updated to snake_case
    ordering = ("-posted_date",)  # Updated to snake_case

