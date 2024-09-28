from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .sample_cpu_memory import cpu_memory_data 
from .data_to_json import extract_and_write_to_json 
from .sample_cpu_memory_2 import cpu_memory_data_2
from .sample_table_data import table_data 
class MetricsAPIView(APIView):

    def post(self, request):
        """
        Get paginated logs data.
        """
        try:
            app_no = request.data.get("selectedApp")
            time_range = request.data.get("selectedTimeRange")
            # index = request.data.get("realtime") 


            if app_no is None:
                return Response({"error": "appNo not provided"}, status=status.HTTP_400_BAD_REQUEST)

            # window_size = 20
            # start_index = index * 5
            # end_index = start_index + window_size

            if app_no == 1:
                data = cpu_memory_data
            else:
                data = cpu_memory_data_2

            # paginated_data = data[start_index:end_index]
            paginated_data = data

            if not paginated_data:
                return Response({"error": "No data available for the requested range"}, status=status.HTTP_404_NOT_FOUND)

            json_data = extract_and_write_to_json(paginated_data)

            return Response(json_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class LogsAPIView(APIView):

    def get(self, request):
        """
        Get all logs data.
        """
        try: 
            return Response(table_data , status=status.HTTP_200_OK) 
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

