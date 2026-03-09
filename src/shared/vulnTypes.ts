// src/shared/vulnTypes.ts

/**
 * @description Definição dos tipos de Vulnerabilidade 100% integrados ao Backend C#.
 * Usamos PascalCase nos nomes dos Tipos para seguir o padrão do DTO original.
 */

export type VulnResponseDTO = {
  id: number;
  titulo: string;
  ambiente: "DEV" | "HML" | "PROD";
  nivel: "Baixa" | "Media" | "Alta" | "Critica";
  status: "Ativa" | "Resolvida" | "Arquivada";
  createdAt: string;
};

export type VulnCriacaoDTO = {
  titulo: string;
  ambiente: "DEV" | "HML" | "PROD";
  nivel: "Baixa" | "Media" | "Alta" | "Critica";
  // Nota: O status geralmente é definido como "Ativa" pelo banco na criação.
};

export type EditarVulnDTO = {
  titulo?: string;
  ambiente?: "DEV" | "HML" | "PROD";
  nivel?: "Baixa" | "Media" | "Alta" | "Critica";
};