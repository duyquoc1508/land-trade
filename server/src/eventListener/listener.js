import { realEstateListener } from "./realEstateListener/RealEstateListener";
import { roleBasedListener } from "./roleBasedListener/RoleBasedListener"

// initialize event listener on smart contract
export function initializeListeners() {
  realEstateListener();
  roleBasedListener();
}
