# TDD Com NodeS

Este repositório demonstra na prática todos os conceitos básicos de uma aplicação simples, construída utilizando TDD (Test Driven Development ou Desenvolvimento Orientado a Testes). Vou falar sobre dois tipos de testes mais utilizados pelas grandes empresas de tecnologia: os testes unitários e os testes de integração. Além disso, vou mostrar as características e diferenças entre eles.

Reforço que o repositório é totalmente voltado para os conceitos básicos de TDD. Portanto, não focarei no uso de bancos de dados e bibliotecas; utilizarei apenas arquivos JSON simples e recursos básicos do Node.js.

## Conceitos

### Mocks:

Mocks são objetos fictícios que imitam o comportamento de objetos reais. No contexto de testes, eles são muito utilizados em testes unitários para facilitar o teste de pequenas partes do software sem precisar usar dados reais.

Por exemplo, suponha que precisamos fazer um teste que busca todos os itens. Se o nosso banco de dados tiver 1 milhão de registros, o teste vai demorar uma eternidade. Para resolver isso, utilizamos mocks, que copiam a estrutura dos dados reais e simplificam o retorno, tornando os testes mais rápidos e eficientes.

### Stubs:

Diferente dos mocks, stubs são objetos que copiam o comportamento de uma funcionalidade. Isso é muito útil quando precisamos testar uma parte do código que depende de uma funcionalidade externa. Utilizamos um stub quando não precisamos nos preocupar com a execução de um método, mas apenas com o resultado que ele retorna.

## Testes

### Teste Unitário:
Um teste unitário é uma técnica de teste de software que visa verificar o funcionamento correto de unidades individuais do código. Nesse tipo de teste, a unidade a ser testada é isolada e são fornecidas entradas específicas para verificar se a saída é a esperada. Isso ajuda a identificar erros e falhas precocemente, garantindo a qualidade do código.

### Teste de integraçÃo:

O teste de integração é uma etapa do processo de desenvolvimento de software em que módulos ou componentes são combinados e testados em conjunto. Esse tipo de teste visa verificar a eficiência e a segurança da comunicação entre os sistemas. Essa etapa é essencial para garantir que o software funcione sem erros de integração.
