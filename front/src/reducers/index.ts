import produce from "immer";

import { filesReducer } from "./FilesReducer";

export const FilesReducer = produce(filesReducer);
