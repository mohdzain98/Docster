# Docschat
Docschat is an innovative project designed to revolutionize how users interact with documents. By leveraging the power of Large Language Models (LLMs), Docschat enables intuitive, conversational interactions with documents, making information retrieval and understanding more accessible and efficient.<br>
<strong><label>Features:</label></strong>
<ul>
  <li><strong>Natural Language Processing:</strong> Users can query documents using everyday language, allowing for a seamless and intuitive experience.</li>
  <li><strong>Contextual Understanding:</strong> Docster AI provides context-aware responses, ensuring accurate and relevant information is delivered.</li>
  <li><strong>Multi-Document Support:</strong> Interact with multiple documents simultaneously, allowing for comprehensive research and cross-referencing.</li>
</ul>

## Supported Documents
- PDF
- TXT
- CSV
- EXCEL
- PPTX
- Word
- SQL

## Working
- Login in the website
- Upload the required document
- It will redirect to chat system
- Ask your Queries

## Benefits
- Efficiency: Quickly locate specific information within extensive documents.
- Accessibility: Make document interactions more user-friendly and accessible to non-experts.
- Accuracy: Ensure the accuracy of information through sophisticated language understanding and context awareness.

## Architecture
DocsChat is built using a microservices architecture, with two primary microservices:
- ### User Authentication Service
  - Manages user registration, login, and authentication
  - Ensures secure access to the Docschat platform
  - Handles session management and token-based authentication
- ### LLM (Large Language Model) Service
  - Processes user queries and interacts with various document types
  - Leverages advanced language models to understand and respond to user inputs
  - Performs text extraction, data analysis, and SQL query execution based on document type
  
