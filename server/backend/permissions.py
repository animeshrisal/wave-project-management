from rest_framework.permissions import BasePermission
from django.core.exceptions import ObjectDoesNotExist
from .models import Project
import pprint

class HasProjectAccess(BasePermission):
    def has_permission(self, request, view):
        try:
            request.user and Project.objects.get(id=view.kwargs['pk'], members=request.user)
        except ObjectDoesNotExist:
            return False
