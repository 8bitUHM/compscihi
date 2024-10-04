# Generated by Django 4.2.15 on 2024-10-04 23:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Opportunity',
            fields=[
                ('id', models.CharField(help_text='Unique identifier for the opportunity. Auto-filled on save.', max_length=255, primary_key=True, serialize=False, unique=True)),
                ('active', models.BooleanField(default=True, help_text='Indicates whether the opportunity is currently active and available.')),
                ('title', models.CharField(help_text='The title of the job opportunity (e.g., Software Engineer, Data Analyst).', max_length=255)),
                ('company', models.CharField(help_text='The name of the company offering the opportunity.', max_length=255)),
                ('location', models.CharField(help_text='Physical location of the job (e.g., New York, San Francisco).', max_length=255)),
                ('location_type', models.CharField(choices=[('Remote', 'Remote'), ('On-site', 'On-site'), ('Hybrid', 'Hybrid')], help_text='Specify if the opportunity is Remote, On-site, or Hybrid.', max_length=10)),
                ('pay', models.DecimalField(blank=True, decimal_places=2, help_text='The salary or hourly wage for the position. Leave blank if not specified.', max_digits=10, null=True)),
                ('pay_per', models.CharField(blank=True, help_text='The frequency of pay (e.g., per hour, per year). Leave blank if not specified.', max_length=50, null=True)),
                ('job_type', models.CharField(choices=[('Full-time', 'Full-time'), ('Part-time', 'Part-time'), ('Contract', 'Contract'), ('Internship', 'Internship'), ('Co-op', 'Co-op')], help_text='Type of employment (e.g., Full-time, Part-time, Internship).', max_length=20)),
                ('description', models.TextField(help_text='Detailed description of the job responsibilities and expectations.')),
                ('posted_date', models.DateField(help_text='The date when the opportunity was posted.')),
                ('expire_date', models.DateField(help_text='The date when the opportunity expires or is no longer active.')),
                ('application_instructions', models.TextField(help_text='Instructions on how to apply for the opportunity (e.g., submit resume, fill online form).')),
                ('apply_link', models.URLField(blank=True, help_text='Link to the job application or company career page.', null=True)),
                ('posted_by', models.ForeignKey(help_text='Opportunity posted by user. Auto-filled on save.', null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Opportunities',
            },
        ),
        migrations.CreateModel(
            name='OpportunitySkill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skill', models.CharField(help_text='Skill required for the opportunity.', max_length=255)),
                ('opportunity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='skills', to='portal.opportunity')),
            ],
        ),
        migrations.CreateModel(
            name='OpportunityQualification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qualification', models.CharField(help_text='Qualification required for the opportunity.', max_length=255)),
                ('opportunity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='qualifications', to='portal.opportunity')),
            ],
        ),
        migrations.CreateModel(
            name='OpportunityBenefit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('benefit', models.CharField(help_text='Benefit offered for the opportunity.', max_length=255)),
                ('opportunity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='benefits', to='portal.opportunity')),
            ],
        ),
    ]
