# Generated by Django 3.1.4 on 2021-01-03 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='confirmation_token',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='confirmed_at',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='corfirmation_sent_at',
            field=models.DateTimeField(null=True),
        ),
    ]
