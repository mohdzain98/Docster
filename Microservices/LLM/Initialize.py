from pdftxt import handlePDF, handleTXT, Embed
from spreadsheet import handleSS
from static.Tokens import calEtokens
import pandas as pd
from sql import sequel
import os

class Free:
    def doFree(name):
        os.remove(name)

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
            self.ready=False
    
    def initdb(self, file_type, name):
        if(str(file_type) == 'pdf'):
            pdf = handlePDF(f'tmp/{name}.pdf')
            load = pdf.extract_text_from_pdf()
            wordCount = calEtokens(load)
            if(wordCount < 5000):
                db,eToken = Embed.getEmbeddings(load)
                self.eToken = eToken
                self.db=db
                self.ready=True
            else:
                self.eToken = 0
                self.db=0
            Free.doFree(f'tmp/{name}.pdf')

    def initret(self):
        return self.ready,self.eToken,self.db
    

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
            self.ready=False
    
    def initdb(self, file_type, name):
        if(str(file_type) == 'txt'):
            txt = handleTXT(f'tmp/{name}.txt')
            load = txt.extract_text_from_txt()
            wordCount = calEtokens(load)
            if(wordCount < 5000):
                db,eToken = Embed.getEmbeddings(load)
                self.eToken = eToken
                self.db=db
                self.ready=True
            else:
                self.eToken = 0
                self.db=0
            Free.doFree(f'tmp/{name}.txt')

    def initret(self):
        return self.ready,self.eToken,self.db
    

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
            self.ready=False
    
    def initdb(self, file_type,name):
        if(str(file_type) == 'csv'):
            file = handleSS(f'tmp/{name}.csv')
            csvFile = file.loadData() 
            if(calEtokens(csvFile)<5000):
                db,eToken = file.EmbedSS.getEmbeddings(csvFile)
                self.eToken = eToken
                self.db=db
                self.ready=True
            else:
                self.eToken=0
                self.db=""
            Free.doFree(f'tmp/{name}.csv')

    def initret(self):
        return self.ready,self.eToken,self.db
    


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
            self.ready=False
    
    def initdb(self, file_type, name):
        if(str(file_type) == 'xlsx'):
            file = handleSS(f'tmp/{name}.xlsx')
            fle = pd.read_excel(f'tmp/{name}.xlsx')
            xlFile = file.handleExcel(fle)
            if(calEtokens(xlFile)<5000):
                db,eToken = file.EmbedSS.getEmbeddings(xlFile)
                self.eToken = eToken
                self.db=db
                self.ready=True
            else:
                self.eToken=0
                self.db=""
            Free.doFree(f'tmp/{name}.xlsx')

    def initret(self):
        return self.ready,self.eToken, self.db
    
class Initsql:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.cToken = 0
            self.name=""
            self.initialized = True
            self.file=False
            self.ready=False
    
    def initdb(self, file_type,name):
        if(str(file_type) == 'sql'):
            getsql= sequel(f'tmp/{name}.sql')
            sqliteCon = getsql.convert_mysql_to_sqlite()
            cToken = len(sqliteCon.split())
            if(cToken < 5000):
                sqliteFile = getsql.splite_script_to_db(f'{name}.db',sqliteCon)
                if sqliteFile:
                    self.file = 1
                else:
                    self.file = 0
                self.cToken = cToken
                self.name = name
                self.ready=True
            else:
                self.ready=False
            Free.doFree(f'tmp/{name}.sql')

    def initret(self):
        return self.ready,self.cToken, self.file, self.name
