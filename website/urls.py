# example/urls.py
from django.urls import path

from website.views import *

urlpatterns = [
  path('', index, name='signup'),
  path('opportunities/', opportunities)
]
