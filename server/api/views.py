from django.http import JsonResponse
from portal.models import Opportunity
# Create your views here.


def OpportunityDetailView(request,opportunity_id):
    try:
        opportunity = Opportunity.objects.get(id=opportunity_id)
        data = {
            "id": opportunity.id,
            "posted_by": {
                "user-id": opportunity.posted_by.id,
                "user": opportunity.posted_by.username
                },
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
            "apply_link": opportunity.apply_link
        }
        return JsonResponse(data)
    except Opportunity.DoesNotExist:
        return JsonResponse({"error": "Opportunity not found"}, status=404)
