from django.http import JsonResponse
from portal.models import Opportunity
from django.utils import timezone

def OpportunityDetailView(request, opportunity_id):
    try:
        opportunity = Opportunity.objects.get(id=opportunity_id)
        if opportunity.expire_date and opportunity.expire_date < timezone.now().date():
            return JsonResponse({"error": "This opportunity has expired"}, status=404)

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
            "apply_link": opportunity.apply_link
        }
        return JsonResponse(data)
    except Opportunity.DoesNotExist:
        return JsonResponse({"error": "Opportunity not found"}, status=404)
