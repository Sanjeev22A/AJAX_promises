(function (global){
  var ajaxUtils={};

  function getRequestObject(){
    if(window.XMLHttpRequest){
      return (new XMLHttpRequest());
    }
    else if(window.ActiveXObject){
      return (new ActiveXObject());
    }
    else{
      global.alert("AJAX not supported");
      return null;
    }
  }

  ajaxUtils.sendGetRequest=(requestUrl)=>{
    return new Promise((resolve,reject)=>{
      var request=getRequestObject();
      if(!request){
        reject(new Error("Ajax isnt supported by the browser"));
        return;
      }
      request.onreadystatechange=()=>{
        handleResponse(request,resolve,reject);
      }
      request.open("GET",requestUrl,true);
      request.send(null);
    });
  };

  function handleResponse(request,resolve,reject){
    if(request.readyState==4){
      if(request.status==200){
        try{
          const JsonResponse=JSON.parse(request.responseText);
          resolve(JsonResponse);
        }
        catch(err){
          resolve(request.responseText);
        }
      }
      else{
        reject(new Error(`Request Failed : ${request.status}`));
      }
    }
  }
  global.$ajaxUtils=ajaxUtils;

})(window);