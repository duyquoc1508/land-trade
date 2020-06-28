import { realEstateListener } from "./realEstateListener/RealEstateListener";
import { roleBasedListener } from "./roleBasedListener/RoleBasedListener";
import { transactionListener } from "./transactionListener/TransactionListener";

// initialize event listener on smart contract
export function initializeListeners() {
  realEstateListener();
  roleBasedListener();
  transactionListener();
}
