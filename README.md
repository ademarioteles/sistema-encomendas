<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

# 🏢 Condominium Management

<code><img height="20" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"></code>
<code><img height="20" src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white"></code>
<code><img height="20" src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white"></code>

O projeto consiste em criar um aplicativo para um condomínio que permita aos inquilinos verificarem a existência de encomendas na portaria. Os usuários serão identificados por CPF e número do apartamento, e haverá três perfis de acesso: inquilinos, porteiros e síndicos. O sistema permitirá a gestão de apartamentos, inquilinos, encomendas e usuários, com permissões diferenciadas para cada tipo de usuário. O back-end será desenvolvido com o JSON Server.

## 🚀 Começando

Essas instruções irão ajudá-lo a obter uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Para desenvolver a atividade utilizando Quasar, é necessário ter conhecimento em HTML, CSS e Vue.js. Além disso, é preciso estar familiarizado com a utilização do Quasar Framework e do JSON Server para construir o back-end da aplicação.

```
HTML,
CSS,
Quasar
Vue.js

```

### 🔧 Instalação

Siga estas etapas para configurar o ambiente de desenvolvimento:

**Instale e execute o JSON Server:**

```bash

npm install -g json-server

```

**Execute o servidor JSON com o arquivo 'db.json':**

```bash

json-server --watch db.json

```

**Instale as dependências do projeto:**

```bash

#É necessario esta dentro da pasta do projeto para rodar o comando

npm install
```

**Execute o projeto:**

```bash

#É necessario esta dentro da pasta do projeto para rodar o comando._

npm run dev
```

## Acesso ao Sistema

Abaixo estão os detalhes dos usuários registrados no sistema:

**SINDICO**

CPF: 000.000.000-34
Código de Acesso: 010101

**PORTEIRO**

CPF: 000.000.000-35
Chave de Acesso: 5555

**INQUILINO**

CPF: 000.000.000-25
Numero do Apartamento: 105F

**Instruções de Acesso**

Abra o navegador da web de sua preferência.
Acesse a página de login do sistema.
Insira suas credenciais de acesso conforme as informações fornecidas acima.
Se você é um síndico ou porteiro, insira seu CPF e código de acesso. Se você é um inquilino, insira apenas seu CPF.
Clique no botão de login para acessar o sistema.
Certifique-se de usar as credenciais corretas para acessar o sistema com os privilégios apropriados. Em caso de dúvidas ou problemas de acesso, entre em contato com o suporte técnico.

## 🛠️ Construído com

Principais ferramentas utilizadas na construção do projeto:

- [Quasar](https://quasar.dev/)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [Visual Studio Code](https://code.visualstudio.com)
- [App.vue](https://vuejs.org)
- [Git](https://docs.github.com/pt/account-and-profile)

## 💡 Recursos Adicionais

Aqui estão alguns recursos adicionais que podem ser implementados ou explorados:

- **Notificações de entrega**: Implemente um sistema de notificações para que os inquilinos sejam alertados quando uma nova encomenda chegar à portaria.

- **Comunicação interna:** Crie um recurso de comunicação interna, como um mural de recados, para que os moradores possam se comunicar entre si e com a administração do condomínio.

- **Relatórios e estatísticas:** Desenvolva funcionalidades que gerem relatórios e estatísticas sobre o uso do aplicativo e as atividades do condomínio.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Se você tiver alguma ideia, sugestão ou encontrou algum problema no projeto, sinta-se à vontade para abrir uma nova issue ou enviar um pull request.
