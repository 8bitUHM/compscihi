from django.urls import path
from api.views import OpportunityDetailView, OpportunityListView

urlpatterns = [
    path('opportunity/<str:opportunity_id>/', OpportunityDetailView,name='opportunity_detail'),
    path('opportunities/', OpportunityListView.as_view(), name='opportunity-list'),
]
