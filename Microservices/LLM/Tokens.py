import math
def calTokens(file):
    chunkLen=0
    for x in file:
        chunkLen = chunkLen + len(x.page_content.split())
    return math.floor(chunkLen*1.334)
