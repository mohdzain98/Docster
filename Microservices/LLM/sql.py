import sqlite3
import re
import os

class sequel:
    def __init__(self,path):
        self.path = path

    
    def splite_script_to_db(self,db_name,sqlFile):
        os.makedirs("db", exist_ok=True)
        sqlite_db = os.path.join('db', db_name)
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
    
    def replace_primary_key(self, match):
        constraint_name = match.group(1)
        column_name = match.group(2)
        return f"PRIMARY KEY ({column_name})"

    def remove_n_prefix(self,match):
        return "'" + match.group(1) + "'"

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
            r'\bDOUBLE\b': 'REAL',
            r"NVARCHAR\(\d+\)": "TEXT"
        }

        for mysql_type, sqlite_type in type_mappings.items():
            mysql_sql = re.sub(mysql_type, sqlite_type, mysql_sql, flags=re.IGNORECASE)

        mysql_sql = re.sub(r'`', '', mysql_sql)  # Remove backticks
        mysql_sql = re.sub(r'\bENGINE=\w+\b', '', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r"DROP\s+DATABASE\s+IF\s+EXISTS\s+\w+\s*;", '', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r"CREATE\s+DATABASE\s+\w+\s*;",'', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r"USE\s+\w+\s*;",'', mysql_sql, flags=re.IGNORECASE )
        mysql_sql = re.sub(r"CONSTRAINT\s+PK_(\w+)\s+PRIMARY\s+KEY\s+\(\s*(\w+(?:,\s*\w+)*)\s*\)",self.replace_primary_key,mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r'\bDEFAULT CHARSET=\w+\b', '', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r'\bCOLLATE=\w+\b', '', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r'\bCHARACTER SET \w+\b', '', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r'\bLOCK TABLES\b.*?;', '', mysql_sql, flags=re.IGNORECASE | re.DOTALL)
        mysql_sql = re.sub(r'\bUNLOCK TABLES\b;', '', mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r"ALTER\s+TABLE\s+(\w+)\s+ADD\s+CONSTRAINT\s+(\w+)\s+FOREIGN\s+KEY\s+\(\s*(\w+)\s*\)\s+REFERENCES\s+(\w+)\s*\(\s*(\w+)\s*\)\s+ON\s+DELETE\s+(NO ACTION|CASCADE|SET NULL|SET DEFAULT)\s+ON\s+UPDATE\s+(NO ACTION|CASCADE|SET NULL|SET DEFAULT)\s*;",r"/* SQLite does not support ALTER TABLE ADD CONSTRAINT */",mysql_sql, flags=re.IGNORECASE)
        mysql_sql = re.sub(r"N'((?:[^']|'')*)'", self.remove_n_prefix, mysql_sql, flags=re.IGNORECASE)
        # Replace NOW() with CURRENT_TIMESTAMP
        mysql_sql = re.sub(r'\bNOW\(\)\b', 'CURRENT_TIMESTAMP', mysql_sql, flags=re.IGNORECASE)

        # Add PRAGMA foreign_keys = ON;
        mysql_sql = "PRAGMA foreign_keys = ON;\n" + mysql_sql
        return mysql_sql
    
    

