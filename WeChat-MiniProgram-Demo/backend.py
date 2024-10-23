from flask import Flask, request, jsonify
import Q2A  # 导入你的模块

app = Flask(__name__)

@app.route('/get_answer', methods=['POST'])
def get_answer():
    question = request.json.get('question')
    response = Q2A.questionnaire(question)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)