from rest_framework import routers, serializers, viewsets, generics
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import DjangoModelPermissions, AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer, GroupSerializer, PermissionSerializer, WaveTokenObtainPairSerializer
from .serializers import TaskSerializer, ProjectSerializer, InvitationSerializer
from .helpers import StandardResultsSetPagination, WavePermissions
from django.contrib.auth.models import Group, Permission
from .models import Project, Task, User, User
from django.db import transaction

from rest_framework import mixins

from django.shortcuts import redirect

from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, renderer_classes,  permission_classes

from rest_framework import permissions
from django.db import transaction

class WaveTokenObtainPairView(TokenObtainPairView):
    serializer_class = WaveTokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = StandardResultsSetPagination

    def create(self, request):
        password = User.objects.make_random_password()
        serializer = UserSerializer(data=request.data, context={ 'password' : password })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [WavePermissions]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    pagination_class = StandardResultsSetPagination

class PermissionListApi(generics.ListAPIView):
    permission_classes = [WavePermissions]
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    pagination_class = StandardResultsSetPagination

class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [WavePermissions]
    queryset = Permission.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = StandardResultsSetPagination

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [WavePermissions]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class InvitationView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = InvitationSerializer

    def create(self, request):
        invite_token = request.GET['invitation_token']
        password = request.POST['password'] 
        serializer = InvitationSerializer(data={'invitation_token': invite_token, 'password' : password })
        if serializer.is_valid():
            success, message = User.accept_invitation(invite_token, password)
            if success:
                return Response({'message': message}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': message}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
