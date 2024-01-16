import { createContext } from "react";
import { DrawerVisiblity } from "../hooks/useDrawerVisibility";

const initialValue = {
  addPet: {
    visible: false,
    setVisible: () => {},
  },
  editPet: {
    visible: false,
    setVisible: () => {},
  },
  removePet: {
    visible: false,
    setVisible: () => {},
  },
  viewPet: {
    visible: false,
    setVisible: () => {},
  },
};
const InventoryDrawerVisiblityContext =
  createContext<DrawerVisiblity>(initialValue);

export const InventoryDrawerVisiblityProvider =
  InventoryDrawerVisiblityContext.Provider;

export default InventoryDrawerVisiblityContext;
