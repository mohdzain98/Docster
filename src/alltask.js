// eslint-disable-next-line
const tasks=[
    {
        taskName:'PDF',
        imgSrc:'pdf.png',
        text:'white',
        bg:'primary',
        ol:['Extract text from PDF','Q and A on PDF','Summarize PDF'],
        type:"application/pdf",
        btnHref:'pdf',
        btnClass:'danger'
    },
    {
        taskName:'TXT',
        imgSrc:'txt.png',
        text:'white',
        bg:'success',
        ol:['Extract Text','Find Details','Summarize your TXT'],
        type:"text/plain",
        btnHref:'txt',
        btnClass:'primary'
    },
    {
        taskName:'CSV',
        imgSrc:'csv.png',
        text:'white',
        bg:'danger',
        ol:['Q and A on CSV File','Find key points from CSV','Perform calculations on CSV'],
        type:"text/csv",
        btnHref:'csv',
        btnClass:'success'
    },
    {
        taskName:'EXCEL',
        imgSrc:'excel.png',
        text:'black',
        bg:'warning',
        ol:['Find Insights from Excel File','Find key points from Excel','Perform calculations on Excel'],
        type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        btnHref:'xlsx',
        btnClass:'info'
    },
    {
        taskName:'PPTX',
        imgSrc:'ppt.jpg',
        text:'white',
        bg:'dark',
        ol:['Extract text from PPT','Q and A on PPT','Find Vital Knowledge'],
        type:"application/vnd.openxmlformats-officedocument.presentationml.presentation",
        btnHref:'pptx',
        btnClass:'danger'
    },
    {
        taskName:'DOCX',
        imgSrc:'word.jpg',
        text:'white',
        bg:'secondary',
        ol:['Extract text from Word file','Q and A on Word','Rapidly Find essential Facts'],
        type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        btnHref:'docx',
        btnClass:'danger'
    },
    {
        taskName:'SQL',
        imgSrc:'sql.png',
        text:'black',
        bg:'info',
        ol:['Q and A on on SQL File','Create Query on SQL File','Retrieve documents from SQL','MySQL, Sqlite and PostgreSql Accepted'],
        type:"",
        btnHref:'sql',
        btnClass:'warning'
    }
]
export default tasks;