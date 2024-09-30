# example/views.py
from datetime import datetime

from django.http import HttpResponse

from .forms import CustomUserCreationForm
from django.shortcuts import render, get_object_or_404, redirect
from .models import *
from .forms import CustomUserCreationForm
from django_email_verification import send_email

def signup(request):
  if request.method == 'POST':
    form = CustomUserCreationForm(request.POST)
    if form.is_valid():
      user = form.save()
      send_email(user)
      form.errors['success'] = "Success"
      
  else:
    form = CustomUserCreationForm()
  return render(request, 'pages/signup.html', {'form': form})