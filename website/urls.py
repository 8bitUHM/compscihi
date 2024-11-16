# example/urls.py
from django.urls import path

from website.views import *

urlpatterns = [
  path('account-details/', account_details),
  path('forgot-password', forgot_password),
  path('', root_redirect_to_opportunities),
  path('login/', login),
  path('opportunities/', opportunities, name="opportunities"),
  path('opportunity/', opportunity),
  path('signup/', signup),
  path('student-profile', student_profile),
  path('student-profiles', student_profiles),
  path('about', about)
]
