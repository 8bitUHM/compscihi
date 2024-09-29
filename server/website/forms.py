from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import Group, User
from django.utils.translation import gettext_lazy as _


class CustomUserCreationForm(UserCreationForm):
  group_name = "Admin"

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    for field_name, field in self.fields.items():
        field.widget.attrs.update(attrs)

  class Meta(UserCreationForm.Meta):
    model = User
    fields = ("username","email", "password1", "password2")

  def save(self, commit=True):
    user = super().save(commit=False)
    if commit:
      user.save()
      default_group = Group.objects.get(name=self.group_name)
      user.groups.add(default_group)
    return user

attrs = {
  "class": "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ",
}