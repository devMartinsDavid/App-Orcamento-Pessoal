// Adicione o ano atual ao seu select
let anoAtual = new Date().getFullYear();

let selectAno = document.getElementById('ano');
let option = document.createElement('option');
option.value = anoAtual;
option.text = anoAtual;
selectAno.add(option);