# 🙏 Sistema de Crisma - Paróquia Sant'Ana Sousas

Sistema web desenvolvido em Next.js para gerenciamento e acompanhamento da preparação para o Sacramento da Crisma na Paróquia Sant'Ana Sousas.

## 📋 Sobre o Projeto

O **CrismaWeb** é uma plataforma digital que facilita a organização e acompanhamento da preparação para a Crisma, oferecendo:

- 👨‍🎓 **Inscrições de Crismandos**: Sistema completo para jovens de 14-17 anos se inscreverem
- 👨‍🏫 **Cadastro de Coordenadores**: Área para coordenadores se registrarem e gerenciarem turmas
- 📊 **Painel de Controle**: Interface administrativa para acompanhar turmas e crismandos
- 📅 **Gestão de Eventos**: Informações sobre retiros, missas e atividades especiais
- 📞 **Contato**: Canal direto para comunicação com a coordenação

## 🚀 Como Rodar a Aplicação

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
  - Baixe em: https://nodejs.org/
  - Verifique a instalação: `node --version`
- **npm** (geralmente vem com o Node.js)
  - Verifique a instalação: `npm --version`

### Instalação Passo a Passo

1. **Clone o projeto do GitHub**
   ```bash
   git clone https://github.com/turco-vic/FrontEnd-Crisma.git
   ```

2. **Navegue até a pasta do projeto**
   ```bash
   cd FrontEnd-Crisma
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```
   
   *Este comando pode demorar alguns minutos na primeira execução*
   
   Este comando irá instalar todas as bibliotecas necessárias:
   - Next.js 15.5.2 (Framework React)
   - React 18.3.1 (Biblioteca para interfaces)
   - Ant Design 5.27.2 (Componentes UI)
   - Axios 1.12.2 (Requisições HTTP)
   - React Icons 5.5.0 (Ícones)

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   
   *Aguarde a mensagem: "Ready - started server on 0.0.0.0:3000"*

5. **Acesse a aplicação no navegador**
   - URL: **http://localhost:3000**
   - A página será automaticamente redirecionada para `/home`
   - Se a porta 3000 estiver ocupada, o Next.js sugerirá outra porta

### ⚡ Comandos Rápidos (Para Usuários Experientes)

```bash
git clone https://github.com/turco-vic/FrontEnd-Crisma.git
cd FrontEnd-Crisma
npm install
npm run dev
```

Depois acesse: http://localhost:3000

### Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento com Turbopack
- `npm run build` - Cria a versão de produção
- `npm start` - Executa a versão de produção (após build)
- `npm run lint` - Executa a verificação de código

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Páginas da aplicação (App Router)
│   ├── home/              # Página inicial
│   ├── inscreverse/       # Seleção tipo de inscrição
│   ├── inscrevercrismando/ # Formulário crismando
│   ├── inscrevercoordenador/ # Formulário coordenador
│   ├── login/             # Página de login
│   ├── painel-controle/   # Dashboard administrativo
│   ├── contato/           # Página de contato
│   ├── sobre/             # Sobre a paróquia
│   └── saibamaisevento/   # Detalhes dos eventos
├── components/            # Componentes reutilizáveis
│   ├── Header.jsx         # Cabeçalho
│   ├── Footer.jsx         # Rodapé
│   └── Carousel.jsx       # Carrossel de imagens
└── styles/               # Estilos CSS Modules
```

## 🌐 Funcionalidades Principais

### Para Usuários Novos:

1. **Acessar o sistema**: Vá para http://localhost:3000
2. **Conhecer a paróquia**: Navegue pela página inicial (`/home`)
3. **Se inscrever**: Clique em "Inscrever-se" e escolha o tipo:
   - **Crismando**: Para jovens 14-17 anos
   - **Coordenador**: Para adultos que querem ajudar
4. **Fazer login**: Use a área de login para acessar funcionalidades específicas
5. **Entrar em contato**: Use a página de contato para dúvidas

### Para Administradores:

- Acesse o **Painel de Controle** para gerenciar turmas e crismandos
- Visualize relatórios e acompanhe o progresso dos grupos
- Gerencie eventos e atividades especiais

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca para interfaces
- **Ant Design** - Componentes UI
- **CSS Modules** - Estilização modular
- **React Icons** - Ícones
- **Axios** - Requisições HTTP

## 📝 Notas Importantes

- A aplicação redireciona automaticamente de `/` para `/home`
- Sistema responsivo, funciona em desktop e mobile
- Interface intuitiva e acessível
- Desenvolvido especificamente para a Paróquia Sant'Ana Sousas

## 📝 Informações do Repositório

- **GitHub**: https://github.com/turco-vic/FrontEnd-Crisma
- **Autor**: turco-vic
- **Branch Principal**: main
- **Licença**: Projeto privado

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

*Sistema de gerenciamento e acompanhamento da preparação para o Sacramento da Crisma*
