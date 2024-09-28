from .views import LogsAPIView
from .views import MatricsAPIView
from django.urls import path, re_path

urlpatterns = [
    path('matrics/', MatricsAPIView.as_view(), name='get_logs'),
    path('logs/', LogsAPIView.as_view(), name='get_logs'),
]