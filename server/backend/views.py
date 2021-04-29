from django.contrib.auth.models import Group, Permission

from .helpers import StandardResultsSetPagination, WavePermissions

from .models import Project, Task, User, User, Sprint

from rest_framework import routers, serializers, viewsets, generics
from rest_framework.response import Response
from rest_framework import status, generics, mixins
from rest_framework.permissions import DjangoModelPermissions, AllowAny, IsAuthenticated
from rest_framework import mixins
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer, GroupSerializer, PermissionSerializer, WaveTokenObtainPairSerializer
from .serializers import TaskSerializer, ProjectSerializer, InvitationSerializer, NotificationSerializer, SprintSerializer

from django.shortcuts import redirect

from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, renderer_classes,  permission_classes

from rest_framework import permissions


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
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request):
        serializer = ProjectSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        context = {'owned_by': request.user}
        serializer = ProjectSerializer(data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [WavePermissions]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request, project_pk, sprint_pk):
        queryset = self.queryset.filter(sprint_id=sprint_pk)
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, project_pk, sprint_pk):
        context = { 'sprint': sprint_pk }
        serializer = TaskSerializer(data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
                return Response({'error': message}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyProfileView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def retrieve(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class NotificationView(generics.RetrieveUpdateAPIView):
    permissions_classes = (IsAuthenticated,)
    serializer_class = NotificationSerializer

    def retrieve(self, request):
        queryset = Notification.objects.all()
        serializer = NotificationSerializer

class SprintViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializers = SprintSerializer    
    queryset = Sprint.objects.all()

    def list(self, request, pk):
        queryset = self.queryset.filter(project_id=pk)
        serializer = SprintSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, pk):
        context = { 'project': pk }
        serializer = SprintSerializer(data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BoardViewSet(generics.ListAPIView, mixins.UpdateModelMixin):
    permissions_classes = (IsAuthenticated,)
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def group_by_task_status(self, data):
        grouped = dict()
        for obj in data:
            grouped.setdefault(obj['task_status'], []).append(obj)
        return grouped

    def list(self, request, pk, sprint_id):
        queryset = self.queryset.filter(sprint_id=sprint_id)
        serializer = TaskSerializer(queryset, many=True)
        grouped_data = self.group_by_task_status(serializer.data)
        return Response(grouped_data)



