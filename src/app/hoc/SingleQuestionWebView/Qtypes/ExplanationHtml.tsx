
const explanationHtml = (data) => {
    let htmlContent  = ` <!DOCTYPE html>
    <html>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <title>Mindspark</title>

    <head>
        <link rel="stylesheet" href="https://cdn.rawgit.com/Chalarangelo/mini.css/v3.0.1/dist/mini-default.min.css">
        <script type="text/javascript">
            function click_handler(id) {
                document.getElementById('00'+id).style.backgroundColor='lightgreen';
                window.ReactNativeWebView.postMessage(JSON.stringify({id:id}));
            }  
              
        </script>
        <style>
            * {
                margin: 0;
                font-size: 16px;
                width:95%;
            }
        </style>
    </head>
    
    <body style="background-color:white">
        <br/>
        <div class="container">${data}</div>
    </body>
    </html>`
    return htmlContent;
}

export default explanationHtml