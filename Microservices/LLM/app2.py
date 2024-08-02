from flask import Flask,request,jsonify
from flask_cors import CORS
from langchain_community.tools.google_scholar import GoogleScholarQueryRun
from langchain_community.utilities.google_scholar import GoogleScholarAPIWrapper
from langchain_community.tools.google_trends import GoogleTrendsQueryRun
from langchain_community.utilities.google_trends import GoogleTrendsAPIWrapper
from langchain_community.tools.pubmed.tool import PubmedQueryRun
from langchain_openai import ChatOpenAI
from static.Chain import exaSearch
from dotenv import load_dotenv
load_dotenv()
import os

app2 = Flask(__name__)
cors = CORS(app2)
app2.config['CORS_HEADERS'] = 'Content-Type'
status = "active"
os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')
os.environ["SERP_API_KEY"] = os.getenv('SERP_API_KEY')
os.environ["SERPAPI_API_KEY"] = os.getenv('SERP_API_KEY')
os.environ["EXA_API_KEY"] = os.getenv('EXA_API_KEY')

@app2.route('/')
def hello_world():
    return jsonify({"status":status,"Value":'LLM tool Server Running Successsfully',"Version":1.0})


@app2.route('/gscholar',methods=['POST','GET'])
def gscholar():
    req = request.json
    query = req.get('query')
    tool = GoogleScholarQueryRun(api_wrapper=GoogleScholarAPIWrapper())
    result = tool.run(query)
    res = jsonify({"status":True,"result":result})
    return (res)

@app2.route('/gtrend',methods=['POST','GET'])
def gtrend():
    req = request.json
    query = req.get('query')
    tool = GoogleTrendsQueryRun(api_wrapper=GoogleTrendsAPIWrapper())
    result = tool.run(query)
    res = jsonify({"status":True,"result":result})
    return (res)

@app2.route('/pubmed',methods=['POST','GET'])
def pubmed():
    req = request.json
    query = req.get('query')
    tool = PubmedQueryRun()
    result = tool.invoke(query)
    res = jsonify({"status":True,"result":result})
    return (res)

@app2.route('/exasearch',methods=['POST','GET'])
def exasearch():
    req = request.json
    query = req.get('query')
    llm = ChatOpenAI(model='gpt-4o-mini',temperature=0.5)
    chain = exaSearch(llm)
    result = chain.invoke(f"{query}?")
    res = jsonify({"status":True,"result":result.content})
    return (res)
    


if __name__ == '__main__':
    app2.run(debug=True,host='0.0.0.0')