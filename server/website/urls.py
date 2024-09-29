# example/urls.py
from django.urls import path

from website.views import index, signup

urlpatterns = [
  path('', index, name="login_page"),
  path('signup/', signup, name='signup'),
]