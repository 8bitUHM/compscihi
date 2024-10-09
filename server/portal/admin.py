from django.contrib import admin
from .models import Opportunity, OpportunitySkill, OpportunityQualification, OpportunityBenefit

# Register your models here.
class OpportunityQualificationInline(admin.StackedInline):
    model = OpportunityQualification

class OpportunitySkillInline(admin.StackedInline):
    model = OpportunitySkill

class OpportunityBenefitInline(admin.StackedInline):
    model = OpportunityBenefit

@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = (
        "title", 
        "company", 
        "location", 
        "location_type", 
        "job_type",    
        "active", 
        "posted_date",    
        "expire_date"     
    )
    search_fields = ("title", "company", "location")
    list_filter = ("location_type", "job_type", "active")  
    ordering = ("-posted_date",) 
    readonly_fields = ('id','posted_by')

    inlines = [OpportunityQualificationInline, OpportunitySkillInline, OpportunityBenefitInline]

    def save_model(self, request, obj, form, change):
        if not obj.id:
            obj.id = obj.generate_unique_hash_id()
        if not obj.posted_by:
            obj.posted_by = request.user
        super().save_model(request, obj, form, change)