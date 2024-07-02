import tiktoken 
import math

def calEtokens(load):
    encoding = tiktoken.get_encoding("cl100k_base")
    chunkLen=0
    for x in load:
        chunkLen = chunkLen + len(encoding.encode(x.page_content))
    return math.floor(chunkLen/2.2)
     
        
    
    