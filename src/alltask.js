// eslint-disable-next-line
const tasks=[
    {
        taskName:'PDF',
        imgSrc:'pdf.png',
        text:'white',
        bg:'primary',
        ol:['I can extract text from your PDF','I can Q&A on your PDF','I can create summary of your PDF'],
        type:"application/pdf",
        btnHref:'pdf',
        btnClass:'danger'
    },
    {
        taskName:'TXT',
        imgSrc:'txt.png',
        text:'white',
        bg:'success',
        ol:['I can extract text from your TXT','I can Q&A on your TXT','I can create summary of your TXT'],
        type:"text/plain",
        btnHref:'txt',
        btnClass:'primary'
    },
    {
        taskName:'CSV',
        imgSrc:'csv.jpg',
        text:'white',
        bg:'danger',
        ol:['I can Q&A on your CSV File','I can give you key points from CSV','I can do calculations from this CSV'],
        type:"text/csv",
        btnHref:'csv',
        btnClass:'success'
    },
    {
        taskName:'EXCEL',
        imgSrc:'excel.jpg',
        text:'black',
        bg:'warning',
        ol:['I can Q&A on your Excel File','I can give you key points from Excel','I can do calculations from this Excel'],
        type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        btnHref:'xlsx',
        btnClass:'info'
    },
    {
        taskName:'SQL',
        imgSrc:'sql.jpg',
        text:'black',
        bg:'info',
        ol:['I can Q&A on your SQL File','I can create Query on this File','I can retrieve documents from SQL'],
        type:"",
        btnHref:'sql',
        btnClass:'warning'
    }
]
export default tasks;