# TDD Com NodeJS

Este repositório demonstra na prática todos os conceitos básicos de uma aplicação simples, construída utilizando TDD (Test Driven Development ou Desenvolvimento Orientado a Testes). Vou falar sobre dois tipos de testes mais utilizados pelas grandes empresas de tecnologia: os testes unitários e os testes de integração. Além disso, vou mostrar as características e diferenças entre eles.

Reforço que o repositório é totalmente voltado para os conceitos básicos de TDD. Portanto, não focarei no uso de bancos de dados e bibliotecas; utilizarei apenas arquivos JSON simples e recursos básicos do Node.js.

## Conceitos

### TDD:
TDD ou Desenvolvimento orientado a teste, é o desenvolvimento de teste antes do desenvolvimento do método ou funcionalidade do software. O tdd funciona em ciclos que ocorrem na seguinte ordem:

- Primeiro, desenvolvemos o teste, seguindo as regras de negócio que o método deve ter. Esse primeiro teste irá falhar, pois a funcionalidade ainda não existe.
- Segundo, desenvolvemos a função, fazemos o minimo que a função precisa, para o teste passar.
- Terceiro, refatoramos e melhoramos nosso código para seguir regras e padrÕes de legibilidade.
  
### Mocks:

Mocks são objetos fictícios que imitam o comportamento de objetos reais. No contexto de testes, eles são muito utilizados em testes unitários para facilitar o teste de pequenas partes do software sem precisar usar dados reais.

Por exemplo, suponha que precisamos fazer um teste que busca todos os itens. Se o nosso banco de dados tiver 1 milhão de registros, o teste vai demorar uma eternidade. Para resolver isso, utilizamos mocks, que copiam a estrutura dos dados reais e simplificam o retorno, tornando os testes mais rápidos e eficientes.

![image](https://github.com/RafaelSilva-si/node-test-drive-development-tdd/assets/77937182/02e17ec1-a184-4900-9b65-7a587eb1dd47)

No teste unitário, eu crio mocks pegando arquivos json que segue a estrutura do objeto real.

### Stubs:

Diferente dos mocks, stubs são objetos que copiam o comportamento de uma funcionalidade. Isso é muito útil quando precisamos testar uma parte do código que depende de uma funcionalidade externa. Utilizamos um stub quando não precisamos nos preocupar com a execução de um método, mas apenas com o resultado que ele retorna.

![image](https://github.com/RafaelSilva-si/node-test-drive-development-tdd/assets/77937182/75d9cfb1-74a4-45b9-98e3-f902b13b46ff)

Aqui eu stubei o retorno do método `getAll` da classe `BaseRepository` utilizando a lib Sinon, que vai resolver retornando um mock, assim conseguimos imitar o comportamento do metodo, sem que executemos ele.

## Testes

### Teste Unitário:
Um teste unitário é uma técnica de teste de software que visa verificar o funcionamento correto de unidades individuais do código. Nesse tipo de teste, a unidade a ser testada é isolada e são fornecidas entradas específicas para verificar se a saída é a esperada. Isso ajuda a identificar erros e falhas precocemente, garantindo a qualidade do código.

![image](https://github.com/RafaelSilva-si/node-test-drive-development-tdd/assets/77937182/766d1a74-f768-4d98-bcfb-5798b7d08b15)

Aqui estou usando stub e mock para imitar o comportamento do método `add` da classe `BaseRepository`, assim consigo ter o retorno e testar sem que adicione o item no banco.

![image](https://github.com/RafaelSilva-si/node-test-drive-development-tdd/assets/77937182/927c5c11-ce30-4662-86bc-0ddfb638a581)

Aqui é um teste que espera um erro caso um valor seja passado incorreto, ou qualquer erro que estoure no app.

### Teste de integração:

O teste de integração é uma etapa do processo de desenvolvimento de software em que módulos ou componentes são combinados e testados em conjunto. Esse tipo de teste visa verificar a eficiência e a segurança da comunicação entre os sistemas. Essa etapa é essencial para garantir que o software funcione sem erros de integração.

![image](https://github.com/RafaelSilva-si/node-test-drive-development-tdd/assets/77937182/70a16958-538e-4a47-81ac-578f351f49c3)

## Para rodar o projeto:
1 - Clone este projeto.
2 - Instale as deps com `npm i` ou `yarn` (Utilize `Node V18`)
3 - Rode os teste com `yarn test:dev` ou `npm test:dev`.

![1627616883421](https://user-images.githubusercontent.com/77937182/157932279-c8aad7d0-0778-43c0-be52-b7e175d56835.gif)
