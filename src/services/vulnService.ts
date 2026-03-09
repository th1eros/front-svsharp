import api from "./api";
import { apiCatalog } from "./apiCatalog";
import type { ResponseModel } from "../shared/ResponseModel";
import type {
  VulnResponseDTO,
  VulnCriacaoDTO,
  EditarVulnDTO
} from "../shared/vulnTypes";

export const vulnService = {

  async listar(): Promise<VulnResponseDTO[]> {
    const response = await api.get<ResponseModel<VulnResponseDTO[]>>(
      apiCatalog.vulns.listar.path
    );

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async buscarPorId(id: number): Promise<VulnResponseDTO> {
    const url = apiCatalog.vulns.buscarPorId.path.replace("{id}", String(id));

    const response = await api.get<ResponseModel<VulnResponseDTO>>(url);

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async criar(dto: VulnCriacaoDTO): Promise<VulnResponseDTO> {
    const response = await api.post<ResponseModel<VulnResponseDTO>>(
      apiCatalog.vulns.criar.path,
      dto
    );

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async editar(id: number, dto: EditarVulnDTO): Promise<VulnResponseDTO> {
    const url = apiCatalog.vulns.editar.path.replace("{id}", String(id));

    const response = await api.put<ResponseModel<VulnResponseDTO>>(
      url,
      dto
    );

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async arquivar(id: number): Promise<boolean> {
    const url = apiCatalog.vulns.arquivar.path.replace("{id}", String(id));

    const response = await api.patch<ResponseModel<boolean>>(url);

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  },

  async restaurar(id: number): Promise<boolean> {
    const url = apiCatalog.vulns.restaurar.path.replace("{id}", String(id));

    const response = await api.patch<ResponseModel<boolean>>(url);

    if (!response.data.status) {
      throw new Error(response.data.mensagem);
    }

    return response.data.dados;
  }
};