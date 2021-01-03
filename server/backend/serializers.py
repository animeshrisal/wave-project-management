from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import Group, Permission
from django.core.serializers.json import Serializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions

from .models import Organization, Project, Task, User

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
        if self.user.invited_at == None:
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
        user = User.objects.create_user(validated_data['username'], validated_data['email'], self.context['password'])

        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email')

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

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('id', 'name')

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'organization')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'name', 'project', 'task_status')