from .views import LogsAPIView, LogsCaptureAPIView
from django.urls import path, re_path

urlpatterns = [
    path('logs/', LogsAPIView.as_view(), name='get_logs'),
    path('capture/', LogsCaptureAPIView.as_view(), name='capture_logs'),
]