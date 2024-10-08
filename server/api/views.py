from django.http import JsonResponse
from portal.models import Opportunity
from django.utils import timezone
from rest_framework.generics import ListAPIView
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from portal.models import Opportunity
from portal.serializers import OpportunitySerializer
from django.utils import timezone
from .pagination import OpportunityPagination

def OpportunityDetailView(request, opportunity_id):
    try:
        opportunity = Opportunity.objects.select_related('posted_by').prefetch_related('benefits', 'skills', 'qualifications').get(id=opportunity_id)
        
        if opportunity.expire_date and opportunity.expire_date < timezone.now().date():
            return JsonResponse({"error": "This opportunity has expired"}, status=404)
        
        benefits = [benefit.benefit for benefit in opportunity.benefits.all()]
        skills = [skill.skill for skill in opportunity.skills.all()]
        qualifications = [qualification.qualification for qualification in opportunity.qualifications.all()]
        
        data = {
            "id": opportunity.id,
            "active": opportunity.active,
            "title": opportunity.title,
            "company": opportunity.company,
            "location": opportunity.location,
            "location_type": opportunity.location_type,
            "pay": opportunity.pay,
            "pay_per": opportunity.pay_per,
            "job_type": opportunity.job_type,
            "description": opportunity.description,
            "posted_date": opportunity.posted_date,
            "expire_date": opportunity.expire_date,
            "application_instructions": opportunity.application_instructions,
            "apply_link": opportunity.apply_link,
            "benefits": benefits,
            "skills": skills,
            "qualifications": qualifications
        }
        return JsonResponse(data)
    except Opportunity.DoesNotExist:
        return JsonResponse({"error": "Opportunity not found"}, status=404)
    
class OpportunityListView(ListAPIView):
    queryset = Opportunity.objects.prefetch_related('benefits', 'skills', 'qualifications').all()
    serializer_class = OpportunitySerializer
    pagination_class = OpportunityPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    
    filterset_fields = ['id', 'location_type', 'job_type']
    
    ordering_fields = ['posted_date', 'title','pay']
    
    search_fields = ['title']

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(expire_date__gte=timezone.now().date())
        return queryset