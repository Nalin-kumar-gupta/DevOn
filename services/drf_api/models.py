# Create your models here.
from django.db import models

class LogEntry(models.Model):
    timestamp = models.DateTimeField()
    level = models.CharField(max_length=20)
    component = models.CharField(max_length=100)
    method = models.CharField(max_length=10, null=True, blank=True)
    endpoint = models.CharField(max_length=255, null=True, blank=True)
    status_code = models.IntegerField(null=True, blank=True)
    response_time = models.FloatField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    raw_log = models.TextField()

    class Meta:
        indexes = [
            models.Index(fields=['timestamp']),
            models.Index(fields=['level']),
            models.Index(fields=['endpoint']),
        ]

    def __str__(self):
        return f"{self.timestamp} - {self.level} - {self.endpoint}"