import json
import requests
import boto3

# S3
s3_client = boto3.client('s3')
s3 = boto3.resource('s3')
DATA_BUCKET = 'stackoverflow-lejere-2'
  
# api-endpoint
RAW_URL = "http://api.stackexchange.com//2.3"


TAG_LIST = ["regex", "dsa", "dynamic-programming"]

def fetch_posts(tag):
    GET_QUESTIONS_URL = "/questions?pagesize=100&order=desc&sort=activity&tagged=%s&site=stackoverflow&filter=!6VvPDzPyzuCbL" % tag
    ANSWER_URL ='/answers/%s?pagesize=100&order=desc&sort=activity&site=stackoverflow&filter=!nKzQURFm*e'
    
    r = requests.get(url = RAW_URL + GET_QUESTIONS_URL)
    data = r.json()
    


    for element in data['items']:
        if (element['is_answered']):
            if('accepted_answer_id' in element):
                # Fetch the answer body
                answer_id = element["accepted_answer_id"]
                answer_res = requests.get(url = RAW_URL + (ANSWER_URL % str(answer_id)))
                answer_body = answer_res.json()['items'][0]['body_markdown']
                question_body = element["body_markdown"]
                question_url = element["link"]
                post = "Question:\n" + question_body + "\nAnswer:\n" + answer_body
                response = s3_client.put_object(Key=element['title']+".txt", Bucket=DATA_BUCKET, Body=post, ContentType="text/plain")
                s3_object = s3.Object(DATA_BUCKET, element['title']+'.txt')
                s3_object.metadata.update({'_category':tag,'_source_uri':question_url})
                s3_object.copy_from(CopySource={'Bucket':DATA_BUCKET, 'Key':element['title']+'.txt'}, Metadata=s3_object.metadata, MetadataDirective='REPLACE')
                print(s3_object.metadata)

def lambda_handler(event, context):
    # TODO implement
    for tag in TAG_LIST:
        fetch_posts(tag)
        
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }