from .views import LogsAPIView
from .views import MetricsAPIView
from django.urls import path, re_path

urlpatterns = [
    path('metrics/', MetricsAPIView.as_view(), name='get_metrics'),
    path('logs/', LogsAPIView.as_view(), name='get_logs'),
]