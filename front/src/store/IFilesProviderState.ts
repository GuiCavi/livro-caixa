export interface IFilesProviderState {
  credit: Pick<File, "name">[],
  debit: Pick<File, "name">[],
}
