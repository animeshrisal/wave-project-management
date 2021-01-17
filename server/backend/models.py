from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from .enums import *
from .helpers import TimeStampedModel
import jwt
from django.utils import timezone
from server.settings import SECRET_KEY

class Project(TimeStampedModel):
    name = models.CharField(max_length=100)

class WaveUserManager(UserManager):
    def create_user(self, username, email=None, password=None, **extra_fields):
        with transaction.atomic():
            extra_fields.setdefault('is_staff', False)
            extra_fields.setdefault('is_superuser', False)
            user = self._create_user(username, email, password, **extra_fields)
            user.invite_user()

class User(AbstractUser):
    objects = WaveUserManager()
    projects = models.ManyToManyField(Project)
    invitation_token = models.CharField(max_length=500, null=True)
    invitation_sent_at = models.DateTimeField(null=True)
    invitation_accepted_at = models.DateTimeField(null=True) 

    def invite_user(self):
        self.invitation_token = self.generate_token()
        self.invitation_sent_at = timezone.now()
        self.save()

    def generate_token(self):
        return jwt.encode({"user_id": self.id}, SECRET_KEY, algorithm="HS256")

    def send_invite(self):
        self.invite_user()

    def confirm_invitation(self):
        self.invitation_accepted_at = timezone.now()
        self.save()

    @classmethod
    def accept_invitation(token):
        decoded_message = jwt.decode(token, SECRET_KEY, algorithm="HS256")
        user = User.objects.get(pk=decoded_message['user_id'])
        user.confirm_invitation()

    def __str__(self):
        return str(self.id) + " - " + str(self.username) 

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


