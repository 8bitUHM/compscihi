from django.test import TestCase
from django.contrib.auth.models import User, Group
from .forms import ForgotPasswordForm, ResendVerificationForm, LoginForm, CustomUserCreationForm
import os

class FormTests(TestCase):

  def setUp(self):
    self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password123')
    self.user.is_active = False
    self.user.save()
    self.active_user = User.objects.create_user(username='activeuser', email='active@example.com', password='password123')
    self.active_user.is_active = True
    self.active_user.save()

    Group.objects.create(name="Employer")
    Group.objects.create(name="Authorized poster")
    Group.objects.create(name="Admin")

  def test_forgot_password_form_valid_email(self):
    form_data = {'email': 'test@example.com'}
    form = ForgotPasswordForm(data=form_data)
    self.assertTrue(form.is_valid())

  def test_forgot_password_form_invalid_email(self):
    form_data = {'email': 'nonexistent@example.com'}
    form = ForgotPasswordForm(data=form_data)
    self.assertFalse(form.is_valid())

  def test_resend_verification_form_valid(self):
    form_data = {'email': 'test@example.com'}
    form = ResendVerificationForm(data=form_data)
    self.assertTrue(form.is_valid())

  def test_resend_verification_form_already_verified(self):
    form_data = {'email': 'active@example.com'}
    form = ResendVerificationForm(data=form_data)
    self.assertFalse(form.is_valid())
      
  def test_login_form_valid_email(self):
    form_data = {'username': 'active@example.com', 'password': 'password123'}
    form = LoginForm(data=form_data)
    form.request = None 
    self.assertTrue(form.is_valid())

  def test_login_form_invalid_email(self):
    form_data = {'username': 'nonexistent@example.com', 'password': 'password123'}
    form = LoginForm(data=form_data)
    form.request = None
    self.assertFalse(form.is_valid())
    self.assertEqual(form.errors['__all__'], ["Invalid email or password."])

  def test_custom_user_creation_form_valid(self):
    os.environ['EMPLOYER_KEY'] = 'valid_key'
    form_data = {
      'email': 'newuser@example.com',
      'password1': 'un1quep@ss0wrd!',
      'password2': 'un1quep@ss0wrd!',
      'signup_key': 'valid_key'
    }
    form = CustomUserCreationForm(data=form_data)
    self.assertTrue(form.is_valid())
    user = form.save()
    self.assertFalse(user.is_active)  
    self.assertTrue(user.groups.filter(name="Employer").exists())

  def test_custom_user_creation_form_invalid_key(self):
    form_data = {
      'email': 'newuser@example.com',
      'password1': 'password123',
      'password2': 'password123',
      'signup_key': 'invalid_key'
    }
    form = CustomUserCreationForm(data=form_data)
    self.assertFalse(form.is_valid())
