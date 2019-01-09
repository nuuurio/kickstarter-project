# KickStarter Project

## Dev branch

### Content
- Contracts:
    - Campaign.sol
    - Proxy.sol
    - Simoleon.sol
- Tests:
    - Campaign.test.js
    - Proxy.test.js
- compile.js
- deploy.js

### Description
Proyecto de campañas estilo *KickStarter*. Los archivos `Campaign.sol` y `Campaign.test.js` son parecidos entre la rama **master** y la rama **dev**. 

En esta rama se intenta solventar el problema del bug con el contrato `Proxy.sol`. También se introduce el token *Simoleon (§)* para poder recompensar a los usuarios que han votado a favor de una campaña que ha salido exitosa. (Por ahora la implementación del pago de recompensas no está acabada).

### How to use
1. Clonar el repositorio en local.
2. Ejecutar el comando `npm install` en la carpeta.
3. Para ejecutar los tests: `npm run test`.
4. Para hacer deploy de los contratos: `npm run deploy` (La parte de hacer deploy del token está comentada, la `address` del token es 0xf4529e9159e44496670582991e981040719823ab).