# example/views.py
from django.contrib.auth.views import LoginView, LogoutView
from .forms import CustomUserCreationForm
from django.shortcuts import render, get_object_or_404, redirect
from .models import *
from .forms import CustomUserCreationForm, LoginForm
from django_email_verification import send_email
from django.urls import reverse_lazy
from django.contrib import messages

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


class WebsiteLoginView(LoginView):
  template_name = "pages/login.html"
  authentication_form = LoginForm
  
  def form_valid(self, form):
    return super().form_valid(form)
  
class WebsiteLogoutView(LogoutView):
  next_page = '/'