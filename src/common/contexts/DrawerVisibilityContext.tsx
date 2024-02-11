import { createContext } from "react";
import { DrawerVisibility } from "../hooks/useDrawerVisiblity";

const initialValue: DrawerVisibility = {
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
};

const DrawerVisibilityContext = createContext<DrawerVisibility>(initialValue);

export const DrawerVisiblityProvider = DrawerVisibilityContext.Provider;

export default DrawerVisibilityContext;
