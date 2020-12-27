const BaseURL="http://localhost:3001" // host of our node project
const getData=async(url)=>{
    console.log(`${BaseURL}/${url}`,)
    try{
const response=await fetch(`${BaseURL}/${url}`,{
    method:'GET',
    mode:'cors',
    headers:{'content-type':'application/json'}
})
const result= await response.json();
return result;
    }
    catch(e)
    {
        alert(e)
        console.log(url,e)
    }
}
const postData=async(url,body)=>{
    try{
      var response=await fetch(`${BaseURL}/${url}`,{
        method:'post',
        mode:'cors',
        body:JSON.stringify(body),
        headers:{'content-type':"application/json;charset=utf-8"}
     
      })
      var result=await response.json()
      return(result)
    }catch(e){
    return(false)
    }}
  


export {getData,postData,BaseURL}