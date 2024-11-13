from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'website/pages/home.html')

def opportunities(request):
    return render(request, 'website/pages/opportunities.html')
