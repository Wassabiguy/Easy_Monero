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
`let wallet = new Wallet({$HOSTNAME_WITH_PORT,$PATH_TO_WALLET})`
You can add a path to the wallet file but the functions used currently don't need it(that's for future features)

## Want to check the balance of a specific account or a subaddress of the specific account 
for example a subaddress that belongs to an  account indexed at 0
`let getBalance= await wallet.get_balance($SUBADDRESS_INDEX)`
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
If you needed to get the balance of a different accou