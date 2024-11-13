from django.urls import path
from api.views import OpportunityDetailView, OpportunityListView, AllOpportunities

urlpatterns = [
    path('opportunity/<str:opportunity_id>/', OpportunityDetailView,name='opportunity_detail'),
    path('opportunities/', OpportunityListView.as_view(), name='opportunity-list'),
    path('opportunities/all/', AllOpportunities.as_view(), name='all_opportunities'),
]