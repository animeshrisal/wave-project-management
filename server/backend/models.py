from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from .helpers import TimeStampedModel
import jwt
from django.utils import timezone
from server.settings import SECRET_KEY
from django.utils.translation import gettext_lazy as _
from django.db import transaction

from .constants import MESSAGE

class WaveUserManager(UserManager):
    def create_user(self, username, email=None, password=None, **extra_fields):
        with transaction.atomic():
            extra_fields.setdefault('is_staff', False)
            extra_fields.setdefault('is_superuser', False)
            user = self._create_user(username, email, password, **extra_fields)
            user.invite_user()
            return user

class User(AbstractUser):
    objects = WaveUserManager()
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

    def confirm_invitation(self, password):
        self.invitation_accepted_at = timezone.now()
        self.set_password(password)
        self.save()

    @classmethod
    def accept_invitation(self, token, password):
        try:
            decoded_message = jwt.decode(token, SECRET_KEY, algorithms="HS256")
            user = User.objects.get(pk=decoded_message['user_id'])
            
            time_difference = timezone.now() - user.invitation_sent_at 
            if time_difference.days == 0 and user.invitation_accepted_at is None:
                user.confirm_invitation(password)
                return True, MESSAGE['USER_CONFIRMED']
            else:
                return False, MESSAGE['TOKEN_HAS_EXPIRED']
                
        except Exception as e:
            return False, MESSAGE['COULD_NOT_ACCEPT_INVITATION']

    def __str__(self):
        return str(self.id) + " - " + str(self.username) 


class Project(TimeStampedModel):
    name = models.CharField(max_length=100)
    owned_by = models.ForeignKey(User, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='Project_members')

class Task(TimeStampedModel):

    class TaskStatus(models.IntegerChoices):
        TODO = 1, _('Todo')
        IN_PROGRESS = 2, _('In Progress')
        REVIEW = 3, _('Review')
        DONE = 4, _('Done')

    class TaskPriority(models.IntegerChoices):
        LOW = 1, _('Low')
        MEDIUM = 2, _('Medium')
        HIGH = 3, _('High')
        HIGHEST = 4, _('Highest')


    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    task_status = models.IntegerField(choices=TaskStatus.choices, default=TaskStatus.TODO)
    task_priority = models.IntegerField(choices=TaskPriority.choices, default=TaskPriority.MEDIUM)
    assigned_user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

class Notification(TimeStampedModel):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
