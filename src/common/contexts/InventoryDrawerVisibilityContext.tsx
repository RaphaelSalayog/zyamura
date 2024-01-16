import { createContext } from "react";
import { DrawerVisiblity } from "../hooks/useDrawerVisibility";

const initialValue = {
  pet: {
    add: {
      visible: false,
      setVisible: () => {},
    },
    edit: {
      visible: false,
      setVisible: () => {},
    },
    remove: {
      visible: false,
      setVisible: () => {},
    },
    view: {
      visible: false,
      setVisible: () => {},
    },
  },
  item: {
    add: {
      visible: false,
      setVisible: () => {},
    },
    edit: {
      visible: false,
      setVisible: () => {},
    },
    remove: {
      visible: false,
      setVisible: () => {},
    },
    view: {
      visible: false,
      setVisible: () => {},
    },
  },
};
const InventoryDrawerVisiblityContext =
  createContext<DrawerVisiblity>(initialValue);

export const InventoryDrawerVisiblityProvider =
  InventoryDrawerVisiblityContext.Provider;

export default InventoryDrawerVisiblityContext;
