from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
)
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableParallel
from langchain_exa import ExaSearchRetriever, TextContentsOptions


def chain(retriever, llm):
    template = """Answer the question based only on the following context in the document provided by the user:

    {context}

    Question: {question}
    """
    template_S = "You are a helpful assistant that performs information retrieval from the provided document."
    system_message_prompt = SystemMessagePromptTemplate.from_template(template_S)


    prompt = ChatPromptTemplate.from_messages([system_message_prompt, template])
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    return chain

def qchain(llm):
    template = """Generate Two keywords from the given context:
    {context}
    """
    template_S = "You are a helpful assistant that performs information retrieval from the provided document."
    system_message_prompt = SystemMessagePromptTemplate.from_template(template_S)
    prompt = ChatPromptTemplate.from_messages([system_message_prompt,template])
    chain = (
        {"context": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    return chain

def exaSearch(llm):
    retriever = ExaSearchRetriever(
        k=2, text_contents_options=TextContentsOptions(max_characters=200)
    )
    prompt = PromptTemplate.from_template(
        """Answer the following query based on the following context:
    query: {query}
    <context>
    {context}
    </context"""
    )
    chain = (
        RunnableParallel({"context": retriever, "query": RunnablePassthrough()})
        | prompt
        | llm
    )
    return chain
