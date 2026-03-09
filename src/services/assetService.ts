import api from "./api";
import { apiCatalog } from "./apiCatalog";

import type { ResponseModel } from "../shared/ResponseModel";
import type {
  AssetResponseDTO,
  AssetCriacaoDTO,
  EditarAssetDTO
} from "../shared/assetTypes";

export const assetService = {

  async listar(): Promise<AssetResponseDTO[]> {
    const { method, path } = apiCatalog.assets.listar;

    const response = await api.request<ResponseModel<AssetResponseDTO[]>>({
      method,
      url: path
    });

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async buscarPorId(id: number): Promise<AssetResponseDTO> {
    const { method, path } = apiCatalog.assets.buscarPorId;

    const url = path.replace("{id}", String(id));

    const response = await api.request<ResponseModel<AssetResponseDTO>>({
      method,
      url
    });

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async criar(dto: AssetCriacaoDTO): Promise<AssetResponseDTO> {
    const { method, path } = apiCatalog.assets.criar;

    const response = await api.request<ResponseModel<AssetResponseDTO>>({
      method,
      url: path,
      data: dto
    });

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async editar(id: number, dto: EditarAssetDTO): Promise<AssetResponseDTO> {
    const { method, path } = apiCatalog.assets.editar;

    const url = path.replace("{id}", String(id));

    const response = await api.request<ResponseModel<AssetResponseDTO>>({
      method,
      url,
      data: dto
    });

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async arquivar(id: number): Promise<boolean> {
    const { method, path } = apiCatalog.assets.arquivar;

    const url = path.replace("{id}", String(id));

    const response = await api.request<ResponseModel<boolean>>({
      method,
      url
    });

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async restaurar(id: number): Promise<boolean> {
    const { method, path } = apiCatalog.assets.restaurar;

    const url = path.replace("{id}", String(id));

    const response = await api.request<ResponseModel<boolean>>({
      method,
      url
    });

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async adicionarVuln(assetId: number, vulnId: number): Promise<AssetResponseDTO> {
    const { method, path } = apiCatalog.assets.adicionarVuln;

    const url = path
      .replace("{id}", String(assetId))
      .replace("{vulnId}", String(vulnId));

    const response = await api.request<ResponseModel<AssetResponseDTO>>({
      method,
      url
    });

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async removerVuln(assetId: number, vulnId: number): Promise<boolean> {
    const { method, path } = apiCatalog.assets.removerVuln;

    const url = path
      .replace("{id}", String(assetId))
      .replace("{vulnId}", String(vulnId));

    const response = await api.request<ResponseModel<boolean>>({
      method,
      url
    });

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  }

};