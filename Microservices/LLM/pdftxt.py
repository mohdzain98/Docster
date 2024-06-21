from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from Tokens import calTokens

import fitz  # PyMuPDF
import pytesseract
from pdf2image import convert_from_path




class Document:
    def __init__(self, page_content, metadata):
        self.page_content = page_content
        self.metadata = metadata

    def __repr__(self):
        return f"Document(page_content={self.page_content}, metadata={self.metadata})"

class handlePDF:
    def __init__(self,path):
        self.path=path
    # Function to determine PDF type
    def extract_text_from_pdf(self):
        """Returns extrcated text from PDF only"""
        file_path = self.path
        pdf_document = fitz.open(file_path)
        page = pdf_document.load_page(0)  # Load the first page
        text = page.get_text()
        pdf_document.close()

        if text.strip():
            # Use fitz (PyMuPDF) for digital text PDF
            return self.extract_text_with_fitz(file_path)
        else:
            # Use OCR for scanned PDF
            return self.extract_text_with_ocr(file_path)

    def extract_text_with_fitz(self,file_path):
        pdf_document = fitz.open(file_path)
        text = ""
        for page_num in range(pdf_document.page_count):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
        pdf_document.close()
        result = [Document(page_content=text, metadata={'source': self.path, 'page': len(text)})]
        return result

    def extract_text_with_ocr(self,file_path):
        images = convert_from_path(file_path)
        text = ""
        for image in images:
            text += pytesseract.image_to_string(image)
        result = [Document(page_content=text, metadata={'source': self.path, 'page': len(text)})]
        return result

    
class handleTXT:
    def __init__(self,path):
        self.path=path
        
    def extract_text_from_txt(self):
        """Returns extrcated text from TXT only"""
        loader = TextLoader(self.path)
        text = loader.load()
        return text
    

class Embed:
    def getEmbeddings(load):
        text_splitter = CharacterTextSplitter.from_tiktoken_encoder(chunk_size = 500)
        docs = text_splitter.split_documents(load)
        embedding_function = OpenAIEmbeddings()
        db = FAISS.from_documents(docs, embedding_function)
        eTokens = calTokens(docs)
        return db,eTokens

