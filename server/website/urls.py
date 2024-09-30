# example/urls.py
from django.urls import path

from website.views import signup, resend_verification_email, forgot_password

urlpatterns = [
  path('signup/', signup, name='signup'),
  path('resend-verification/', resend_verification_email, name='resend-verification'),
  path('forgot-password/', forgot_password, name='forgot-password'),
]
