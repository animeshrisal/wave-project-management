from django.db import models
from django.contrib.auth.models import AbstractUser
from .enums import *
from .helpers import TimeStampedModel

class Organization(TimeStampedModel):
    name = models.CharField(max_length=100)

class Project(TimeStampedModel):
    name = models.CharField(max_length=100)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

class User(AbstractUser):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=True)
    projects = models.ManyToManyField(Project)
    confirmation_token = models.CharField(max_length=500)
    confirmed_at = models.DateTimeField()

    def __str__(self):
        return str(self.id)

class Task(TimeStampedModel):
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


