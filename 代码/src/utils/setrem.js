(function(document,window){
    let doc     = document.documentElement,//获取根节点html
    resizeEvent = "orientationchange" in window ?  "orientationchange" :"resize",
    resets      = () =>{
        if(doc.clientWidth>750){
            doc.style.fontSize = "100px";
            document.getElementById("root").style.width = '750px';
            return
        } 
        let fontSizeValue = doc.clientWidth/7.5;
        doc.style.fontSize = fontSizeValue+"px";
        document.getElementById("root").style.width = "auto";
    }
    if(!doc.addEventListener) return ;
    window.addEventListener(resizeEvent,resets,false)
    doc.addEventListener("DOMContentLoaded",resets,false)

})(document,window)