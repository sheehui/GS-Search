import json
import requests
from bs4 import BeautifulSoup
import boto3

s3_client = boto3.client('s3')
s3 = boto3.resource('s3')
GFG_LINKS_BUCKET = 'gfg-links-lejere-2'
DATA_BUCKET = 'geeksforgeeks-lejere-2'

def remove_tags(html):
    soup = BeautifulSoup(html, "html.parser")
    for data in soup(['style', 'script']):
        data.decompose()
    return ' '.join(soup.stripped_strings)

def lambda_handler(event, context):
    # TODO implement
    response = s3_client.list_objects_v2(
        Bucket=GFG_LINKS_BUCKET)
    s3_files = response["Contents"]
    metadata_arr = []
    for s3_file in s3_files:
        file_content = json.loads(s3_client.get_object(
            Bucket=GFG_LINKS_BUCKET, Key=s3_file["Key"])["Body"].read())
        category = s3_file["Key"].split('.')[0]
        # print(file_content)
        for title in file_content:
            print(file_content[title])
            r = requests.get(file_content[title])
            content = remove_tags(r.content)
            response = s3_client.put_object(Key=title+".txt", Bucket=DATA_BUCKET, Body=content)
            s3_object = s3.Object(DATA_BUCKET, title+'.txt')
            s3_object.metadata.update({'_category':category,'_source_uri':file_content[title]})
            s3_object.copy_from(CopySource={'Bucket':DATA_BUCKET, 'Key':title+'.txt'}, Metadata=s3_object.metadata, MetadataDirective='REPLACE')
            print(s3_object.metadata)
            metadata_arr.append(s3_object.metadata)
            
    return {
        'statusCode': 200,
        'body': json.dumps(metadata_arr)
    }