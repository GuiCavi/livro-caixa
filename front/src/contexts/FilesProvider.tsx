import {
  createContext, PropsWithChildren, useContext, useMemo, useReducer,
} from "react";

import { FilesReducer } from "../reducers";
import { FilesActions } from "../reducers/FilesReducer";
import { IFilesProviderState } from "../store";

const initialFiles: IFilesProviderState = {
  credit: [{ name: "name 1" }, { name: "name 1" }, { name: "name 1" }, { name: "name 1" }, { name: "name 1" }],
  debit: [{ name: "name 1" }, { name: "name 1" }, { name: "name 1" }, { name: "name 1" }],
};

const FilesContext = createContext({} as IFilesProviderState);
const FilesDispatchContext = createContext({} as React.Dispatch<FilesActions>);

export function FilesProvider({ children }: PropsWithChildren) {
  const [
    { credit, debit },
    dispatch,
  ] = useReducer(FilesReducer, initialFiles);

  const state = useMemo(() => ({
    credit, debit,
  }), [credit, debit]);

  return (
    <FilesContext.Provider value={state}>
      <FilesDispatchContext.Provider value={dispatch}>
        {children}
      </FilesDispatchContext.Provider>
    </FilesContext.Provider>
  );
}

export const useFiles = () => useContext(FilesContext);
export const useFilesDispatch = () => useContext<React.Dispatch<FilesActions>>(FilesDispatchContext);
