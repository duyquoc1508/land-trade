# Landtrade

## Front end

```
npm start
```

## Back end

```
npm run dev
```

## Smart contract

### RoleBasedAcl contract

Manage role-based access control contracts

Properties:

- Assign role to address
- Unassign role to address
- Check role of address
- Get all address and role

### RealEstate contract

Real estate management and transaction

Properties:

- Create new certificate
- Get all owner of certificate
- Get owner approval for ( activate || sell )
- Activate certificate
- Activate certificate for sale
- Transfer ownership of certificate
- Check state of certificate

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
