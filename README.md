# Easy_Monero
A javascript libaray that makes it easier for people to interact with monero rpc wallet(when the wallet already exists).
check [Monero RPC documentation](https://docs.getmonero.org/rpc-library/wallet-rpc/)
# What this library could do?
1. Generate a subaddress for a specific account(default is 0)
2. Transfering XMR to other addresses along with checking if the recepient address is valid or not.
3. Get the balance of a specific account or a subaddress in an account
4. sweep all funds from specific account or a subaddress that is part of an account
# Important note
1. I am not responsible for any misuse of this library nor any damage caused by it, you better check the code yourself!
2. The library doesn't support digest auth to interact with the RPC using authentication

# Example usage
Intialise an instance first.
```
{
    import {Wallet} from 'wallet.js'
    let wallet = new Wallet({$HOSTNAME_WITH_PORT,$PATH_TO_WALLET})

}
```
You can add a path to the wallet file but the functions used currently don't need it(that's for future features)

## Want to check the balance of a specific account or a subaddress of the specific account 
for example a subaddress that belongs to an account indexed at 0

`let getBalance= await wallet.get_balance_of_subAddr($SUBADDRESS_INDEX)`
example output:
```
{
  account_index: 0,
  sub_address: '85MhkjanVTxYF1hbFU4ERMFCs3NTTSgyraMb4eaedpJdNegh44itc25AEz3ZQUVHnUjC9VARoSoupB4yGJyu2MtJ51fkTGn',
  spendable_balance: 0,
  pending_balance: 0,
  network_confirmations_for_pending_balance: 0,
  label: 'new-subs',
  sub_address_index: 43
}
```
# If you needed to get the balance of a different account or its subaddress, for example account indexed at 1 
`let getBalance= await wallet.get_balance_of_subAddr(0,1)`
# What if I wanted to check the balance for a subaddress indexed at 4 in that account?
`let getBalance= await wallet.get_balance_of_subAddr(4,1)`

# Generating a subaddress 
`const create_subaddr = await wallet.create_address($LABEL)`

Example output:
```
{
  result: {
    payment_address: '835ysECJkAWVDXXM51oVsk4dibtsVHCqmBoDJgNJ47qbH351sGPJp1jEKt4sqvGs1rAKc87vLApU6FQgfBKW9YkxGMJvRgN',
    address_index: 481
  },
  status: 'Effects Saved to the wallet file successfully!'
}
```
# Generating a single subaddress in a specific account indexed at 5 for example and also saving it in the wallet file, you can turn it to false to not save to the wallet file
`const create_subaddr = await wallet.create_address($LABEL,1,true,5)`
# Generating an account
`const create_acc = awatit wallet.create_account($LABEL)`

Example output:
```
{
 result: {
    id: '0',
    jsonrpc: '2.0',
    result: {
      account_index: 9,
      address: '85JknYLSNSuWyJeWLCszPB5cRLBxSfvPWe63T4tHQ2erMLhN1D4JcaCDAGE7zkdB3eArxueRQ5UZG7qS2a4bmcVZK96QFhu'
    }
  },
  status: 'Effects Saved to the wallet file successfully!'
}
```
# Transfer XMR to another address
If you needed to transfer a specific amount of funds to a specific address the syntax would be this also you can control which subaddress and account you want to spend from as the above examples:

`let transfer = await wallet.transfer_Amount_to_single_address($DESTINATION_ADDRESS,$AMOUNT_IN_DECIMALS,$SUBADDRESS_INDICE)`

Note that this feature won't work as intended sometimes due to the fact that we still need to have Daemon rpc to be ON in the background to get the fees
mainly this library assume that you have your wallet rpc on along with having a your wallet path included in the arguments

Example output:
```
{
{
  
  "result": {
    "amount_list": [3000000000000],
    "fee_list": [473710000],
    "weight_list": 51456,
    "multisig_txset": "",
    "tx_hash_list": ["4adcdc1af3f665770cdf8fb7a380887cd07ac53c2b771bd18df5ca375d5e7540"],
    "tx_key_list": ["5b455c0f97168be652a2c03c5c68a064bb84cdae4ddef01b5c48d73a0bbb27075fb714f2ca19ea6c8ff592417e606addea6deb1d6530e2969f75681ffcbfc4075677b94a8c9197963ae38fa6f543ee68f0a4c4bbda4c453f39538f00b28e980ea08509730b51c004960101ba2f3adbc34cbbdff0d5af9dba061b523090debd06"],
    "unsigned_txset": ""
    "spent_key_images_list": [{
      "key_images": ["cea4f54494d4cc28c006af7551b57a49eb6e8aac966ffa7b169f32298213c6ca"]
    }],
  }
}
}
```

It's important to note that this feature might not send the specific amount you want, you need to cut little bit from the amount you want to send just to pay the fee to the network in order to get the transaction processed 

# sweep all funds from subaddresses in a certain account:
`let sweep_all = await wallet.sweep_all($DESTINATION_ADDRESS,$ACCOUNT_INDEX,true,$SUBADDRES_INDEX)`

Example output:
```

  {
  complex: {
    amount_list: [ 7041880000 ],
    amounts_by_dest_list: [ [Object] ],
    fee_list: [ 58120000 ],
    multisig_txset: '',
    spent_key_images_list: [ [Object] ],
    tx_hash_list: [
      'ed52e23a7951d0ac3a45ef2cfa8869e89a75e9328297e016acbb514e52f803a7'
    ],
    tx_key_list: [
      'd15dca5707ce756997955964d5ac9e18b01fbebbc9357bdcee30d7e6bdc4ca07'
    ],
    unsigned_txset: '',
    weight_list: [ 2906 ]
  },
  simple: {
    amount: '0.007041880000',
    transaction_hash: 'ed52e23a7951d0ac3a45ef2cfa8869e89a75e9328297e016acbb514e52f803a7',
    fee: 58120000
  }
}


```
# sweep all funds from a specific subaddress:

```

let sweep_all = await wallet.sweep_all($DESTINATION_ADDRESS,$ACCOUNT_INDEX,false,$SUBADDRES_INDEX)

```
Example output:
```
{
  complex: {
    amount_list: [ 2470620000 ],
    amounts_by_dest_list: [ [Object] ],
    fee_list: [ 30640000 ],
    multisig_txset: '',
    spent_key_images_list: [ [Object] ],
    tx_hash_list: [
      '6d9fcc6aba57631cd76069de05bba40b02f91cbbfb1096c8aa96008d39d1a5b1'
    ],
    tx_key_list: [
      'e830f92bbb7140984baad8567e5e575044f3fe9e296cab7f35b9e9b7da29c50a'
    ],
    unsigned_txset: '',
    weight_list: [ 1532 ]
  },
  simple: {
    amount: '0.002470620000',
    transaction_hash: '6d9fcc6aba57631cd76069de05bba40b02f91cbbfb1096c8aa96008d39d1a5b1',
    fee: 30640000
  }
}
```
