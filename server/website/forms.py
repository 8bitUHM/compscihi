from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import Group, User
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
import os
from django.contrib.auth import authenticate


class ForgotPasswordForm(forms.Form):
  email = forms.EmailField(label="Email", max_length=254, widget=forms.EmailInput(attrs={
    "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    "placeholder": "Enter your email"
  }))
  
  def clean(self):
    email = self.cleaned_data.get('email')
    try:
      User.objects.get(email=email)
    except User.DoesNotExist:
      raise forms.ValidationError("Email not yet registered.")
    
    return self.cleaned_data

class ResendVerificationForm(forms.Form):
  email = forms.EmailField(label="Email", max_length=254, widget=forms.EmailInput(attrs={
      "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
      "placeholder": "Enter your email"
  }))
  
  def clean(self):
    email = self.cleaned_data.get('email')
    try:
      user = User.objects.get(email=email)
      if user.is_active:
        raise forms.ValidationError("Email already verified.")
    except User.DoesNotExist:
      raise forms.ValidationError("Email not yet registered.")
    
    return self.cleaned_data
    
class LoginForm(AuthenticationForm):
  username = forms.CharField(
      widget=forms.TextInput(
          attrs={
              "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          }
      )
  )
  password = forms.CharField(
      widget=forms.PasswordInput(
          attrs={
              "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          }
      )
  )
  
  def clean(self):
    username_or_email = self.cleaned_data.get('username')
    password = self.cleaned_data.get('password')

    if username_or_email and password:
      if '@' in username_or_email:
        try:
          user = User.objects.get(email=username_or_email)
          username = user.username  
        except User.DoesNotExist:
          raise forms.ValidationError("Invalid email or password.")
      else:
        try:
          username = username_or_email
          user = User.objects.get(username = username)
        except User.DoesNotExist:
          raise forms.ValidationError("Invalid email or password.")
          
      if not user.is_active:
        raise forms.ValidationError("Your email is not yet verified.")

      self.user_cache = authenticate(self.request, username=username, password=password)
      
      if self.user_cache is None:
        raise forms.ValidationError("Invalid username or password.")

    return self.cleaned_data
  

class CustomUserCreationForm(UserCreationForm):
  signup_key = forms.CharField(max_length=50, required=True, widget=forms.PasswordInput(attrs={
    'class': "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  }))

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    attrs = {
      "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    }
    for field_name, field in self.fields.items():
      field.widget.attrs.update(attrs)

  class Meta(UserCreationForm.Meta):
    model = User
    fields = ("email", "password1", "password2", "signup_key")

  def save(self, commit=True):
    user = super().save(commit=False)
    signup_key = self.cleaned_data.get('signup_key')
    if signup_key == os.getenv("EMPLOYER_KEY"):
      default_group = Group.objects.get(name="Employer")
    elif signup_key == os.getenv("AUTHORIZED_POSTER_KEY"):
      default_group = Group.objects.get(name="Authorized poster")
    elif signup_key == os.getenv("ADMIN_KEY"):
      default_group = Group.objects.get(name="Admin")
    else:
      raise ValidationError("Invalid signup key.")

    if commit:
      cleaned_data = super().clean()  
      user.username = cleaned_data.get('email').split("@")[0]
      user.is_active = False
      user.is_staff=True
      user.save()
      user.groups.add(default_group)
  
    return user

  def clean(self):
    cleaned_data = super().clean()  
    email = cleaned_data.get('email')
    signup_key = cleaned_data.get('signup_key')

    if User.objects.filter(email=email).exists():
      raise ValidationError("Email is already associated with an account.")
    
    employer_key = os.getenv("EMPLOYER_KEY")
    authorized_poster_key = os.getenv("AUTHORIZED_POSTER_KEY")
    admin_key = os.getenv("ADMIN_KEY")
    
    if signup_key not in [employer_key, authorized_poster_key, admin_key]:
      raise ValidationError("Invalid signup key.")

    return cleaned_data