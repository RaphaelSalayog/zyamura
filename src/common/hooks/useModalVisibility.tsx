import { useState } from "react";

interface ModalyState {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalVisibility {
  modal?: ModalyState;
}

const useModalVisibility = (): ModalVisibility => {
  const [visible, setVisible] = useState(false);

  return {
    modal: {
      visible,
      setVisible,
    },
  };
};

export default useModalVisibility;
