# projetofrontend
Projeto do Curso Futuro Digital - Desenvolvedor Front-End
Aqui será desenvolvido o PROJETO 3: FRONTEND (Portal do Aluno), cujo objetivo é criar uma interface onde o estudante envia textos e visualiza graficamente seu desempenho

Nome: Portal do Estudante - RevisãoOnline

Mês 1: Onboarding e Perfil
 Foco: O aluno entra e configura sua "casa".
 
 Entregáveis (Git):
 [✅] Setup: Vite + React Router Dom.
 [✅] Telas de Acesso: Login e Cadastro (com validação de campos).
 [✅] Tela de Perfil: Formulário onde ele escolhe o curso dos sonhos (Select box:
Medicina, Direito, Engenharia). Isso define o "tema" do dashboard.
 [✅] Componente de Proteção: Rota privada que só acessa com Token.


Mês 2: Sala de Redação
Foco: Ação principal de estudar.

Entregáveis (Git):
[✅] Lista de Redações: Card para cada redação enviada.
Visual: Badge Amarelo para "Em Correção" e Verde para "Corrigida (Nota:
920)".
[✅] Nova Redação: Formulário com campo de Título, Tema e um Textarea grande
para digitar o texto.
[✅] Integração: Conectar com o POST /essays da API.
[✅] Feedback Visual: Toast de sucesso ao enviar.


Mês 3: Dashboard de Evolução
Foco: Retenção e gamificação.

Entregáveis (Git):
[ ] Gráfico de Linha: Consumir a API para mostrar a evolução das notas nas últimas
5 redações.
[ ] Card de Meta: Mostrar visualmente o quão longe ele está da nota de corte (Ex:
Uma barra de progresso "850/900").
[ ] Responsividade: Garantir que o aluno consiga ver a nota pelo celular.
[✅ ] Deploy na Vercel: Link funcional. --> projetofrontend-ivory.vercel.app

Feito por Isadora Paiva de Mattos


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
