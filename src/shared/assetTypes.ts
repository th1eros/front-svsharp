import type { VulnResponseDTO } from './vulnTypes'

export type AssetResponseDTO = {
  id: number
  nome: string
  // Permitimos number para o que vem do C# e string para o mapeamento
  tipo: 'OperatingSystem' | 'WebApplication' | 'Database' | 'API' | 'Network' | 'Other' | number
  ambiente: 'DEV' | 'HML' | 'PROD' | number
  descricao?: string
  habilitado: boolean
  createdAt: string
  vulnerabilities?: VulnResponseDTO[]
}

export type AssetCriacaoDTO = {
  nome: string
  tipo: 'OperatingSystem' | 'WebApplication' | 'Database' | 'API' | 'Network' | 'Other' | number
  ambiente: 'DEV' | 'HML' | 'PROD' | number
  descricao?: string
  habilitado: boolean // 👈 Adicionado para bater com o que o service envia
}

// Usamos Partial para facilitar a edição de campos específicos
export type EditarAssetDTO = Partial<AssetCriacaoDTO>