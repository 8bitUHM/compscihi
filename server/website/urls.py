# example/urls.py
from django.urls import path

from website.views import signup, resend_verification_email

urlpatterns = [
  path('signup/', signup, name='signup'),
  path('resend-verification/', resend_verification_email, name='resend-verification'),
]
