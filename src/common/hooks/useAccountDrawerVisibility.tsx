import { useState } from "react";

interface DrawerState {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AccountDrawerVisibility {
  add?: DrawerState;
  edit?: {
    userInformation: DrawerState;
    username: DrawerState;
    password: DrawerState;
  };
  remove?: DrawerState;
  view?: DrawerState;
}

const useAccountDrawerVisibility = () => {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isUserInformationVisible, setIsUserInformationVisible] =
    useState(false);
  const [isUsernameVisible, setIsUsernameVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRemoveVisible, setIsRemoveVisible] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);

  return {
    add: {
      visible: isAddVisible,
      setVisible: setIsAddVisible,
    },
    edit: {
      userInformation: {
        visible: isUserInformationVisible,
        setVisible: setIsUserInformationVisible,
      },
      username: {
        visible: isUsernameVisible,
        setVisible: setIsUsernameVisible,
      },
      password: {
        visible: isPasswordVisible,
        setVisible: setIsPasswordVisible,
      },
    },
    remove: { visible: isRemoveVisible, setVisible: setIsRemoveVisible },
    view: { visible: isViewVisible, setVisible: setIsViewVisible },
  };
};

export default useAccountDrawerVisibility;
