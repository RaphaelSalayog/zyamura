import { Dispatch, SetStateAction, useState } from "react";

export interface SelectedDataState<T> {
  get: T;
  set: Dispatch<SetStateAction<T>>;
}

interface useSelectedData<T> {
  selectedData: SelectedDataState<T>;
}

const useSelectedData = () => {
  const [selectedData, setSelectedData] = useState(null);
  return {
    selectedData: { get: selectedData, set: setSelectedData },
  };
};

export default useSelectedData;
