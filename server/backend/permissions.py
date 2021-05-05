from rest_framework.permissions import BasePermission
from django.core.exceptions import ObjectDoesNotExist
from .models import Project
import pprint

class HasProjectAccess(BasePermission):
    def has_permission(self, request, view):
        try:
            if Project.objects.get(id=view.kwargs['project_pk'], members=request.user.id):
                return True
        except ObjectDoesNotExist:
            return False
