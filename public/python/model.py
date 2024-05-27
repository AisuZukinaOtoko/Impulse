import base64
import json
from inference_sdk import InferenceHTTPClient
import random

CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="HCIwZ8VofW30c9z33ISs"
)
random_number = random.randint(1, 11)
with open("public/assets/car_images/top"+str(random_number)+".jpg", "rb") as image_file:
    image_data = base64.b64encode(image_file.read()).decode('utf-8')

result = CLIENT.infer(image_data, model_id="parking-lot-availability/8")

result_json = json.dumps(result)

print(result_json)