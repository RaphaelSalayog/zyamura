import { useState } from "react";

interface ModalyState {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalVisibility {
  modal?: ModalyState;
  receiptModal?: ModalyState;
}

const useModalVisibility = (): ModalVisibility => {
  const [visible, setVisible] = useState(false);
  const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false);

  return {
    modal: {
      visible,
      setVisible,
    },
    receiptModal: {
      visible: isReceiptModalVisible,
      setVisible: setIsReceiptModalVisible,
    },
  };
};

export default useModalVisibility;
