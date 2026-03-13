// Arquivo: src/shared/ResponseModel.ts
export interface ResponseModel<T> {
  dados: T;
  mensagem: string;
  status: boolean;
}

// O que seria o "LoginResponse" (específico para o seu AuthController)
export interface LoginResponse {
  token: string;
}

// O que seria o "AssetResponseDTO"
export interface Asset {
  id: number;
  nome: string;
  tipo: "OperatingSystem" | "WebApplication" | "Database" | "API" | "Network" | "Other";
  ambiente: "DEV" | "HML" | "PROD";
  habilitado: boolean;
  createdAt: string;
}

// O que seria o "VulnResponseDTO"
export interface Vuln {
  id: number;
  titulo: string;
  ambiente: "DEV" | "HML" | "PROD";
  nivel: "Baixa" | "Media" | "Alta" | "Critica";
  status: "Ativa" | "Resolvida" | "Arquivada";
  createdAt: string;
}

// Tabela de Ligação (Relacionamento N:N)
export interface AssetVuln {
  assetId: number;
  vulnId: number;
  createdAt: string;
  asset?: Asset;
  vuln?: Vuln;
}