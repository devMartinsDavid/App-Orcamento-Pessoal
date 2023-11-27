let dataHoje = new Date();
let dia = String(dataHoje.getDate()).padStart(2, '0');
let mes = String(dataHoje.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0 em JavaScript
let ano = dataHoje.getFullYear();

let dataFormatada = ano + '-' + mes + '-' + dia;

document.getElementById('data').value = dataFormatada;