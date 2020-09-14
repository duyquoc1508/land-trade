# Luận văn đại học

## Đề tài

#### Xây dựng ứng dụng quản lý và giao dịch bất động sản áp dụng công nghệ Blockchain (Dapps).

## Nhóm sinh viên thực hiện:

1. Trần Tấn Lộc - 16520679
2. Nguyễn Duy Quốc - 16521007

## Smart contract

### RoleBasedAcl contract

Manage role-based access control. 2 roles: SuperAdmin, Notary.

Properties:

- Assign role to address
- Unassign role to address
- Check role of address
- Get all address and role

### RealEstate contract

Real estate management contracts

Properties:

- Create new certificate (notary)
- Activate certificate (owner)

### Transaction contract

Real estate transactions contract

Properties:

The transaction process takes place through 4 steps as follows:

1. <b>Create transaction</b>: <i>Buyer</i> create transaction and send deposit amount to smart contract.
2. <b>Accept transaction</b>: <i>Seller</i> accept deposit and receive deposit amount front smart contract.
3. <b>Payment</b>: <i>Buyer</i> payment the remaining amount + tax (registration tax) and send it to smart contract.
4. <b>Confirm transaction</b>: <i>Seller</i> confirm transaction, receive the remaining amount - tax (personal income tax) from smart contract. At the same time, real estate be transferred to buyer.

In addition, between steps 1-2, 2-3, 3-4. <i>Buyer</i> or <i>seller</i> can <b>Cancel transaction</b>.

### Deploy smart contracts

Deploy smart contracts using truffle framework

- Test smart contracts
  ```
  truffle test
  ```
- Deploy smart contracts to your local Ganache instance
  ```
  truffle migrate --reset
  ```
- Deploy to other networks like testnet or mainnet
  ```
  truffle migrate --reset --network ropsten
  ```

## Front end

Notes: After deploy smart contract. Replace contract address in <code>client/config/common-path</code>, replace contract json file in <code>client/src/contracts</code>

Run

```
npm start
```

## Back end

Notes: After deploy smart contract. Replace contract address in <code>server/src/config/common-path</code>, replace contract json file in <code>server/src/contracts</code>

Run

```
npm run dev
```
