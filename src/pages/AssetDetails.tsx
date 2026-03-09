import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assetService } from "../services/assetService";
import { vulnService } from "../services/vulnService";

import type { AssetResponseDTO } from "../shared/assetTypes";
import type { VulnResponseDTO } from "../shared/vulnTypes";

export default function AssetDetails() {
  const { id } = useParams<{ id: string }>();

  const [asset, setAsset] = useState<AssetResponseDTO | null>(null);
  const [vulns, setVulns] = useState<VulnResponseDTO[]>([]);

  useEffect(() => {
    if (!id) return;

    loadData();
  }, [id]);

  const loadData = async () => {
    const assetData = await assetService.buscarPorId(Number(id));
    setAsset(assetData);

    const allVulns = await vulnService.listar();

    // Ajuste aqui caso seu backend retorne vulnerabilidades vinculadas no asset
    setVulns(allVulns);
  };

  const handleAdd = async (vulnId: number) => {
    await assetService.adicionarVuln(Number(id), vulnId);
    await loadData();
  };

  const handleRemove = async (vulnId: number) => {
    await assetService.removerVuln(Number(id), vulnId);
    await loadData();
  };

  if (!asset) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Asset: {asset.nome}</h2>

      <h3>Vulnerabilidades</h3>

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Nível</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {vulns.map((v) => (
            <tr key={v.id}>
              <td>{v.titulo}</td>
              <td>{v.nivel}</td>
              <td>
                <button onClick={() => handleAdd(v.id)}>
                  Vincular
                </button>

                <button onClick={() => handleRemove(v.id)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}