// Mapeamento dos tipos de despesa
const tiposDespesa = { '1': 'Alimentação', '2': 'Educação', '3': 'Lazer', '4': 'Saúde', '5': 'Transporte' };

// Função para retornar o nome do tipo de despesa com base no número
function obterNomeDespesa(numeroTipo) {
    return tiposDespesa[numeroTipo] || 'Tipo não especificado';
}

// Função para somar despesas por tipo
function somarDespesasPorTipo(tipoSelecionado) { 
    let despesas = bd.recuperarTodosRegistros();
    let somarDespesasPorTipo = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };//alimentação,educação,lazer,saúde,transporte
    despesas.forEach(d => { 
        if( d.tipo === tipoSelecionado) {
           let valor= d.valor.replace('R$', '').replace('.', '').replace(',','.');
           somarDespesasPorTipo[d.tipo] += parseFloat(valor);
        }
    });

    return somarDespesasPorTipo;
}

// Função para somar todas as despesas de cada tipo
function somarTodasDespesas() { 
    let somaTotal = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };//alimentação,educação,lazer,saúde,transporte

    for(let tipo in somaTotal) {
        let somaTipo = somarDespesasPorTipo(tipo);
        somaTotal[tipo] = somaTipo[tipo];
    }

    return somaTotal;
}

// Função para preencher a tabela com a soma das despesas
function preencherTabelaSomaDespesas() { 
    let tipoSelecionado = document.getElementById('tipo').value;
    let soma;

    if(tipoSelecionado === 'somar tudo') { soma = somarTodasDespesas(); } else { soma = somarDespesasPorTipo(tipoSelecionado); }

    let corpoTabelaSomaDespesas = document.getElementById('corpoTabelaSomaDespesas');
    corpoTabelaSomaDespesas.innerHTML = '';
    let somaTotalDoTipo = 0

    for(let tipo in soma) { 
        if (soma[tipo] > 0) {
            let linha = corpoTabelaSomaDespesas.insertRow();
            linha.insertCell(0).innerHTML = obterNomeDespesa(tipo);
            linha.insertCell(1).innerHTML = parseFloat(soma[tipo]).toLocaleString('pt-BR', {
                style: 'currency', currency: 'BRL'});
                somaTotalDoTipo += soma[tipo];
        }
    }

    // Caso não tenha despesas
    if(somaTotalDoTipo === 0) {
        document.getElementById('modal_title_div').className = 'modal-header text-warning';
        document.getElementById('botao').className = 'btn btn-danger';
        document.getElementById('botao').innerHTML = 'Voltar';
        // Altere o título e o texto do corpo do modal
        document.getElementById('modal_title').innerText = 'Aviso';
        document.getElementById('texto-corpo').innerText = 'Não há despesas para o tipo selecionado.';
        
        // Exiba o modal
        $('#registraDespesas').modal('show');
    }
}
