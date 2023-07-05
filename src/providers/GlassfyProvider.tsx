import { createContext, useContext, useEffect, useState } from "react";
import {
  Glassfy,
  GlassfyOffering,
  GlassfyPermission,
  GlassfySku,
  GlassfyTransaction,
  GLASSFY_LOGLEVEL,
} from "react-native-glassfy-module";

interface GlassfyProps {
  purchase?: (sku: GlassfySku) => Promise<void>;
  restorePermissions?: () => Promise<GlassfySku>;
  user: UserState;
  offerings: GlassfyOffering[];
  loadingPurchase: boolean;
}

export interface UserState {
  pro: boolean;
}

const GlassfyContext = createContext<GlassfyProps | null>(null);

// Change this to your Glassfy key
// https://dashboard.glassfy.io/0/settings
const GLASSFY_KEY = "fce3f270cd3e4146b654e5a48c365bf5";

// Provide Glassfy functions to our app
export const GlassfyProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserState>({
    pro: false,
  });
  const [offerings, setOfferings] = useState<GlassfyOffering[]>([]);
  const [loadingPurchase, setLoadingPurchase] = useState(false);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Intialise Glassfy and set our provider ready
      await Glassfy.initialize(GLASSFY_KEY, false);
      setIsReady(true);
      // Glassfy.setLogLevel(GLASSFY_LOGLEVEL.ALL);

      // Load all offerings (products) and permissions (previous purchases)
      await loadOfferings();
      await loadPermissions();
    };
    init();
  }, []);

  // Load all offerings a user can purchase
  const loadOfferings = async () => {
    let offerings = await Glassfy.offerings();
    setOfferings(offerings.all);
  };

  // Load all permissions a user has
  const loadPermissions = async () => {
    let permissions = await Glassfy.permissions();
    handleExistingPermissions(permissions.all);
  };

  // Restore previous purchases
  const restorePermissions = async () => {
    let sku = await Glassfy.restorePurchases();
    return sku;
  };

  // Purchase one SKU and handle a successful transaction
  const purchase = async (sku: GlassfySku) => {
    setLoadingPurchase(true);
    try {
      const transaction = await Glassfy.purchaseSku(sku);

      if (transaction.receiptValidated) {
        handleSuccessfulTransactionResult(transaction, sku);
        setLoadingPurchase(false);
      }
      setLoadingPurchase(false);
    } catch {
      setLoadingPurchase(false);
    }
  };

  // Update user state based on previous purchases
  const handleExistingPermissions = (permissions: GlassfyPermission[]) => {
    const newUser: UserState = {pro: false };

    for (const perm of permissions) {
      if (perm.isValid) {
        if (perm.permissionId === "pro_features") {
          newUser.pro = true;
        }
      }
    }
    setUser(newUser);
  };

  // Update the user state based on what we purchased
  const handleSuccessfulTransactionResult = (
    transaction: GlassfyTransaction,
    sku: GlassfySku
  ) => {
    const productID = (transaction as any).productId;

    if (productID.indexOf("compre_gado_montly_30days_0") >= 0) {
      setUser({ ...user, pro: true });
    }
  };

  const value = {
    loadPermissions,
    purchase,
    restorePermissions,
    user,
    offerings,
    loadingPurchase,
  };

  // Return empty fragment if provider is not ready (Glassfy not yet initialised)
  if (!isReady) return <></>;

  return (
    <GlassfyContext.Provider value={value}>{children}</GlassfyContext.Provider>
  );
};

// Export context for easy usage
export const useGlassfy = () => {
  return useContext(GlassfyContext) as GlassfyProps;
};
