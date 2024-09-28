from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Import the generated logs data from the .py file
from .logs_sample import all_logs_data

class LogsAPIView(APIView):

    def get(self, request):
        """
        Get all logs data.
        """
        return Response(all_logs_data, status=status.HTTP_200_OK)