from django.db import models
from django.contrib.auth.models import AbstractUser
from .enums import *

class Organization(models.Model):
    name = models.CharField(max_length=100)

class Project(models.Model):
    name = models.CharField(max_length=100)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

class Task(models.Model):

    task_status = (
        (TaskStatus.TODO, 'Todo'),
        (TaskStatus.IN_PROGRESS, 'In Progress'),
        (TaskStatus.REVIEW, 'Review'),
        (TaskStatus.DONE, 'Done'),
    )

    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    task_status = models.CharField(max_length=1, choices=task_status, default=TaskStatus.TODO)
    assigned_user = models.ForeignKey(User, on_delete=models.CASCADE)

class User(AbstractUser):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True)
    projects = models.ManyToManyField(Project)

    def __str__(self):
        return str(self.id)
