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

1. **Clone ou baixe o projeto**
   ```bash
   # Se usando Git
   git clone <URL_DO_REPOSITORIO>
   
   # Ou baixe o arquivo ZIP e extraia
   ```

2. **Navegue até a pasta do projeto**
   ```bash
   cd FrontEnd-Final.Project.Individual
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```
   
   Este comando irá instalar todas as bibliotecas necessárias:
   - Next.js 15.5.2
   - React 18.3.1
   - Ant Design 5.27.2
   - Axios 1.12.2
   - React Icons 5.5.0

4. **Execute a aplicação em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   - Abra seu navegador
   - Acesse: http://localhost:3000
   - A página será redirecionada automaticamente para `/home`

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

## 🐛 Resolução de Problemas

**Erro de porta em uso:**
```bash
# Matar processo na porta 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <número_do_pid> /F
```

**Problemas com dependências:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

**Erro de permissão (Windows):**
- Execute o terminal como Administrador
- Ou use: `npm install --force`

---

Desenvolvido com ❤️ para a comunidade da Paróquia Sant'Ana Sousas
