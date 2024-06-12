from pdftxt import handlePDF, handleTXT, Embed
from spreadsheet import handleSS
import pandas as pd
from sql import sequel

class Init:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.eToken = 0
            self.db=""
            self.initialized = True
    
    def initdb(self, file_type):
        if(str(file_type) == 'pdf'):
            pdf = handlePDF('tmp/docster_temp.pdf')
            load = pdf.extract_text_from_pdf()
            db,eToken = Embed.getEmbeddings(load)
            self.eToken = eToken
            self.db=db

    def initret(self):
        return self.eToken,self.db
    

class Initxt:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.eToken = 0
            self.db=""
            self.initialized = True
    
    def initdb(self, file_type):
        if(str(file_type) == 'txt'):
            txt = handleTXT('tmp/docster_temp.txt')
            load = txt.extract_text_from_txt()
            db,eToken = Embed.getEmbeddings(load)
            self.eToken = eToken
            self.db=db

    def initret(self):
        return self.eToken,self.db
    

class Initcsv:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.eToken = 0
            self.db=""
            self.initialized = True
    
    def initdb(self, file_type):
        if(str(file_type) == 'csv'):
            file = handleSS('tmp/docster_temp.csv')
            csvFile = file.loadData() 
            db,eToken = file.EmbedSS.getEmbeddings(csvFile)
            self.eToken = eToken
            self.db=db

    def initret(self):
        return self.eToken,self.db
    


class Initxlsx:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.eToken = 0
            self.db=""
            self.initialized = True
    
    def initdb(self, file_type):
        if(str(file_type) == 'xlsx'):
            file = handleSS('tmp/docster_temp.xlsx')
            fle = pd.read_excel('tmp/docster_temp.xlsx')
            xlFile = file.handleExcel(fle)
            db,eToken = file.EmbedSS.getEmbeddings(xlFile)
            self.eToken = eToken
            self.db=db

    def initret(self):
        return self.eToken, self.db
    
class Initsql:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.cToken = 0
            self.file=False
            self.initialized = True
    
    def initdb(self, file_type):
        if(str(file_type) == 'sql'):
            getsql= sequel('tmp/docster_temp.sql')
            sqliteCon = getsql.convert_mysql_to_sqlite()
            cToken = len(sqliteCon.split())
            sqliteFile = getsql.splite_script_to_db('bicycle.db',sqliteCon)
            self.cToken = cToken
            self.file = sqliteFile

    def initret(self):
        return self.cToken, self.file
