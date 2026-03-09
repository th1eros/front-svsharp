import { useState } from "react";
import { apiCatalog } from "../services/apiCatalog";

export default function ApiExplorer() {
  const [result, setResult] = useState<any>(null);

  async function run(endpoint: any) {
    try {
      const response = await endpoint.execute();
      setResult(response);
    } catch (err) {
      setResult(err);
    }
  }

  return (
    <div>
      <h1>API Explorer</h1>

      {Object.entries(apiCatalog).map(([group, endpoints]) => (
        <div key={group}>
          <h2>{group}</h2>

          {Object.entries(endpoints).map(([name, endpoint]: any) => (
            <button key={name} onClick={() => run(endpoint)}>
              {endpoint.method} {name}
            </button>
          ))}
        </div>
      ))}

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}