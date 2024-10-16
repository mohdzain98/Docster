from flask import Flask,request,jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
load_dotenv()
from langchain_openai import ChatOpenAI,OpenAIEmbeddings
from Initialize import Init,Initxt, Initcsv, Initxlsx, Initsql, Initppt, Initdocx
from langchain_community.utilities import SQLDatabase
from langchain_community.tools.sql_database.tool import QuerySQLDataBaseTool
from langchain.chains import create_sql_query_chain
from operator import itemgetter
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain.chains import ConversationChain
from langchain.memory import ConversationSummaryBufferMemory
from langchain_community.callbacks.manager import get_openai_callback
from langchain_community.vectorstores import FAISS
from static.Filename import filename
from static.Chain import chain, qchain
import os
import traceback
import redis


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
status = "active"
os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')
llm = ChatOpenAI(model='gpt-4o-mini',max_tokens=500)

redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')

redis_client = redis.Redis(host=redis_host, port=redis_port, db=0)

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
    return jsonify({"status":status,"Value":'LLM Server Running Successsfully',"Version":1.5})

@app.route('/uploadfile/<file_type>/<sid>',methods=['POST','GET'])
@cross_origin()
def uploaded(file_type,sid):
    upload=False
    success = jsonify({"success":True,"msg":"Successfully Uploaded"})
    fail = jsonify({"success":False,"msg":"Error in Uploading"})
    name = filename()

    if str(file_type) == 'pdf':
        upload = uploadFile(f'{name}.pdf')
        if(upload):
            file=Init()
            file.initdb(file_type,name)
            ready,eToken,db = file.initret()
            if(ready):
                redis_client.hset(sid, 'db', db)
                redis_client.hset(sid, 'eToken', eToken)
            else:
                return jsonify({"success":False,"msg":"File Size larger then 5000 tokens"})
            return success
        else:
            return fail
        
    elif str(file_type) == 'txt':
        upload = uploadFile(f'{name}.txt')
        if(upload):
            file = Initxt()
            file.initdb(file_type,name)
            ready,eToken,db = file.initret()
            if(ready):
                redis_client.hset(sid, 'db', db)
                redis_client.hset(sid, 'eToken', eToken)
            else:
                return jsonify({"success":False,"msg":"File Size larger then 5000 tokens"})
            return success
        else:
            return fail
    elif str(file_type) == 'csv':
        upload = uploadFile(f'{name}.csv')
        if(upload):
            file = Initcsv()
            file.initdb(file_type,name)
            ready,eToken,db = file.initret()
            if(ready):
                redis_client.hset(sid, 'db', db)
                redis_client.hset(sid, 'eToken', eToken)
            else:
                return jsonify({"success":False,"msg":"File Size larger then 5000 tokens"})
            return success
        else:
            return fail
    elif str(file_type) == 'xlsx':
        upload = uploadFile(f'{name}.xlsx')
        if(upload):
            file = Initxlsx()
            file.initdb(file_type,name)
            ready,eToken,db = file.initret()
            if(ready):
                redis_client.hset(sid, 'db', db)
                redis_client.hset(sid, 'eToken', eToken)
            else:
                return jsonify({"success":False,"msg":"File Size larger then 5000 tokens"})
            return success
        else:
            return fail
    elif str(file_type) == 'sql':
        upload = uploadFile(f'{name}.sql')
        if(upload):
            file = Initsql()
            file.initdb(file_type,name)
            ready,go,name = file.initret()
            if(ready):
                redis_client.hset(sid, 'go', go)
                redis_client.hset(sid, 'name',name)
            else:
                return jsonify({"success":False,"msg":"File Size larger then 5000 tokens"})
            return success
        else:
            return fail
        
    elif str(file_type) == 'pptx':
        upload = uploadFile(f'{name}.pptx')
        if(upload):
            file=Initppt()
            file.initdb(file_type,name)
            ready,eToken,db = file.initret()
            if(ready):
                redis_client.hset(sid, 'db', db)
                redis_client.hset(sid, 'eToken', eToken)
            else:
                return jsonify({"success":False,"msg":"File Size larger then 5000 tokens"})
            return success
        else:
            return fail
        
    elif str(file_type) == 'docx':
        upload = uploadFile(f'{name}.docx')
        if(upload):
            file=Initdocx()
            file.initdb(file_type,name)
            ready,eToken,db = file.initret()
            if(ready):
                redis_client.hset(sid, 'db', db)
                redis_client.hset(sid, 'eToken', eToken)
            else:
                return jsonify({"success":False,"msg":"File Size larger then 5000 tokens"})
            return success
        else:
            return fail
    

@app.route('/chat/default/default',methods=['POST','GET'])
@cross_origin()
def chat():
    req = request.json
    ques = req.get('query')
    memory = ConversationSummaryBufferMemory(llm=llm,max_token_limit=500)
    conversation = ConversationChain(llm=llm,memory=memory)
    result = conversation.predict(input=ques)
    cToken = len(ques.split())
    gToken = len(result.split())
    res = jsonify({"result":result,"cToken":cToken,"gToken":gToken,"total":cToken+gToken})
    return (res)

@app.route('/getques/<sid>',methods=['POST', 'GET'])
def aiques(sid):
    db = FAISS.deserialize_from_bytes(embeddings=OpenAIEmbeddings(), serialized=redis_client.hget(sid, 'db'),allow_dangerous_deserialization=True)
    retriever = db.as_retriever(search_type='mmr',search_kwargs={'k':3})
    chains = chain(retriever, llm)
    content = chains.invoke('Give me content of the document')
    q_chain = qchain(llm)
    ques = q_chain.invoke(content)
    res = jsonify({"result":ques})
    return res
        
    
@app.route('/chat/pdf/<sid>', methods=['POST', 'GET'])
def chatpdf(sid):
    req = request.json
    ques = req.get('query')
    eToken = int(redis_client.hget(sid, 'eToken'))
    db = FAISS.deserialize_from_bytes(embeddings=OpenAIEmbeddings(), serialized=redis_client.hget(sid, 'db'),allow_dangerous_deserialization=True)
    retriever = db.as_retriever(search_type='mmr',search_kwargs={'k':3})
    chains = chain(retriever, llm)
    with get_openai_callback() as cb:
        result = chains.invoke(ques)
    total = cb.prompt_tokens + eToken + cb.completion_tokens
    res = jsonify({"result":result,"cToken":cb.prompt_tokens+eToken,"gToken":cb.completion_tokens,"total":total})
    return (res)

@app.route('/chat/txt/<sid>', methods=['POST', 'GET'])
def chattxt(sid):
    req = request.json
    ques = req.get('query')
    eToken = int(redis_client.hget(sid, 'eToken'))
    db = FAISS.deserialize_from_bytes(embeddings=OpenAIEmbeddings(), serialized=redis_client.hget(sid, 'db'),allow_dangerous_deserialization=True)
    retriever = db.as_retriever(search_type='mmr',search_kwargs={'k':3})
    chains = chain(retriever, llm)
    with get_openai_callback() as cb:
        result = chains.invoke(ques)
    total = cb.prompt_tokens + eToken + cb.completion_tokens
    res = jsonify({"result":result,"cToken":cb.prompt_tokens+eToken,"gToken":cb.completion_tokens,"total":total})
    return (res)

@app.route('/chat/csv/<sid>', methods=['POST', 'GET'])
def chatcsv(sid):
    req = request.json
    ques = req.get('query')
    eToken = int(redis_client.hget(sid, 'eToken'))
    db = FAISS.deserialize_from_bytes(embeddings=OpenAIEmbeddings(), serialized=redis_client.hget(sid, 'db'),allow_dangerous_deserialization=True)
    retriever = db.as_retriever(search_type='mmr',search_kwargs={'k':3})
    chains = chain(retriever, llm)
    with get_openai_callback() as cb:
        result = chains.invoke(ques)
    total = cb.prompt_tokens + eToken + cb.completion_tokens
    res = jsonify({"result":result,"cToken":cb.prompt_tokens+eToken,"gToken":cb.completion_tokens,"total":total})
    return (res)

@app.route('/chat/xlsx/<sid>', methods=['POST', 'GET'])
def chatxlsx(sid):
    req = request.json
    ques = req.get('query')
    eToken = int(redis_client.hget(sid, 'eToken'))
    db = FAISS.deserialize_from_bytes(embeddings=OpenAIEmbeddings(), serialized=redis_client.hget(sid, 'db'),allow_dangerous_deserialization=True)
    retriever = db.as_retriever(search_type='mmr',search_kwargs={'k':3})
    chains = chain(retriever, llm)
    with get_openai_callback() as cb:
        result = chains.invoke(ques)
    total = cb.prompt_tokens + eToken + cb.completion_tokens
    res = jsonify({"result":result,"cToken":cb.prompt_tokens+eToken,"gToken":cb.completion_tokens,"total":total})
    return (res)

@app.route('/chat/pptx/<sid>', methods=['POST', 'GET'])
def chatpptx(sid):
    req = request.json
    ques = req.get('query')
    eToken = int(redis_client.hget(sid, 'eToken'))
    db = FAISS.deserialize_from_bytes(embeddings=OpenAIEmbeddings(), serialized=redis_client.hget(sid, 'db'),allow_dangerous_deserialization=True)
    retriever = db.as_retriever(search_type='mmr',search_kwargs={'k':3})
    chains = chain(retriever, llm)
    with get_openai_callback() as cb:
        result = chains.invoke(ques)
    total = cb.prompt_tokens + eToken + cb.completion_tokens
    res = jsonify({"result":result,"cToken":cb.prompt_tokens+eToken,"gToken":cb.completion_tokens,"total":total})
    return (res)

@app.route('/chat/docx/<sid>', methods=['POST', 'GET'])
def chatdocx(sid):
    req = request.json
    ques = req.get('query')
    eToken = int(redis_client.hget(sid, 'eToken'))
    db = FAISS.deserialize_from_bytes(embeddings=OpenAIEmbeddings(), serialized=redis_client.hget(sid, 'db'),allow_dangerous_deserialization=True)
    retriever = db.as_retriever(search_type='mmr',search_kwargs={'k':3})
    chains = chain(retriever, llm)
    with get_openai_callback() as cb:
        result = chains.invoke(ques)
    total = cb.prompt_tokens + eToken + cb.completion_tokens
    res = jsonify({"result":result,"cToken":cb.prompt_tokens+eToken,"gToken":cb.completion_tokens,"total":total})
    return (res)

@app.route('/chat/sql/<sid>', methods=['POST', 'GET'])
def chatsql(sid):
    req = request.json
    ques = req.get('query')
    try:
        go = int(redis_client.hget(sid, 'go'))
        name = redis_client.hget(sid, 'name').decode()
        if go==1:
            db = SQLDatabase.from_uri(f'sqlite:///db/{name}.db')
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
            with get_openai_callback() as cb:
                result = chain.invoke({"question": ques})
            total = cb.prompt_tokens + cb.completion_tokens
            return jsonify({"result":result,"cToken":cb.prompt_tokens,"gToken":cb.completion_tokens,"total":total})
    except Exception as e:
        return jsonify({"result":"Some Error Occurred, Try with some other question","cToken":1,"gToken":1,"total":1})
            

 
if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0')