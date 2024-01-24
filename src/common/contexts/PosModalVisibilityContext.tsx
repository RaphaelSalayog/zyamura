import { createContext } from "react";
import { ModalVisibility } from "../hooks/useModalVisibility";

const initialValue: ModalVisibility = {
  modal: {
    visible: false,
    setVisible: () => {},
  },
  receiptModal: {
    visible: false,
    setVisible: () => {},
  },
};

const PosModalVisibilityContext = createContext<ModalVisibility>(initialValue);

export const PosModalVisibilityProvider = PosModalVisibilityContext.Provider;
export default PosModalVisibilityContext;
