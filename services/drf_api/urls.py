from .views import LogsAPIView
from django.urls import path, re_path

urlpatterns = [
    path('logs/', LogsAPIView.as_view(), name='get_logs'),
]