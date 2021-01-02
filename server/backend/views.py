from rest_framework import routers, serializers, viewsets, generics
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import DjangoModelPermissions

from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer, GroupSerializer, PermissionSerializer, WaveTokenObtainPairSerializer
from .serializers import TaskSerializer, OrganizationSerializer, ProjectSerializer
from .helpers import StandardResultsSetPagination, WavePermissions
from django.contrib.auth.models import Group, Permission
from .models import Organization, Project, Task, User

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
            return Response(serializer.data, status=status.HTTP_201_BAD_REQUEST)
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

class OrganizationViewSet(viewsets.ModelViewSet):
    permission_classes = [WavePermissions]
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
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
