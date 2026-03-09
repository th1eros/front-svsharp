# SVsharp Frontend

Interface web do **SVsharp** para gestão de:

* Assets
* Vulnerabilidades
* Autenticação
* Exploração da API

A aplicação consome a **API SVsharp**, que é a **fonte da verdade do sistema**.

---

# 📌 Visão do Projeto

SPA desenvolvida com:

* React
* TypeScript
* Vite

Funcionalidades principais:

* Dashboard operacional
* Gestão de Assets
* Gestão de Vulnerabilidades
* Relação Asset ↔ Vulnerabilidade
* Autenticação JWT
* API Explorer

---

# 🏗 Arquitetura

Camadas do frontend:

Pages → Telas da aplicação
Components → Componentes reutilizáveis
Services → Comunicação com API
Shared → Tipos e layouts
Theme → Padronização visual

Fluxo:

Pages
↓
Components
↓
Services
↓
API SVsharp

---

# 🔐 Segurança

Autenticação baseada em **JWT emitido pela API**.

Fluxo:

1. Login
2. API retorna JWT
3. Token armazenado no client
4. Requisições utilizam:

Authorization: Bearer {token}

---

# 📂 Estrutura do Projeto

```
frontend
│
├── main.tsx
├── App.tsx
│
├── components
│   └── SeverityBadge.tsx
│
├── pages
│   ├── Dashboard.tsx
│   ├── Assets.tsx
│   ├── AssetDetails.tsx
│   ├── Vulns.tsx
│   ├── ApiExplorer.tsx
│   └── Login.tsx
│
├── services
│   ├── api.ts
│   ├── assetService.ts
│   ├── vulnService.ts
│   └── authService.ts
│
└── shared
    ├── Contracts
    ├── layout
    └── theme
```

---

# ⚙️ Execução

Instalar dependências

npm install

Executar ambiente de desenvolvimento

npm run dev

Servidor local

http://localhost:5173

---

# 📊 Status

Frontend funcional e integrado à **API SVsharp**.
Estrutura preparada para evolução do sistema.
