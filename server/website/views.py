# example/views.py
from django.contrib.auth.views import LoginView, LogoutView
from .forms import CustomUserCreationForm, ResendVerificationForm
from django.shortcuts import render
from .models import *
from .forms import CustomUserCreationForm, LoginForm
from django_email_verification import send_email
from django.contrib.auth.models import User

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