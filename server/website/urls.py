# example/urls.py
from django.urls import path

from website.views import signup

urlpatterns = [
  path('signup/', signup, name='signup'),
]