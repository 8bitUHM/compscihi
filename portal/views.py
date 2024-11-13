# example/views.py
from django.contrib.auth.views import LoginView, LogoutView
from .forms import CustomUserCreationForm, ResendVerificationForm, LoginForm, ForgotPasswordForm
from django.shortcuts import render, redirect
from .models import *
from django_email_verification import send_email, send_password
from django.contrib.auth.models import User
from django import forms


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


class PortalLoginView(LoginView):
  template_name = "pages/login.html"
  authentication_form = LoginForm
  
  def form_valid(self, form):
    return super().form_valid(form)
  
class PortalLogoutView(LogoutView):
  next_page = '/admin'
  
def resend_verification_email(request):
  if request.method == 'POST':
    form = ResendVerificationForm(request.POST)
    if form.is_valid():
      email = form.cleaned_data['email']
      user = User.objects.get(email = email)
      send_email(user)
      form.errors['success'] = "Success"
    
  else:
    form = ResendVerificationForm()

  return render(request, 'pages/resend-verification.html', {'form': form})

def forgot_password(request):
  if request.method == 'POST':
    form = ForgotPasswordForm(request.POST)
    if form.is_valid():
      email = form.cleaned_data['email']
      try:
        user = User.objects.get(email = email)
        send_password(user)
        form.errors['success'] = "Success"
      except:
        raise forms.ValidationError("Email not yet registered.")

  else:
    form = ForgotPasswordForm()

  return render(request, 'pages/forgot-password.html', {'form': form})

def root_route_to_login(request):
  return redirect("/admin/")