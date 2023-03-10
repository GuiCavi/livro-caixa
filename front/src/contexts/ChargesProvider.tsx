import produce from "immer";
import _ from "lodash";
import {
  createContext, PropsWithChildren, useState, useCallback, useMemo, useContext, useRef,
} from "react";
import { useMap } from "react-use";

type Charge = {
  id: string;
  description: string;
  date: string;
  value: string;
};

export interface IChargesProviderState {
  state: {
    charges: Charge[];
  };
  readFile: (file: File) => void;
}

const readCSVFile = (file: File, cb: (values: string[][]) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    const content = event.target?.result as string;

    const lines = content.split("\n");
    const values = lines.slice(1).filter((line) => line.length > 0).map((line) => line.split(","));

    cb(values);
  });
  reader.readAsText(file);
};

const ChargesContext = createContext({} as IChargesProviderState);

export function ChargesProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<{ charges: Charge[] }>({ charges: [] });
  const rawCharges = useRef(new Map());

  const readFile = useCallback((file: File) => {
    readCSVFile(file, (values) => {
      setState((old) => produce(old, (draft) => {
        rawCharges.current = values
          .map((line) => ({
            id: line[2],
            description: line[3],
            date: line[0],
            value: line[1],
          }))
          .reduce((prev, curr) => prev.set(curr.id, curr), rawCharges.current);

        console.log(rawCharges.current);

        draft.charges = Array.from(rawCharges.current.values());
      }));
    });
  }, []);

  const value = useMemo(() => ({
    state,
    readFile,
  }), [state, readFile]);

  return (
    <ChargesContext.Provider value={value}>{children}</ChargesContext.Provider>
  );
}

export const useCharges = () => {
  const context = useContext(ChargesContext);
  return context;
};
