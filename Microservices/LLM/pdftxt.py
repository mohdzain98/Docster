from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from static.Tokens import calEtokens

import fitz  # PyMuPDF
import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import io
import re




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
    def ocr_image(self,image):
        return pytesseract.image_to_string(image)
    
    def clean_text(self,text):
        text = re.sub(r'\n\s*\n', '\n', text)
        text = re.sub(r'[ \t]+', ' ', text)
        text = text.strip()
        return text
    
    
    def extract_text_from_pdf(self):
        pdfText=""
        pdf_document = fitz.open(self.path)
        for page_num in range(pdf_document.page_count):
            page = pdf_document.load_page(page_num)

            # Extract text from the page
            text = page.get_text()
            pdfText = pdfText+text
            pdfText = pdfText+'\n'

            # Extract images from the page
            images = page.get_images(full=True)
            for img_index, img in enumerate(images):
                xref = img[0]
                base_image = pdf_document.extract_image(xref)
                image_bytes = base_image["image"]
                image = Image.open(io.BytesIO(image_bytes))
                ocr_text = self.ocr_image(image)
                pdfText = pdfText+ocr_text  
                pdfText = pdfText+'\n'
        pdf_document.close()
        pdfText = self.clean_text(pdfText)
        result = [Document(page_content=pdfText, metadata={'source': self.path, 'page': len(pdfText.split())})]
        return result

    
class handleTXT:
    def __init__(self,path):
        self.path=path
        
    def extract_text_from_txt(self):
        """Returns extracted text from TXT only"""
        loader = TextLoader(self.path)
        text = loader.load()
        return text
    

class Embed:
    def getEmbeddings(load):
        text_splitter = CharacterTextSplitter.from_tiktoken_encoder(chunk_size = 500)
        docs = text_splitter.split_documents(load)
        embedding_function = OpenAIEmbeddings()
        db = FAISS.from_documents(docs, embedding_function)
        pkl = db.serialize_to_bytes()
        eTokens = calEtokens(load)
        return pkl,eTokens

