# Generated by Django 3.1.4 on 2021-01-03 05:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20210103_0530'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='confirmed_at',
            new_name='invitation_sent_at',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='confirmation_token',
            new_name='invitation_token',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='corfirmation_sent_at',
            new_name='invited_at',
        ),
    ]
