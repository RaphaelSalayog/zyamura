import { useState } from "react";

interface DrawerState {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DrawerVisibility {
  add?: DrawerState;
  edit?: DrawerState;
  remove?: DrawerState;
  view?: DrawerState;
}

const useDrawerVisibility = () => {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isRemoveVisible, setIsRemoveVisible] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);

  return {
    add: {
      visible: isAddVisible,
      setVisible: setIsAddVisible,
    },
    edit: {
      visible: isEditVisible,
      setVisible: setIsEditVisible,
    },
    remove: { visible: isRemoveVisible, setVisible: setIsRemoveVisible },
    view: { visible: isViewVisible, setVisible: setIsViewVisible },
  };
};

export default useDrawerVisibility;
