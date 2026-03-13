import api from './api';

// [CIO] Interface atualizada para suportar os status de severidade do Dashboard
export interface Asset {
  id: number;
  name: string;
  type: string;
  status: string;
  isActive: boolean;
}

export interface AssetResponseDTO {
  id: number;
  nome: string;
  tipo: string;
  ambiente: "DEV" | "HML" | "PROD";
  descricao?: string;
  habilitado: boolean;
  createdAt: string;
}

export interface AssetCriacaoDTO {
  nome: string;
  tipo: string;
  ambiente: "DEV" | "HML" | "PROD";
  descricao?: string;
}

export interface EditarAssetDTO {
  nome?: string;
  tipo?: string;
  ambiente?: "DEV" | "HML" | "PROD";
  descricao?: string;
  habilitado?: boolean;
}

export const assetService = {
  // [CTO] GET /api/assets
  async listar(): Promise<AssetResponseDTO[]> {
    const response = await api.get<AssetResponseDTO[]>('/api/assets');
    return response.data;
  },

  // [CTO] GET /api/assets/{id}
  async buscarPorId(id: number): Promise<AssetResponseDTO> {
    const response = await api.get<AssetResponseDTO>(`/api/assets/${id}`);
    return response.data;
  },

  // [CISO] POST /api/assets
  async criar(dto: AssetCriacaoDTO): Promise<AssetResponseDTO> {
    const response = await api.post<AssetResponseDTO>('/api/assets', dto);
    return response.data;
  },

  // [CTO] PUT /api/assets/{id}
  async editar(id: number, dto: EditarAssetDTO): Promise<AssetResponseDTO> {
    const response = await api.put<AssetResponseDTO>(`/api/assets/${id}`, dto);
    return response.data;
  },

  // [CTO] DELETE /api/assets/{id} (Soft Delete)
  async arquivar(id: number): Promise<void> {
    await api.delete(`/api/assets/${id}`);
  },

  // [CTO] PATCH /api/assets/{id}/restore
  async restaurar(id: number): Promise<void> {
    await api.patch(`/api/assets/${id}/restore`);
  },

  // [CTO] POST /api/assets/{id}/vulns/{vulnId}
  async adicionarVuln(assetId: number, vulnId: number): Promise<void> {
    await api.post(`/api/assets/${assetId}/vulns/${vulnId}`);
  },

  // [CTO] DELETE /api/assets/{id}/vulns/{vulnId}
  async removerVuln(assetId: number, vulnId: number): Promise<void> {
    await api.delete(`/api/assets/${assetId}/vulns/${vulnId}`);
  },

  // Método legado (para compatibilidade)
  async getAll(): Promise<Asset[]> {
    const response = await api.get<Asset[]>('/api/assets');
    return response.data;
  }
};