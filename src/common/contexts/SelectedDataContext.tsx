import { Dispatch, createContext } from "react";
import { SelectedDataState } from "../hooks/useSelectedData";

const initialValue = {
  get: null,
  set: (() => undefined) as Dispatch<any>,
};

const SelectedDataContext = createContext<SelectedDataState<any>>(initialValue);

export const SelectedDataProvider = SelectedDataContext.Provider;

export default SelectedDataContext;
