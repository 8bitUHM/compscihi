from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist

class Command(BaseCommand):
  help = 'Create Admin, Employer, and Authorized Poster groups and assign CRUD permissions for portal models.'

  def handle(self, *args, **kwargs):
    model_names = ['Opportunity', 'OpportunityQualification', 'OpportunitySkill', 'OpportunityBenefit']
    groups = ['Test1', 'Test2', 'Test Poster']

    try:
      for model_name in model_names:
        if not apps.get_model('portal', model_name):
          raise ObjectDoesNotExist(f"The model '{model_name}' does not exist in the 'portal' app.")
    except (LookupError, ObjectDoesNotExist) as e:
      self.stdout.write(self.style.ERROR(f"Error: {str(e)}"))
      self.stdout.write(self.style.ERROR("Aborting operation. Ensure all models exist in the 'portal' app."))
      return
    
    permission_types = ['add', 'change', 'delete', 'view']
    
    for group_name in groups:
      group, created = Group.objects.get_or_create(name=group_name)
      if created:
        self.stdout.write(f"Group '{group_name}' created.")
      else:
        self.stdout.write(f"Group '{group_name}' already exists.")
      
      group.permissions.clear()
      self.stdout.write(f"All permissions cleared for '{group_name}'.")
      
      for model_name in model_names:
        for perm_type in permission_types:
          try:
            perm = Permission.objects.get(codename=f'{perm_type}_{model_name.lower()}')
            group.permissions.add(perm)
            self.stdout.write(f"Assigned permission '{perm_type}_{model_name.lower()}' to '{group_name}'.")
          except Permission.DoesNotExist:
            self.stdout.write(self.style.WARNING(f"Permission '{perm_type}_{model_name.lower()}' not found."))

    self.stdout.write(self.style.SUCCESS('Groups and permissions set up successfully!'))
