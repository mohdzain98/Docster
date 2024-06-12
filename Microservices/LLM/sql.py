import sqlite3
import re

class sequel:
    def __init__(self,path):
        self.path = path

    
    def splite_script_to_db(self,db_name,sqlFile):
        sqlite_db = db_name
        sql_script_file = sqlFile
        conn = sqlite3.connect(sqlite_db)
        cursor = conn.cursor()
        mesg=""
        try:
            cursor.executescript(sql_script_file)
            mesg = True
        except sqlite3.Error as e:
            mesg = False
        conn.commit()
        conn.close()
        return mesg
    
    
    def convert_mysql_to_sqlite(self):
        mysql_sql_path = self.path
        # Function to convert MySQL SQL dump to SQLite SQL
        with open(mysql_sql_path, 'r', encoding='utf-8') as sql_file:
            mysql_sql = sql_file.read()
        # Replace AUTO_INCREMENT with AUTOINCREMENT
        mysql_sql = re.sub(r'\bAUTO_INCREMENT\b', 'AUTOINCREMENT', mysql_sql, flags=re.IGNORECASE)

        # Replace data types
        type_mappings = {
            r'\bTINYINT\(1\)\b': 'BOOLEAN',
            r'\bINT\b': 'INTEGER',
            r'\bVARCHAR\((\d+)\)\b': 'TEXT',
            r'\bDATETIME\b': 'TEXT',  # SQLite can store dates as TEXT
            r'\bTIMESTAMP\b': 'TEXT',
            r'\bDOUBLE\b': 'REAL'
        }

        for mysql_type, sqlite_type in type_mappings.items():
            mysql_sql = re.sub(mysql_type, sqlite_type, mysql_sql, flags=re.IGNORECASE)

        mysql_sql = re.sub(r'`', '', mysql_sql)  # Remove backticks
        mysql_sql = re.sub(r'\bENGINE=\w+\b', '', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r'\bDEFAULT CHARSET=\w+\b', '', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r'\bCOLLATE=\w+\b', '', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r'\bCHARACTER SET \w+\b', '', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r'\bLOCK TABLES\b.*?;', '', mysql_sql, flags=re.IGNORECASE | re.DOTALL)
        mysql_sql = re.sub(r'\bUNLOCK TABLES\b;', '', mysql_sql, flags=re.IGNORECASE)

        # Replace NOW() with CURRENT_TIMESTAMP
        mysql_sql = re.sub(r'\bNOW\(\)\b', 'CURRENT_TIMESTAMP', mysql_sql, flags=re.IGNORECASE)

        # Add PRAGMA foreign_keys = ON;
        mysql_sql = "PRAGMA foreign_keys = ON;\n" + mysql_sql
        return mysql_sql
    

