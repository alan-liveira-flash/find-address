// const axios = require('axios')
async function getAddressToFromCep(cepValue: string) {
  if (!cepValue) throw new Error('Cep vazio');
  if (cepValue.length !== 8 && cepValue.length !== 9)
    throw new Error('Cep inválido');

  const url = `http://viacep.com.br/ws/${cepValue}/json`;
  const response = await fetch(url);
  const status = await response.status;
  const data = await response.json();

  console.log(data);
  if (status !== 200 || data.hasOwnProperty('erro'))
    throw new Error('Erro na busca do cep');
  return data;
}

export { getAddressToFromCep };
