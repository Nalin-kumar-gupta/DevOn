from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

# Import the generated logs data from the .py file
from .logs_sample import all_logs_data

class LogsAPIView(APIView):

    def get(self, request):
        """
        Get all logs data.
        """
        return Response(all_logs_data, status=status.HTTP_200_OK)
    
# class LogsCaptureAPIView(APIView):

#     def post(self, request):
#         """
#         Post logs data.
#         """
#         try:
#             # Check the content type
#             if request.content_type == "application/x-ndjson":
#                 # Read the body as text and split it into individual JSON objects
#                 body = request.body.decode('utf-8')
#                 log_entries = [json.loads(line) for line in body.strip().split('\n') if line]

#                 # Process the log data (print for debugging)
#                 for log_entry in log_entries:
#                     print(log_entry)
#             else:
#                 return Response({"error": "Unsupported media type"}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

#             return Response({"message": "Log received"}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


import re
import json
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import LogEntry
from .serializers import LogEntrySerializer

# Regex patterns to extract log data
LOG_REGEX = re.compile(r'(?P<timestamp>[\d\-:\s]+) (?P<level>[A-Z]+) \[(?P<component>[^\]]+)\] (?P<message>.*)')
REQUEST_REGEX = re.compile(r'(?P<method>\w+) (?P<endpoint>\/[^\s]+)')
STATUS_REGEX = re.compile(r'Status: (?P<status>\d+)')
RESPONSE_TIME_REGEX = re.compile(r'Response Time: (?P<time>\d+\.\d+)s')
IP_REGEX = re.compile(r'IP: (?P<ip>[\d\.]+)')

class LogsCaptureAPIView(APIView):

    def post(self, request):
        """
        Endpoint to capture logs data.
        """
        try:
            if request.content_type == "application/x-ndjson":
                body = request.body.decode('utf-8')
                log_entries = [json.loads(line) for line in body.strip().split('\n') if line]

                # Process each log entry
                for log_entry in log_entries:
                    log_message = log_entry['log']

                    # Extract main log fields using regex
                    match = LOG_REGEX.match(log_message)
                    if match:
                        log_data = match.groupdict()
                        timestamp = datetime.strptime(log_data['timestamp'], '%Y-%m-%d %H:%M:%S')
                        level = log_data['level']
                        component = log_data['component']
                        message = log_data['message']

                        method = None
                        endpoint = None
                        status_code = None
                        response_time = None
                        ip_address = None

                        # Extract method and endpoint
                        request_match = REQUEST_REGEX.search(message)
                        if request_match:
                            method = request_match.group('method')
                            endpoint = request_match.group('endpoint')

                        # Extract status code
                        status_match = STATUS_REGEX.search(message)
                        if status_match:
                            status_code = int(status_match.group('status'))

                        # Extract response time
                        time_match = RESPONSE_TIME_REGEX.search(message)
                        if time_match:
                            response_time = float(time_match.group('time'))

                        # Extract IP address
                        ip_match = IP_REGEX.search(message)
                        if ip_match:
                            ip_address = ip_match.group('ip')

                        # Save the log entry to TimescaleDB using Django ORM
                        LogEntry.objects.create(
                            timestamp=timestamp,
                            level=level,
                            component=component,
                            method=method,
                            endpoint=endpoint,
                            status_code=status_code,
                            response_time=response_time,
                            ip_address=ip_address,
                            raw_log=log_message
                        )
            else:
                return Response({"error": "Unsupported media type"}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

            return Response({"message": "Log received"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request):
        """
        Get log entries with optional filters.
        """
        try:
            # Extract query parameters
            level = request.query_params.get('level')
            component = request.query_params.get('component')
            method = request.query_params.get('method')
            endpoint = request.query_params.get('endpoint')
            start_time = request.query_params.get('start_time')  # e.g., '2024-09-28T22:00:00Z'
            end_time = request.query_params.get('end_time')  # e.g., '2024-09-28T23:00:00Z'

            # Build the query set with filters
            queryset = LogEntry.objects.all()

            if level:
                queryset = queryset.filter(level=level)

            if component:
                queryset = queryset.filter(component__icontains=component)

            if method:
                queryset = queryset.filter(method=method)

            if endpoint:
                queryset = queryset.filter(endpoint__icontains=endpoint)

            if start_time:
                queryset = queryset.filter(timestamp__gte=start_time)

            if end_time:
                queryset = queryset.filter(timestamp__lte=end_time)

            # Serialize and return the filtered log entries
            serializer = LogEntrySerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)