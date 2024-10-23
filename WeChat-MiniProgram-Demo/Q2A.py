import re
import requests
import json
"""
示例用法：
answer = questionnaire("请说说矿山下发生火灾的原因")
print(answer)

"""

def match_result(answer:str):
    # 整理输出字符串
    pattern = r'"content":"(.*?)"'
    matches = re.findall(pattern, answer)
    return matches if matches else ["No matches found"]

# https://infer-modelarts-cn-southwest-2.myhuaweicloud.com/v1/infers/5bdc13b7-b7bb-43b2-a81b-ea63270f2c5e/v1/ce3eda3ecbd14c509effae1d10059372/app/rags/v1/deployments/870e96e8-08c8-4063-b0c5-b167e3942214/chat/completions
def get_token(token_url="https://iam.cn-southwest-2.myhuaweicloud.com/v3/auth/tokens"):
    # 获取token
    payload = json.dumps({
        "auth": {
            "identity": {
                "methods": [
                    "password"
                ],
                "password": {
                    "user": {
                        "name": "stream",
                        "password": "Xmc5201314",
                        "domain": {
                            "name": "hid_9w2xrgnsfu8-09_"
                        }
                    }
                }
            },
            "scope": {
                "project": {
                    "name": "cn-southwest-2"
                }
            }
        }
    })
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", token_url, headers=headers, data=payload)
    return response.headers['X-Subject-Token']

def questionnaire(question: str) -> str:
    _ = Question2Answer(
        "https://infer-modelarts-cn-southwest-2.myhuaweicloud.com/v1/infers/5bdc13b7-b7bb-43b"
        "2-a81b-ea63270f2c5e/v1/ce3eda3ecbd14c509effae1d10059372/app/rags/v1/deployments/870e96e8-08"
        "c8-4063-b0c5-b167e3942214/chat/completions",
        question)
    return _.print_answer()



class Question2Answer:

    def __init__(self, url, Question_text):
        self.url = url
        self.Question_text = Question_text
        self.token = get_token()
        self.data = json.dumps(
            {
                "messages": [
                    {
                        "content": self.Question_text
                    }
                ],
                "temperature": 0.9,
                "max_tokens": 600,
                "user":"stream",
                # "stream":"true"
            }
        )
        self.headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': self.token
        }

    def get_answer(self):
        answer = requests.request("POST", self.url, headers=self.headers, data=self.data)

        return match_result(str(answer.content.decode()))

    def print_answer(self) -> str:
        answers = self.get_answer()[0]
        
        answers = re.sub(r'\\n', '\n', answers)
        answers = answers.replace("None", "")
        return answers
