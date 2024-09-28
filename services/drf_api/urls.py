<<<<<<< HEAD
from .views import LogsAPIView, LogsCaptureAPIView
=======
from .views import LogsAPIView
from .views import MatricsAPIView
>>>>>>> dcb10d1 (logs call)
from django.urls import path, re_path

urlpatterns = [
    path('matrics/', MatricsAPIView.as_view(), name='get_logs'),
    path('logs/', LogsAPIView.as_view(), name='get_logs'),
    path('capture/', LogsCaptureAPIView.as_view(), name='capture_logs'),
]