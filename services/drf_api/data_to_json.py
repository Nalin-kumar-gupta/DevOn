import json
from datetime import datetime

def extract_and_write_to_json(data):
    extracted_data = []
    
    for log in data["sample_logs"]:
        extracted_data.append({
            "timestamp": log["timestamp"],
            "cpu_usage_millicores": log["cpu_usage_millicores"],
            "memory_usage_bytes": log["memory_usage_bytes"]
        })

    filename = f'cpu_memory_usage_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'

    with open(filename, 'w') as json_file:
        json.dump(extracted_data, json_file, indent=4)
    
    return extracted_data
