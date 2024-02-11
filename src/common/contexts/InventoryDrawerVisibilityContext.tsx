import { createContext } from "react";
import { InventoryDrawerVisiblity } from "../hooks/useInventoryDrawerVisibility";

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
  createContext<InventoryDrawerVisiblity>(initialValue);

export const InventoryDrawerVisiblityProvider =
  InventoryDrawerVisiblityContext.Provider;

export default InventoryDrawerVisiblityContext;
