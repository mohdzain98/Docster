from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
)


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
