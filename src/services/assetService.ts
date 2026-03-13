import api from "./api";
import { apiCatalog } from "./apiCatalog";
import type { ResponseModel } from "../shared/ResponseModel";
import type { 
  AssetResponseDTO, 
  AssetCriacaoDTO, 
  EditarAssetDTO 
} from "../shared/assetTypes";

/**
 * [CTO + CISO] AssetService Padronizado 🚀
 * Implementando tratamento de erros e integração com o apiCatalog.
 */
export const assetService = {

  async listar(): Promise<AssetResponseDTO[]> {
    const response = await api.get<ResponseModel<AssetResponseDTO[]>>(
      apiCatalog.assets.listar.path
    );

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async buscarPorId(id: number): Promise<AssetResponseDTO> {
    const url = apiCatalog.assets.buscarPorId.path.replace("{id}", String(id));
    const response = await api.get<ResponseModel<AssetResponseDTO>>(url);

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async criar(dto: AssetCriacaoDTO): Promise<AssetResponseDTO> {
    const response = await api.post<ResponseModel<AssetResponseDTO>>(
      apiCatalog.assets.criar.path,
      dto
    );

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async editar(id: number, dto: EditarAssetDTO): Promise<AssetResponseDTO> {
    const url = apiCatalog.assets.editar.path.replace("{id}", String(id));
    const response = await api.put<ResponseModel<AssetResponseDTO>>(url, dto);

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  // [CTO] Implementação de Soft Delete usando a rota de Arquivar
  async arquivar(id: number): Promise<boolean> {
    const url = apiCatalog.assets.arquivar.path.replace("{id}", String(id));
    const response = await api.patch<ResponseModel<boolean>>(url);

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async restaurar(id: number): Promise<boolean> {
    const url = apiCatalog.assets.restaurar.path.replace("{id}", String(id));
    const response = await api.patch<ResponseModel<boolean>>(url);

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  }
};