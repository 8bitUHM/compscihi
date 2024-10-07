from rest_framework import serializers
from portal.models import Opportunity

class OpportunitySerializer(serializers.ModelSerializer):
  benefits = serializers.StringRelatedField(many=True)
  skills = serializers.StringRelatedField(many=True)
  qualifications = serializers.StringRelatedField(many=True)
  
  class Meta:
    model = Opportunity
    fields = [
      "id", "active", "title", "company", "location", "location_type",
      "pay", "pay_per", "job_type", "description", "posted_date",
      "expire_date", "application_instructions", "apply_link",
      "benefits", "skills", "qualifications"
    ]