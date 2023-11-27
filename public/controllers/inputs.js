function formatarValor(event) {
   let input = event.target; 
   let valor = input.value.replace(/[^\d]/g, ''); //remove tudo que nõ é digito

   valor = (valor / 100).toFixed(2);//Obtendo centavos
   //formatando pra Brasil
   valor = parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}); 
   input.value = valor;
}