import { useState } from "react";

interface DrawerState {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InventoryDrawerVisiblity {
  pet?: {
    add?: DrawerState;
    edit?: DrawerState;
    remove?: DrawerState;
    view?: DrawerState;
  };
  item?: {
    add?: DrawerState;
    edit?: DrawerState;
    remove?: DrawerState;
    view?: DrawerState;
  };
}

const useInventoryDrawerVisiblity = (): InventoryDrawerVisiblity => {
  const [isPetAddDrawerVisible, setIsPetAddDrawerVisible] = useState(false);
  const [isPetEditDrawerVisible, setIsPetEditDrawerVisible] = useState(false);
  const [isPetRemoveDrawerVisible, setIsPetRemoveDrawerVisible] =
    useState(false);
  const [isPetViewDrawerVisible, setIsPetViewDrawerVisible] = useState(false);

  const [isItemAddDrawerVisible, setIsItemAddDrawerVisible] = useState(false);
  const [isItemEditDrawerVisible, setIsItemEditDrawerVisible] = useState(false);
  const [isItemRemoveDrawerVisible, setIsItemRemoveDrawerVisible] =
    useState(false);
  const [isItemViewDrawerVisible, setIsItemViewDrawerVisible] = useState(false);

  return {
    pet: {
      add: {
        visible: isPetAddDrawerVisible,
        setVisible: setIsPetAddDrawerVisible,
      },
      edit: {
        visible: isPetEditDrawerVisible,
        setVisible: setIsPetEditDrawerVisible,
      },
      remove: {
        visible: isPetRemoveDrawerVisible,
        setVisible: setIsPetRemoveDrawerVisible,
      },
      view: {
        visible: isPetViewDrawerVisible,
        setVisible: setIsPetViewDrawerVisible,
      },
    },
    item: {
      add: {
        visible: isItemAddDrawerVisible,
        setVisible: setIsItemAddDrawerVisible,
      },
      edit: {
        visible: isItemEditDrawerVisible,
        setVisible: setIsItemEditDrawerVisible,
      },
      remove: {
        visible: isItemRemoveDrawerVisible,
        setVisible: setIsItemRemoveDrawerVisible,
      },
      view: {
        visible: isItemViewDrawerVisible,
        setVisible: setIsItemViewDrawerVisible,
      },
    },
  };
};

export default useInventoryDrawerVisiblity;
