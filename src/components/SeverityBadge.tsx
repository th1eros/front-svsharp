import type { CSSProperties } from "react";

type Nivel = "Baixa" | "Media" | "Alta" | "Critica";

type Props = {
  nivel: Nivel;
};

export default function SeverityBadge({ nivel }: Props) {
  const colorMap: Record<Nivel, string> = {
    Baixa: "#198754",     // verde mais escuro
    Media: "#ffc107",     // amarelo padrão
    Alta: "#fd7e14",      // laranja mais vibrante
    Critica: "#dc3545"    // vermelho padrão
  };

  const style: CSSProperties = {
    backgroundColor: colorMap[nivel],
    color: "#dd1919",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    display: "inline-block"
  };

  return <span style={style}>{nivel}</span>;
}