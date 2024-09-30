# example/views.py
from datetime import datetime

from django.http import HttpResponse

from .forms import CustomUserCreationForm
from django.shortcuts import render, get_object_or_404, redirect
from .models import *
from .forms import CustomUserCreationForm

def signup(request):
  if request.method == 'POST':
    form = CustomUserCreationForm(request.POST)
    if form.is_valid():
      form.save()
  else:
    form = CustomUserCreationForm()
  return render(request, 'pages/signup.html', {'form': form})