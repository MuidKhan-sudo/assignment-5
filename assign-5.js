document.getElementById("login-btn").addEventListener("click", ()=>{
 const getvalue= document.getElementById("Username")
 const mainValue=getvalue.value

 
 const getPass=document.getElementById("password")
 const mainPass=getPass.value 

 if(mainPass==="admin123"&& mainValue==="admin"){
    window.location.assign("home.html")
 }
 else{
    alert("invalid credentials")
 }

})