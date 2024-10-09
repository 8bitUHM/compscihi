from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Opportunity, OpportunitySkill, OpportunityQualification, OpportunityBenefit

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

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.groups.filter(name='Admin').exists():
            return qs
        return qs.filter(posted_by=request.user)

    def has_change_permission(self, request, obj=None):
        if obj is not None and obj.posted_by != request.user and not request.user.groups.filter(name='Admin').exists():
            return False
        return super().has_change_permission(request, obj)

    def has_delete_permission(self, request, obj=None):
        if obj is not None and obj.posted_by != request.user and not request.user.groups.filter(name='Admin').exists():
            return False
        return super().has_delete_permission(request, obj)

    def has_add_permission(self, request):
        return True
