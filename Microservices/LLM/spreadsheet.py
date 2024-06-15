import pandas as pd
import os
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import CSVLoader, UnstructuredExcelLoader
from langchain.text_splitter import CharacterTextSplitter
from Tokens import calTokens


class Document:
    def __init__(self, page_content, metadata):
        self.page_content = page_content
        self.metadata = metadata

    def __repr__(self):
        return f"Document(page_content={self.page_content}, metadata={self.metadata})"

class handleSS:
    def __init__(self,path):
        self.path= path


    def check_file_type(self):
        _, file_extension = os.path.splitext(self.path)
        if file_extension == '.csv':
            try:
                pd.read_csv(self.path)
                return 'CSV'
            except Exception:
                return 'Invalid CSV'
        elif file_extension in ['.xls', '.xlsx']:
            try:
                pd.read_excel(self.path)
                return 'Excel'
            except Exception:
                return 'Invalid Excel'
        else:
            try:
                pd.read_csv(self.path)
                return 'CSV'
            except Exception:
                pass
            
            try:
                pd.read_excel(self.path)
                return 'Excel'
            except Exception:
                return 'Unknown'
            
    def handleExcel(self,df):
        path = self.path
        documents = []
        lst=[x for x in df.columns]
        strlst=str(lst)
        documents.append(Document(page_content=strlst,metadata={'name':'excel file coulmns name','source':path}))
        for index, row in df.iterrows():
            page_content = row.to_string()  # Replace with your column name for page_content
            metadata = {
                'source':path,
                'row':index
            }
            doc = Document(page_content=page_content, metadata=metadata)

            documents.append(doc)
        return documents
    
    def loadData(self):
        filetype = self.check_file_type()
        loader=""
        if filetype == 'CSV':
            loader = CSVLoader(self.path)
        elif filetype == 'Excel':
            loader = UnstructuredExcelLoader(self.path, mode="elements")
        else:
            return "Unknown File Type"
        file = loader.load()
        return file
    
    class EmbedSS:
        def getEmbeddings(file):
            text_splitter = CharacterTextSplitter.from_tiktoken_encoder(chunk_size = 500, chunk_overlap=0)
            chunks = text_splitter.split_documents(file)
            embedding_function = OpenAIEmbeddings()
            # load it into Chroma
            db = FAISS.from_documents(chunks, embedding_function)
            eToken = calTokens(chunks)
            return db,eToken


    

    