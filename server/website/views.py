# example/views.py
from datetime import datetime

from django.http import HttpResponse

from .forms import CustomUserCreationForm
from django.shortcuts import render, get_object_or_404, redirect
from .models import *
from .forms import CustomUserCreationForm
from verify_email.email_handler import send_verification_email

def index(request):
    now = datetime.now()
    html = f'''
    <html>
        <body>
            <h1>Hello from Vercel!</h1>
            <p>The current time is { now }.</p>
        </body>
    </html>
    '''
    return HttpResponse(html)

def signup(request):
  if request.method == 'POST':
    form = CustomUserCreationForm(request.POST)
    if form.is_valid():
      form.save()
      send_verification_email(request, form)
  else:
    form = CustomUserCreationForm()
  return render(request, 'pages/signup.html', {'form': form})