from django.shortcuts import render, redirect
from django.urls import reverse

# Create your views here.

def account_details(request):
    return render(request, 'website/pages/account-details.html')

def forgot_password(request):
    return render(request, 'website/pages/forgot-password.html')

def index(request):
    return render(request, 'website/pages/home.html')

def login(request):
    return render(request, 'website/pages/login.html')

def opportunities(request):
    return render(request, 'website/pages/opportunities.html')

def opportunity(request):
    return render(request, 'website/pages/opportunity.html')

def signup(request):
    return render(request, 'website/pages/signup.html')

def student_profile(request):
    return render(request, 'website/pages/student-profile.html')

def student_profiles(request):
    return render(request, 'website/pages/student-profiles.html')

def root_redirect_to_opportunities(request):
    url = reverse('opportunities') + '?search=&location_type=&job_type=&ordering=-posted_date&page=1'
    return redirect(url)

def about(request):
    return render(request, 'website/pages/about.html')