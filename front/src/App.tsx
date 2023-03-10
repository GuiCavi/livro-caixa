import { Badge, FileArea, FileList } from "./components";
import { useFiles, useFilesDispatch, useCharges } from "./contexts";

import styles from "./Container.module.css";

function App() {
  const { credit, debit } = useFiles();
  const filesDispatch = useFilesDispatch();

  const {
    state,
    readFile,
  } = useCharges();

  return (
    <div className={`${styles.container} h-screen`}>
      <div className={styles.credit}>
        <FileArea
          addNewFile={(file) => {
            filesDispatch({ type: "add", payload: { file, type: "credit" } });
            readFile(file);
          }}
        >
          <Badge text="Credit" />

          <FileList files={credit} />
        </FileArea>

      </div>

      <div className={styles.debit}>
        <FileArea
          addNewFile={(file) => filesDispatch({ type: "add", payload: { file, type: "debit" } })}
        >
          <Badge text="Debit" />

          <FileList files={debit} />
        </FileArea>
      </div>

      <div className={`${styles.charges} p-6 overflow-y-auto`}>
        <Badge text="Charges" />

        <div className="relative overflow-x-auto rounded-lg mt-4 border-gray-300 border-[1px]">
          <table className="w-full text-sm text-left table-auto">
            <thead className="text-xs uppercase bg-gray-200">
              <tr>
                <th scope="col" className="p-4">ID</th>
                <th scope="col" className="p-4">Description</th>
                <th scope="col" className="p-4">Date</th>
                <th scope="col" className="p-4">Value</th>
              </tr>
            </thead>

            <tbody>
              {
                state.charges.map((charge) => (
                  <tr key={charge[2]} className="border-b border-gray-300">
                    <td className="p-4">{charge.id}</td>
                    <td className="p-4">{charge.description}</td>
                    <td className="p-4">{charge.date}</td>
                    <td className="p-4">{charge.value}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
