import { createContext } from "react";
import { AccountDrawerVisibility } from "../hooks/useAccountDrawerVisibility";

const initialValue: AccountDrawerVisibility = {
  add: {
    visible: false,
    setVisible: () => {},
  },
  edit: {
    userInformation: {
      visible: false,
      setVisible: () => {},
    },
    username: {
      visible: false,
      setVisible: () => {},
    },
    password: {
      visible: false,
      setVisible: () => {},
    },
  },
  remove: {
    visible: false,
    setVisible: () => {},
  },
  view: {
    visible: false,
    setVisible: () => {},
  },
};

const AccountDrawerVisibilityContext =
  createContext<AccountDrawerVisibility>(initialValue);

export const AccountDrawerVisiblityProvider =
  AccountDrawerVisibilityContext.Provider;

export default AccountDrawerVisibilityContext;
