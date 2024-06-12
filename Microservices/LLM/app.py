import math
from flask import Flask,request,jsonify
from flask_cors import CORS, cross_origin
import os
import traceback
from dotenv import load_dotenv
load_dotenv()
from langchain_openai import ChatOpenAI
from langchain.chains.question_answering import load_qa_chain
from Initialize import Init,Initxt, Initcsv, Initxlsx, Initsql
from langchain_community.utilities import SQLDatabase
from langchain_community.tools.sql_database.tool import QuerySQLDataBaseTool
from langchain.chains import create_sql_query_chain
from operator import itemgetter
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain.chains import ConversationChain
from langchain.memory import ConversationSummaryBufferMemory
from Tokens import calTokens


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
status = "active"

os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')
llm = ChatOpenAI()


try:
    path = os.path.dirname(os.path.abspath(__file__))
    upload_folder = os.path.join(path, "tmp")
    os.makedirs(upload_folder, exist_ok=True)
    app.config["UPLOAD_FOLDER"] = upload_folder
except Exception as e:
    app.logger.info("Error in creating upload folder:")
    app.logger.error("Exception occured: {}".format(e))

def uploadFile(name):
    success = False
    try:
        pdf_file = request.files['file']
        save_path = os.path.join(app.config.get('UPLOAD_FOLDER'), name)
        pdf_file.save(save_path)
        success = True
        return success
    except Exception as e:
        app.logger.info("Error in saving file:")
        app.logger.error("Exception occured: {}".format(e))
        app.logger.error("Traceback: {}".format(traceback.format_exc()))
        return False

@app.route('/')
def hello_world():
    return jsonify({"status":status,"Value":'LLM Server Running Successsfully'})

@app.route('/uploadfile/<file_type>',methods=['POST','GET'])
@cross_origin()
def uploaded(file_type):
    upload=False
    success = jsonify({"success":True,"msg":"Successfully Uploaded"})
    fail = jsonify({"success":False,"msg":"Error in Uploading"})
    if str(file_type) == 'pdf':
        upload = uploadFile('docster_temp.pdf')
        if(upload):
            file=Init()
            file.initdb(file_type)
            return success
        else:
            return fail
    elif str(file_type) == 'txt':
        upload = uploadFile('docster_temp.txt')
        if(upload):
            file = Initxt()
            file.initdb(file_type)
            return success
        else:
            return fail
    elif str(file_type) == 'csv':
        upload = uploadFile('docster_temp.csv')
        if(upload):
            file = Initcsv()
            file.initdb(file_type)
            return success
        else:
            return fail
    elif str(file_type) == 'xlsx':
        upload = uploadFile('docster_temp.xlsx')
        if(upload):
            file = Initxlsx()
            file.initdb(file_type)
            return success
        else:
            return fail
    elif str(file_type) == 'sql':
        upload = uploadFile('docster_temp.sql')
        if(upload):
            file = Initsql()
            file.initdb(file_type)
            return success
        else:
            return fail
    

@app.route('/chat/default',methods=['POST','GET'])
def chat():
    req = request.json
    ques = req.get('query')
    memory = ConversationSummaryBufferMemory(llm=llm,max_token_limit=100)
    conversation = ConversationChain(llm=llm,memory=memory)
    result = conversation.predict(input=ques)
    cToken = len(ques.split())
    gToken = len(result.split())
    res = jsonify({"result":result,"cToken":cToken,"gToken":gToken,"total":cToken+gToken})
    return (res)

@app.route('/chat/pdf', methods=['POST', 'GET'])
def chatpdf():
    req = request.json
    ques = req.get('query')
    y=Init()
    eToken,db = y.initret()
    doc = db.similarity_search(ques)
    cToken = calTokens(doc)
    chain = load_qa_chain(llm,chain_type='stuff')
    result = chain.run(input_documents=doc,question=ques)
    gToken = math.floor(len(result.split())*1.334)
    total = cToken + eToken + gToken
    res = jsonify({"result":result,"cToken":cToken+eToken,"gToken":gToken,"total":total})
    return (res)

@app.route('/chat/txt', methods=['POST', 'GET'])
def chattxt():
    req = request.json
    ques = req.get('query')
    txt= Initxt()
    eToken,db = txt.initret()
    doc = db.similarity_search(ques)
    cToken = calTokens(doc)
    chain = load_qa_chain(llm,chain_type='stuff')
    result = chain.run(input_documents=doc,question=ques)
    gToken = math.floor(len(result.split())*1.334)
    total = cToken + eToken + gToken
    res = jsonify({"result":result,"cToken":cToken+eToken,"gToken":gToken,"total":total})
    return (res)

@app.route('/chat/csv', methods=['POST', 'GET'])
def chatcsv():
    req = request.json
    ques = req.get('query')
    csv = Initcsv()
    eToken,db = csv.initret()
    doc = db.similarity_search(ques)
    cToken = calTokens(doc)
    chain = load_qa_chain(llm,chain_type='stuff')
    result = chain.run(input_documents=doc,question=ques)
    gToken = math.floor(len(result.split())*1.334)
    total = cToken + eToken + gToken
    res = jsonify({"result":result,"cToken":cToken+eToken,"gToken":gToken,"total":total})
    return (res)

@app.route('/chat/xlsx', methods=['POST', 'GET'])
def chatxlsx():
    req = request.json
    ques = req.get('query')
    xl=Initxlsx()
    eToken,db = xl.initret()
    doc = db.similarity_search(ques)
    cToken = calTokens(doc)
    chain = load_qa_chain(llm,chain_type='stuff')
    result = chain.run(input_documents=doc,question=ques)
    gToken = math.floor(len(result.split())*1.334)
    total = cToken + eToken + gToken
    res = jsonify({"result":result,"cToken":cToken+eToken,"gToken":gToken,"total":total})
    return (res)

@app.route('/chat/sql', methods=['POST', 'GET'])
def chatsql():
    req = request.json
    ques = req.get('query')
    try:
        mysql = Initsql()
        cToken,go = mysql.initret()
        if go:
            db = SQLDatabase.from_uri('sqlite:///bicycle.db')
            execute_query = QuerySQLDataBaseTool(db=db)
            write_query = create_sql_query_chain(llm, db)
            answer_prompt = PromptTemplate.from_template(
                """Given the following user question, corresponding SQL query, and SQL result, answer the user question.

            Question: {question}
            SQL Query: {query}
            SQL Result: {result}
            Answer: """
            )

            answer = answer_prompt | llm | StrOutputParser()
            chain = (
                RunnablePassthrough.assign(query=write_query).assign(
                    result=itemgetter("query") | execute_query
                )
                | answer
            )
            result = chain.invoke({"question": ques})
            gToken = len(result.split())
            return jsonify({"result":result,"cToken":cToken,"gToken":gToken,"total":cToken+gToken})
    except:
        return jsonify({"result":"Some Error Occurred","cToken":0,"gToken":0,"total":0})
            

 
if __name__ == '__main__':
    app.run(debug=True)