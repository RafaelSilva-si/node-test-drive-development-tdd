# Use Cases

## Adição de item:
- Testar a adição de um novo item ao inventário com informações completas (nome, quantidade disponível, preço unitário e descrição opcional).
- Testar a adição de um item sem descrição opcional.
- Testar a adição de um item com quantidade disponível negativa.
- Testar a adição de um item com preço unitário negativo.
- Testar a adição de um item com nome duplicado.

## Remoção do item:
-Testar a remoção de um item existente no inventário.
-Testar a tentativa de remoção de um item que não existe no inventário.

## Atualização de Quantidade Disponível:
- Testar a atualização da quantidade disponível de um item existente para um valor maior.
- Testar a atualização da quantidade disponível de um item existente para um valor menor.
- Testar a atualização da quantidade disponível de um item inexistente no inventário.
- Testar a atualização da quantidade disponível de um item para um valor negativo.

## Atualização de Preço Unitário:
- Testar a atualização do preço unitário de um item existente para um valor positivo.
- Testar a atualização do preço unitário de um item existente para um valor zero.
- Testar a atualização do preço unitário de um item inexistente no inventário.
- Testar a atualização do preço unitário de um item para um valor negativo.

## Validações Adequadas
- Testar se a quantidade disponível de um item não se torna negativa após adição e atualização.
- Testar se o preço unitário de um item não se torna negativo após adição e atualização.