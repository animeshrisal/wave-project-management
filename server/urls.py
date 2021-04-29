"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from rest_framework import routers, serializers, viewsets

from server.backend import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'tasks', views.TaskViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', views.WaveTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('my_profile/', views.MyProfileView.as_view(), name='my_profile'),
    path('projects/<int:pk>/sprints/', views.SprintViewSet.as_view({'get': 'list', 'post': 'create'}), name='project-task'),
    path('projects/<int:pk>/sprints/<int:sprint_id>/', views.SprintViewSet.as_view({'put': 'update', 'delete': 'destroy'}), name='project-task'),
    path('projects/<int:pk>/sprints/<int:sprint_id>/board/', views.BoardViewSet.as_view(), name='board'),
    path('projects/<int:pk>/sprints/<int:sprint_id>/tasks/', views.TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='project-task'),
    path('projects/<int:id>/sprints/<int:sprint_id>/tasks/<int:task_id>/', views.TaskViewSet.as_view({'put': 'update', 'delete': 'destroy'}), name='project-task-details'),
    path('accept_invite/',views.InvitationView.as_view(), name='accept_invite'),
    path('', include(router.urls))
]
