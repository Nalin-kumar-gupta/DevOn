<<<<<<< HEAD
from .views import LogsAPIView, LogsCaptureAPIView
=======
from .views import LogsAPIView
<<<<<<< HEAD
from .views import MatricsAPIView
>>>>>>> dcb10d1 (logs call)
=======
from .views import MetricsAPIView
>>>>>>> 48aef86 (table data manipulated)
from django.urls import path, re_path

urlpatterns = [
    path('metrics/', MetricsAPIView.as_view(), name='get_metrics'),
    path('logs/', LogsAPIView.as_view(), name='get_logs'),
    path('capture/', LogsCaptureAPIView.as_view(), name='capture_logs'),
]