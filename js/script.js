function isJson(data){
  return typeof data==="object" && data !==null;
}

document.addEventListener('DOMContentLoaded',(event)=>{
  var button=document.querySelector("button");
  button.addEventListener("click",()=>{
    $ajaxUtils.sendGetRequest("/data/name.txt")
      .then((res)=>{
        var message;
        if(isJson(res)){
            message=res.firstName + " " + res.lastName
            if (res.likesChineseFood) {
              message += " likes Chinese food";
            }
            else {
              message += " doesn't like Chinese food";
            }
            message += " and uses ";
            message += res.numberOfDisplays + 1;
            message += " displays for coding.";

            
          // console.log(message);      
                       
          }
          else{
              message=res;
          }

          document.querySelector("#content")
              .innerHTML = "<h2>" + message + "</h2>";
      })
      .catch((err)=>{
        console.error(err);
      })
  })
});