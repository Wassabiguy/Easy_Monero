import axios from "axios"
import {http_request_GetWalletBalance,http_request_WithdrawAllTheMoney,http_request_CreateAccount,check_if_valid_address, http_request_Transfer,http_request_CreateSubaddress, http_request_GetBalance_SubAddr } from "./simple.js"
class wallet{
    constructor(info={
        'Host':Host,
        'Wallet_path':Wallet_path,
        }){
        this.host = info.Host+'/json_rpc'
        this.wallet_path = info.Wallet_path
        }
 

   create_account = async (label,Persistance=true) => {
    let params = {
    'label':String(label)
    }
   let req = await http_request_CreateAccount(this.host,'create_account',params,Persistance)
   return req   
}
   create_address = async(label,number=1,Persistance=true,account_index=this.account_index)=>{
        let params = {
            'label':label,
            'account_index':account_index,
            'count':number
        }
        let req =await http_request_CreateSubaddress(this.host,'create_address',params,Persistance)
        return req
    }

   get_balance_of_subAddr = async(subaddress_indice,account_index=0,Persistance=false) => {
    
    let params ={
        'account_index':account_index,
        'address_indices':[Number(subaddress_indice)]
    }
    let req = await http_request_GetBalance_SubAddr(this.host,'get_balance',params)
    
    return req   
    }


    transfer_Amount_to_single_address = async (destination_address,amount,subaddress_indice,account_index=0,priority=1) => {
        let rew =await check_if_valid_address(this.host,'validate_address',{'address':destination_address})
        let Is_Valid =rew.result.valid
        let sending_amount =Math.round(amount * 1e12)
        if(Is_Valid == true){
        let get_balance =await this.get_balance(subaddress_indice,account_index)
        console.log(get_balance)
        if(get_balance.spendable_balance *1e12 < sending_amount){
            return {'message':'Not enough balance'}
        }else{
        let params = {
            'destinations':[{'amount':sending_amount,'address':destination_address}],
            'account_index':account_index,
            'subaddr_indices':[subaddress_indice],
            'priority':priority,
            'get_tx_keys':true,
          
     }
    let req = await http_request_Transfer(this.host,'transfer_split',params)
    return req    
}
}else{
    return {'message':'Not a valid Monero address!'}
}
}
   sweep_all= async(address,account_index=0,subaddr_indices_all=false,indice_to_subaddr=0,priority=0)=>{
    let method = "sweep_all"
    let params ={
        "address":address,
        "account_index":account_index,
        "subaddr_indices_all":subaddr_indices_all,
        "address":address,
        "subaddr_indices":[indice_to_subaddr],
        "get_tx_keys":true,
        "priority":priority
    }
      let rew =await check_if_valid_address(this.host,'validate_address',{'address':address})
        let Is_Valid =rew.result.valid
    if(Is_Valid == true){
    let req = await http_request_WithdrawAllTheMoney(this.host,method,params)
    let output = req.result
    let objP = {
        amount:(output.amount_list[0]* 1e-12).toFixed(12),
        transaction_hash:output.tx_hash_list[0],
        fee:output.fee_list[0]
    }
    return {'complex':output,'simple':objP}
}else{
    return {'message':'Not a valid Monero address!'}
}
   }


get_wallet_total_balance = async(account_index,all_accounts=true)=>{
let params = {
'account_index':account_index,
'all_accounts':all_accounts
}
let req = await http_request_GetWalletBalance(this.host,'get_balance',params)
let output = req.result
let obj = {
    Wallet_balance:(output.balance*1e-12).toFixed(12),
    unlocked_balance:(output.unlocked_balance*1e-12).toFixed(12),
    locked_balance: null
}
let subs = obj.Wallet_balance - obj.unlocked_balance
obj.locked_balance = subs.toFixed(12)
return obj
}











}

export{wallet}