# Generated by Django 3.1.4 on 2021-01-17 14:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20210103_0755'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='organization',
        ),
        migrations.RemoveField(
            model_name='user',
            name='organization',
        ),
        migrations.DeleteModel(
            name='Organization',
        ),
    ]
