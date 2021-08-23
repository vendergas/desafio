# Desafio
- Construir um pequeno sistema para gestão de comércio com front end em Angular e back end em Node.js seguindo o modelo do diagrama abaixo
- Os pedidos devem possuir os status "novo pedido", "em andamento", "entregue", "cancelado".
- Ao marcar o pedido como entregue, deve-se abater a quantidade comprada do estoque.
- Ao cancelar o pedido, a quantidade abatida deve retornar ao estoque do produdo.

<img width="1200" src="https://i.ibb.co/SntDg5T/vendergas.png" alt="vendergas" border="0">

## O front end deve possuir:
- Tela de cadstro de usuário
- Tela de autenticação de usuário com opção para recuperação de senha por email
- Tela de cadastro e gerenciamento de empresas
- Tela de cadastro e gerenciamento de fornecedores
- Tela de cadastro e gerenciamento de produtos com opção para entrada no estoque do produto
- Tela de cadastro e gerenciamento de clientes
- Tela para lançamento de pedidos
- Tela para gerenciamento dos pedidos
- Documentação de setup do projeto (readme.md)
- Gitflow aplicado com o Code Review em cada passo, abrir uma feature/branch, criar no mínimo um pull request e fazer o merge com a Main(master deprecated), esse passo é importante para simular um trabalho em equipe e não fazer um "commitão" somente

## O back end deve possuir:
- Documentação de setup do projeto (readme.md)
- Aplicação e Banco de Dados estarem rodando em container (Docker, ...)
- Autenticação JWT em todas as rotas (endpoints) a PrivateKey deve ser VENDERGAS (passada por env var)
- Configurar a porta do webservice na porta 3000
- Gitflow aplicado com o Code Review em cada passo, abrir uma feature/branch, criar no mínimo um pull request e fazer o merge com a Main(master deprecated), esse passo é importante para simular um trabalho em equipe e não fazer um "commitão" somente
