from django.urls import path
from api.views import OpportunityDetailView

urlpatterns = [
    path(
        'opportunity/<str:opportunity_id>/', OpportunityDetailView,
        name='opportunity_detail'
        )
]
