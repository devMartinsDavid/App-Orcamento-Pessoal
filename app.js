class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }
    validarDados() {
        for (let i in this) {
            if (this[i] === undefined || this[i] === '' || this[i] === null) {
                return false;
            }
        }
        return true;
    }
}

// CONTROLE DE GRAVAÇÃO
class Bd {
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }
    // Recuperar dado dentro de localStorage
    getProximoId() {
        let proximoId = localStorage.getItem('id'); 
        return parseInt(proximoId) + 1;
    }
    // IMPLEMENTA A LÓGICA DE CONTROLE DE GRAVAÇÃO
    gravar(d) {
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(d));
        localStorage.setItem('id', id);
    }
    recuperarTodosRegistros() {
        let despesas = Array();
        let id = localStorage.getItem('id');
        // Recuperar todas as despesas cadastradas em localStorage
        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i));
            // Testar se existe a possibilidade de haver índices que foram pulados/removidos
            if (despesa === null) {
                continue;
                // O continue avança para a interação seguinte antes do push
            }
            despesa.id = i;
            despesas.push(despesa);
        }
        // Retornando esses valores para quem chamar a função despesas
        return despesas;
    }

    // Criando o Método Pesquisar
    Pesquisar(despesa) {
        let despesasFiltradas = Array();
        despesasFiltradas = this.recuperarTodosRegistros();
        if (despesa.ano !== '') {despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);}
        if (despesa.mes !== '') {despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);}
        if (despesa.dia !== '') {despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);}
        if (despesa.tipo !== '') {despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);}
        if (despesa.descricao !== '') {despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);}
        if (despesa.valor !== '') {despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);}
        return despesasFiltradas; // Lá no pesquisar terá a função que receberá esse retorno
    }
    // Criando o Método para Remover Despesas
    remover(id) {localStorage.removeItem(id);}
}

// Instanciando Bd
let bd = new Bd();

// Cadastrando despesas
function cadastrarDispesas() {
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor'); // Adicionando ponto e vírgula
    let despesa = new Despesa(
        ano.value,
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    );
    if (despesa.validarDados()) {
        bd.gravar(despesa);
        document.getElementById('modal_title').innerHTML = 'Registro inserido com sucesso!';
        document.getElementById('modal_title_div').className = 'modal-header text-success';
        document.getElementById('texto-corpo').innerHTML = 'A despesa foi cadastrada!!';
        document.getElementById('botao').className = 'btn btn-success';
        document.getElementById('botao').innerHTML = 'Voltar';

        $('#registraDespesas').modal('show');
        ano.value = '';
        mes.value = ''; 
        dia.value = ''; 
        tipo.value = ''; 
        descricao.value = ''; 
        valor.value = '';
    } else {
        document.getElementById('modal_title').innerHTML = 'Erro na inclusão do registro!';
        document.getElementById('modal_title_div').className = 'modal-header text-danger';
        document.getElementById('texto-corpo').innerHTML = 'Preencha todos os campos!';
        document.getElementById('botao').className = 'btn btn-danger';
        document.getElementById('botao').innerHTML = 'Voltar e corrigir';
        $('#registraDespesas').modal('show');
    }
}

// Função para carregar a lista de despesas
function carregarListaDespesas(despesas = Array(), filtro = false) {
    // Mapeamento dos tipos de despesa
    const tiposDespesa = {
        '1': 'Alimentação',
        '2': 'Educação',
        '3': 'Lazer',
        '4': 'Saúde',
        '5': 'Transporte'
    };

    // Função para retornar o tipo de despesa com base no número
    function obterTipoDespesa(numeroTipo) {
        return tiposDespesa[numeroTipo] || 'Tipo não especificado';
    }

    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros();
    }
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';
    despesas.forEach(function(d) {
        let linha = listaDespesas.insertRow();
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
        linha.insertCell(1).innerHTML = obterTipoDespesa(d.tipo); // Utilização da função de mapeamento
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = `${d.valor} R$`;

        let btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.id = `id_despesas_${d.id}`;
        btn.onclick = function() {
            let id = this.id.replace('id_despesas_', '');
            if (id) {
                bd.remover(id);
                document.getElementById('modal_title').innerHTML = 'Despesa!!';
                document.getElementById('modal_title_div').className = 'modal-header text-success';
                document.getElementById('texto-corpo').innerHTML = 'A despesa foi removida com sucesso !!';
                document.getElementById('botao').className = 'btn btn-success';
                document.getElementById('botao').innerHTML = 'Voltar';
                $('#registraDespesasRemover').modal('show');
            }
            document.getElementById('botao').onclick = function() { window.location.reload(); };
            document.getElementById('botao-fechar').onclick = function() { window.location.reload(); };
        };
        linha.insertCell(4).append(btn);
    });
}

// Função para pesquisar despesas
function pesquisarDespesas() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

    let despesas = bd.Pesquisar(despesa);
    carregarListaDespesas(despesas, true);
}
