# Pilhado Track - API de Rastreamento

Uma API simples para rastreamento de visitantes, parte do projeto Elon Watches Emporium.

## 📋 Descrição

Este projeto implementa uma API de rastreamento que recebe dados de visitantes através de requisições POST. A API é projetada para ser deployada na Vercel e atualmente registra os dados recebidos no console, com possibilidade de integração futura com bancos de dados como Redis ou Supabase.

## 🚀 Funcionalidades

- ✅ Endpoint POST para recebimento de dados de tracking
- ✅ Validação de `visitor_id` obrigatório
- ✅ Tratamento de erros robusto
- ✅ Logs estruturados para monitoramento
- 🔄 Preparado para integração com bancos de dados

## 📁 Estrutura do Projeto

```
pilhado-track/
├── api/
│   └── track-pressel.js    # Endpoint principal de tracking
├── package.json            # Configurações do projeto
└── README.md              # Este arquivo
```

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Vercel** - Plataforma de deploy
- **ES Modules** - Sintaxe moderna de módulos

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/elon-watches-emporium.git
cd elon-watches-emporium/pilhado-track
```

2. Instale as dependências (se houver):
```bash
npm install
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

2. Faça o deploy:
```bash
vercel
```

3. Siga as instruções no terminal para configurar o projeto.

## 📖 Uso da API

### Endpoint de Tracking

**POST** `/api/track-pressel`

Registra dados de rastreamento de visitantes.

#### Parâmetros

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `visitor_id` | string | ✅ | ID único do visitante |

#### Exemplo de Requisição

```javascript
fetch('/api/track-pressel', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    visitor_id: 'user_123456',
    // outros dados opcionais podem ser incluídos
  })
});
```

#### Respostas

**Sucesso (200)**
```json
{
  "ok": true
}
```

**Erro - Método não permitido (405)**
```json
{
  "error": "Method not allowed"
}
```

**Erro - visitor_id ausente (400)**
```json
{
  "error": "Missing visitor_id"
}
```

**Erro interno (500)**
```json
{
  "error": "Internal Server Error"
}
```

## 🔧 Desenvolvimento

### Executar localmente

Para desenvolvimento local com a Vercel CLI:

```bash
vercel dev
```

A API estará disponível em `http://localhost:3000/api/track-pressel`

### Estrutura do Código

O arquivo principal `api/track-pressel.js` implementa:

- Validação de método HTTP (apenas POST)
- Validação de dados obrigatórios
- Logging estruturado
- Tratamento de erros

## 🔮 Próximos Passos

- [ ] Integração com banco de dados (Redis/Supabase)
- [ ] Implementação de autenticação
- [ ] Métricas e analytics
- [ ] Rate limiting
- [ ] Validação de schema mais robusta

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto faz parte do Elon Watches Emporium. Consulte o repositório principal para informações de licença.

## 📞 Suporte

Para dúvidas ou suporte, abra uma issue no repositório principal do projeto.

---

**Parte do projeto Elon Watches Emporium** 🕰️