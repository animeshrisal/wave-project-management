from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import Group, Permission
from django.core.serializers.json import Serializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions

from django.db import transaction

from .models import Project, Task, User, Notification, Sprint

from .helpers import StandardResultsSetPagination

class WaveTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        #Check if the user is invited
        self.check_invitation()

        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Add extra responses here
        data['user'] = self.user.username
        data['is_admin'] = self.user.is_superuser
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name

        return data

    def check_invitation(self):
        if self.user.invitation_sent_at == None and not self.user.is_superuser:
            raise exceptions.AuthenticationFailed(
                'Account not confirmed',
                'not_confirmed',
            )

class UserSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    def create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(validated_data['username'], validated_data['email'], self.context['password'])
            return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class InvitationSerializer(serializers.Serializer):
    password = serializers.CharField(allow_null=False, allow_blank=False)
    invitation_token = serializers.CharField(allow_blank=False, allow_null=False)

class GroupSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=Group.objects.all())]
    )

    def create(self, validated_data):
        group = Group.objects.create(name=validated_data['name'])
        return group

    class Meta:
        model = Group
        fields = ('id', 'name')

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('id', 'name', 'content_type_id', 'codename')

class ProjectSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=Project.objects.all())]
    )

    def create(self, validated_data):
        with transaction.atomic():
            project = Project.objects.create(name=validated_data['name'],owned_by=self.context['owned_by'])
            project.members.add(self.context['owned_by'])
            return project

    class Meta:
        model = Project
        fields = ('id', 'name')

class TaskSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        task = Task.objects.create(name=validated_data['name'], sprint_id=self.context['sprint'])
        return task

    class Meta:
        model = Task
        fields = ('id', 'name', 'task_status', 'task_priority')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'title', 'description', 'created_at')

class SprintSerializer(serializers.ModelSerializer):

    name = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=Project.objects.all())]
    )

    tasks = TaskSerializer(many=True, read_only=True)

    def create(self, validated_data):
        sprint = Sprint.objects.create(name=validated_data['name'], project_id=self.context['project'])
        return sprint

    class Meta:
        model = Sprint
        fields = ('id', 'name', 'tasks')