from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .sample_cpu_memory import cpu_memory_data 
from .data_to_json import extract_and_write_to_json 

class LogsAPIView(APIView):

    def post(self, request):
        """
        Get all logs data.
        """
        try:
            app_no = request.data.get("appNo")
            print(app_no)
            if not app_no:
                return Response({"error": "appNo not provided"}, status=status.HTTP_400_BAD_REQUEST)
            json_data = extract_and_write_to_json(cpu_memory_data)
            if(app_no == 1):
                return Response(json_data, status=status.HTTP_200_OK)  
            return Response(json_data, status=status.HTTP_200_OK) 
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
