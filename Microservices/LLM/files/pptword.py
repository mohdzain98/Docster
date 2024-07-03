from langchain_community.document_loaders import UnstructuredPowerPointLoader
from langchain_community.document_loaders import Docx2txtLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
from static.Tokens import calEtokens

class HandleXML:
    def __init__(self,path):
        self.path=path

    def extract_text_from_ppt(self):
        loader = UnstructuredPowerPointLoader(self.path)
        ppt = loader.load()
        return ppt
    
    def extract_text_from_docx(self):
        loader = Docx2txtLoader(self.path)
        word = loader.load()
        return word

class Embedpw:
    def getEmbeddings(load):
        text_splitter = CharacterTextSplitter.from_tiktoken_encoder(chunk_size = 500)
        docs = text_splitter.split_documents(load)
        embedding_function = OpenAIEmbeddings()
        db = FAISS.from_documents(docs, embedding_function)
        pkl = db.serialize_to_bytes()
        eTokens = calEtokens(load)
        return pkl,eTokens