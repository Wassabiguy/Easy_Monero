import axios from "axios"

const Check_if_string = async(string) =>{
if(typeof string == 'string'){

}else{
    throw new Error("Mismatched type")
}
}
const Check_if_number = async(number) =>{
if(typeof number == 'number'){

}else{
    throw new Error("Mismatched type")
}
}
const Check_if_object = async (obj) => {
  if(typeof obj == 'object'){

}else{
    throw new Error("Mismatched type")
}
}  

const Http_request = async(Host,Method,Params)=>{
try{
  Check_if_object(Params)
  Check_if_string(Host)
  Check_if_string(Method) 
  let data ={
     "jsonrpc":"2.0",
     "id":"0",
     "method":Method,
     "params":Params
    } 
  let req = await axios.post(Host,data)
  req.headers.setContentType('application/json')
  return req.data
}catch(err){
console.log(err)
}
}







const http_request_CreateSubaddress = async(Host,Method,Params,Persistance=true)=>{
  try{
     Check_if_object(Params)
     Check_if_string(Host)
     Check_if_string(Method)     

    let req = await Http_request(Host,Method,Params)
    let return_obj = {
        'payment_address':req.result.address,
        'address_index':req.result.address_index
      }
 
    if(Persistance == true){
     let params = null
     let method = 'store'
     let flush_to_disk = await Http_request(Host,method,params)
    return  {result:return_obj,status:'Effects Saved to the wallet file successfully!'}
    }else{
    return  {result:return_obj,status:'Effects NOT Saved to wallet file!'}
}
}catch(err){
console.log(err)
return
  } 
}


const http_request_GetBalance = async(Host,Method,Params)=>{
    let req_refresh = await Http_request(Host,'refresh',null)
    let req_balance = await Http_request(Host,Method,Params)
    let info =req_balance.result.per_subaddress[0]
    let obj = {
      account_index: info.account_index,
      sub_address: info.address,
      spendable_balance: info.unlocked_balance *1e-12,
      pending_balance:(info.balance - info.unlocked_balance)*1e-12,
      network_confirmations_for_pending_balance:10 - info.blocks_to_unlock,
      label: info.label,
      sub_address_index:info.address_index
    }
    if(info.blocks_to_unlock == 0){
      obj.network_confirmations_for_pending_balance = 0
    }
    return obj
}

const http_request_Transfer = async (Host,Method,Params) => {
    let req = await Http_request(Host,Method,Params)
    return req.result
}

const check_if_valid_address = async (Host,Method,Params) => {

  let req = await Http_request(Host,Method,Params)
  return req
}

const http_request_CreateAccount = async(Host,Method,Params,Persistance)=>{
     let req = await Http_request(Host,Method,Params)
     if(Persistance == true){
      
     let flush_to_disk = await axios.post(Host,Method,Params)
    return  {result:req,status:'Effects Saved to the wallet file successfully!'}
     }else{
          return {result:flush_to_disk,status:'Effects NOT Saved to wallet file!'}
     }
}
const http_request_WithdrawAllTheMoney = async (Host,Method,Params) => {
     let req = await Http_request(Host,Method,Params)
     return req
}



export{http_request_WithdrawAllTheMoney,http_request_CreateAccount,check_if_valid_address,http_request_Transfer,Check_if_string,Check_if_number,http_request_CreateSubaddress,http_request_GetBalance}