import { useState } from "react";

interface DrawerState {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DrawerVisiblity {
  addPet?: DrawerState;
  editPet?: DrawerState;
  removePet?: DrawerState;
  viewPet?: DrawerState;
}

const useDrawerVisiblity = (): DrawerVisiblity => {
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const [isRemoveDrawerVisible, setIsRemoveDrawerVisible] = useState(false);
  const [isViewDrawerVisible, setIsViewDrawerVisible] = useState(false);

  return {
    addPet: {
      visible: isAddDrawerVisible,
      setVisible: setIsAddDrawerVisible,
    },
    editPet: {
      visible: isEditDrawerVisible,
      setVisible: setIsEditDrawerVisible,
    },
    removePet: {
      visible: isRemoveDrawerVisible,
      setVisible: setIsRemoveDrawerVisible,
    },
    viewPet: {
      visible: isViewDrawerVisible,
      setVisible: setIsViewDrawerVisible,
    },
  };
};

export default useDrawerVisiblity;
