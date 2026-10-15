# 🍅 Pomonai App — Aplicativo de Dúvidas

> Aplicativo **React Native** onde o aluno do curso de Java digita uma dúvida e a envia, com um toque, para a **API Pomonai** (Spring Boot).

![React Native](https://img.shields.io/badge/React%20Native-App-61dafb)
![Plataformas](https://img.shields.io/badge/Plataformas-Web%20%7C%20Android%20%7C%20iOS-lightgrey)
![API](https://img.shields.io/badge/API-Spring%20Boot%20%3A8080-brightgreen)

---

## 📌 Sobre o projeto

O **Pomonai App** é o lado do aluno. Ele tem uma tela única com:

- o título **Pomonai APP**;
- um campo de texto para escrever a dúvida;
- o botão **Enviar**, que faz uma requisição `POST` para a API.

```
┌────────────────────┐   POST /duvida   ┌────────────────────┐   ┌──────────────────┐
│  Pomonai App       │ ───────────────► │  API de Dúvidas    │──►│ Banco relacional │
│  React Native :8081│ ◄─────────────── │  Spring Boot :8080 │   │                  │
└────────────────────┘   200 OK / erro  └────────────────────┘   └──────────────────┘
```

> 🔗 Este app depende da **API Pomonai**. Suba a API antes de testar o envio.

---

## 🧰 Pré-requisitos

- **Node.js** (versão LTS) — confira com `node -v`
- **npm** — confira com `npm -v`
- **Git**
- **VS Code** (ou outra IDE)
- A **API Pomonai** rodando em `http://localhost:8080`
- *(Opcional)* Android Studio, para usar o emulador Android

---

## 📥 Como obter o app

O código está no **perfil público do professor no GitHub**.

1. Acesse `https://github.com/<SEU-USUARIO>`
2. Abra o repositório do app: `https://github.com/<SEU-USUARIO>/<NOME-DO-REPOSITORIO-DO-APP>`
3. Clique em **Code** e copie a URL HTTPS.
4. Clone e entre na pasta:

```bash
git clone https://github.com/romulodf-cesar/pomonai-mobile.git
cd pomonai-mobile
```

---

## ▶️ Como executar

Instale as dependências:

```bash
npm install
```

Inicie o app (exemplo com Expo; use o comando do seu projeto, se for diferente):

```bash
npx expo start
```

O servidor de desenvolvimento (Metro) sobe na porta **8081**. No terminal, escolha onde abrir:

| Tecla | Ação                         |
|-------|------------------------------|
| `w`   | Abrir no navegador (Web)     |
| `a`   | Abrir no emulador Android    |
| `i`   | Abrir no simulador iOS (macOS) |

Ou escaneie o QR Code com o app **Expo Go** no celular.

---

## 🔌 Comunicação com a API

O envio acontece na função `enviarDuvida`:

```javascript
const response = await fetch('http://localhost:8080/duvida', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ duvida }),
});
```

| Item     | Valor                               |
|----------|-------------------------------------|
| URL      | `http://localhost:8080/duvida`      |
| Método   | `POST`                              |
| Cabeçalho| `Content-Type: application/json`    |
| Corpo    | `{ "duvida": "texto digitado" }`    |

> ⚠️ **Atenção ao nome do campo:** o corpo enviado pelo app deve ter o **mesmo nome** do atributo da classe `Duvida` na API. Se a API espera `mensagem`, troque no app para `JSON.stringify({ mensagem: duvida })`. Se os nomes forem diferentes, a dúvida chega vazia ou a API retorna erro.

### Qual endereço usar?

O `localhost` muda conforme onde o app está rodando:

| Onde o app roda                     | URL da API                  |
|-------------------------------------|-----------------------------|
| Navegador (Web)                     | `http://localhost:8080`     |
| Simulador iOS                       | `http://localhost:8080`     |
| Emulador **Android**                | `http://10.0.2.2:8080`      |
| Celular físico (mesma rede Wi-Fi)   | `http://<IP-DO-SEU-PC>:8080`|

Para descobrir o IP do computador no Windows, use `ipconfig` no terminal e procure o **IPv4**.

---

## 🧩 Estrutura do componente

| Elemento       | Função                                              |
|----------------|-----------------------------------------------------|
| `useState`     | Guarda o texto digitado na variável `duvida`        |
| `TextInput`    | Campo onde o aluno escreve (`onChangeText`)         |
| `Button`       | Dispara `enviarDuvida` ao ser pressionado           |
| `fetch`        | Envia a dúvida para a API                           |
| `Alert`        | Mostra mensagem de sucesso ou erro                  |
| `StyleSheet`   | Define o visual (fundo azul-marinho, campo e botão) |

---

## 🎨 Visual

- Fundo azul-marinho `#0a0d4c`
- Campo de texto em azul-escuro `#141a6b` com borda azul-clara `#4da3ff`
- Botão em azul `#2196f3`
- Título branco, em destaque

> 💡 O componente `Button` do React Native **ignora** a propriedade `style`. Para mudar a cor do botão, use `color="#2196f3"` ou troque por um `Pressable` com `<Text>` dentro.

---

## 🧪 Testando

1. Suba a **API** (`DuvidasApplication`, porta 8080).
2. Suba o **app** (`npx expo start`, porta 8081).
3. Digite uma dúvida e toque em **Enviar**.
4. Confira no navegador: `http://localhost:8080/duvida` — a dúvida deve aparecer na lista.

---

## 🛠️ Problemas comuns

| Sintoma | Possível causa | Solução |
|---------|----------------|---------|
| Alerta "Erro ao enviar dúvida" | API desligada ou endereço errado | Suba a API e confira a URL |
| `Network request failed` no Android | `localhost` aponta para o emulador | Use `10.0.2.2` |
| Erro de CORS no navegador | Origem `8081` não liberada na API | Adicione `@CrossOrigin(origins = "http://localhost:8081")` no controller |
| Dúvida salva vazia | Nome do campo diferente da API | Alinhe `duvida` com o atributo da entidade (ex.: `mensagem`) |
| Alerta de sucesso mesmo com erro da API | O app não verifica `response.ok` | Adicione `if (!response.ok) throw new Error()` após o `fetch` |

---

## 🚀 Próximos passos

- Validar o campo vazio antes de enviar
- Verificar `response.ok` para tratar erros da API
- Listar as dúvidas já enviadas (`GET /duvida`)
- Guardar a URL da API em uma constante ou variável de ambiente

---

## 📚 Tecnologias

- React Native
- React Hooks (`useState`)
- Fetch API
- API REST em Spring Boot

---

## 👨‍🏫 Autor

**Prof. Rômulo**
Instrutor de Inteligência Artificial —  SENAI Taguatinga

---
