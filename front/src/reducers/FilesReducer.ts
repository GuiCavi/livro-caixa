import { IFilesProviderState } from "../store";

export type TransactionTypes = "credit" | "debit";

export type FilesActions =
| { type: "add", payload: { file: File, type: TransactionTypes } };

export const filesReducer = (state: IFilesProviderState, action: FilesActions): void => {
  switch (action.type) {
    case "add": {
      state[action.payload.type].push(action.payload.file);
      return;
    }
    default: {
      throw new Error(`No case for action ${action.type}`);
    }
  }
};
