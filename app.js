//criando uma Class que representará nosso Objeto DESPESAS

class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        //atributos
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    //ações
    validarDados() {
        for (let i in this) {//percorre cada um dos elementos do Objeto//ou Array, a variável i recupera cada atributo this do Objeto Despesa.
            if (this[i] == undefined || this[i] == '' || this[i] == null ) { /// operador || ou
                //se for qualquer um desses valores
                return false
            }
        }
        //se não for nenhum desses valores
        return true
    }
}
//Objeto modal


////////////////////// INDICES DINÂMICOS PARA NÃO SOBREPOR REGISTROS /////////////////////
//CONTROLE DE GRAVAÇÃO
class Bd {
    //verificar se a informação existe
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0) //iniciar um valor pra Id quando essa informação nã oexistir dentro de LocalStorage
        } //o fluxo que seguiria seria o do else, pq o valor já não é null
    }
    //lógica
    //Recuperar dado dentro de localStoge
    getProximoId() {
        let proximoId = localStorage.getItem('id') // retorna null se o Objeto não existir
        return parseInt(proximoId) + 1 //retornará +1 sempre que adicionado ent fica, se tiver 1, retorna 2, se 2, retorna 3 etc
    }
    /// gravar passa ser um método do Objeto Bd

    //IMPLEMENTA A LÓGICA DE CONTROLE DE GRAVAÇÃO
    gravar(d) {//recebendo Objeto Literal dentro da função gravar ////////AQUI É O MOMENTO DE GRAVAÇÃO DAS INFORMAÇÕES NO localStorage
        //localStorage.setItem('despesa', JSON.stringify(d))

        //definindo id dentro da função gravar, senão não tem como acessar Id
        let id = this.getProximoId()
        //após isso
        localStorage.setItem(id, JSON.stringify(d)) //convertendo o gravação

        localStorage.setItem('id', id) //adicionando +! relação id string e varriável id

    }
    recuperarTodosRegistros() {

        //Array de despesas
        let despesas = Array()

        //definindo variáveis para referenciar as chamadas no local Sstorage
       let id = localStorage.getItem('id')
       //recuperar todas as despesas cadastradas em localStorage
       for (let i = 1; i <= id; i++) { //a variável i, recupera um a um, os elementos contidos dentro de localStorage

        //recuperar o documento dentro do seu respectivo id por meio do i
        //recuperar a despesa // e convertendo o JSON para Objeto Literal, para posteriomente serem utilizados como elemento do Js. comando parse()
        let despesa = JSON.parse(localStorage.getItem(i))

        //testar se existe a possibilidade de haver índices que foram pulados/removidos
        //nessas casos, nós iremos pular essses índeces
        if (despesa === null) {
            continue
            //o continue avança para a interação seguinte antes do push
        }

        //colocando o Id nas despesas para referenciar na criação de remoção de despesas(buttom). Então, dentro da Lista de Despesa um atributo Id será incluso na lista de despesas...
        despesa.id = i
        //chamando o Array despesas e adicionando-os em uma Array
        despesas.push(despesa)
       }
       //retornando esses valores para quem charmar a função despesas
       return despesas // significa isso tudo dentro dessa função 
    }

    //Criando o Método Pesquisar
    Pesquisar(despesa) {
        //chamar o método de  recuperarTodosRegistros para economizar códigos
        //atribua uma variável em forma de array a ele para facilitar a chamada 
        let despesasFiltradas = Array ()
        despesasFiltradas = this.recuperarTodosRegistros()

        //verificar se cada um dos registros de desepesas batem com registros desse Objeto para ver se ele deve ou não voltar para nossa Tabela 
        //ano 
        //Antes de pesquisar precisa ver se despesa.ano é diferente de vazio 
        if(despesa.ano != ''){// se for diferente se vazio eu aplico o filtro, senão eu não aplico 

            //filtro
            //sobreponha o valor do Array, original ATENÇÃAAO . d é função de callback
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes
        if(despesa.mes != ''){// se for diferente se vazio eu aplico o filtro, senão eu não aplico 

            //filtro
            //sobreponha o valor do Array, original ATENÇÃAAO 
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
           
        }
        //dia
        if(despesa.dia != ''){// se for diferente se vazio eu aplico o filtro, senão eu não aplico 

            //filtro
            //sobreponha o valor do Array, original ATENÇÃAAO 
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        //tipo
        if(despesa.tipo != ''){// se for diferente se vazio eu aplico o filtro, senão eu não aplico 

            //filtro
            //sobreponha o valor do Array, original ATENÇÃAAO 
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //descricao
        if(despesa.descricao != ''){// se for diferente se vazio eu aplico o filtro, senão eu não aplico 

            //filtro
            //sobreponha o valor do Array, original ATENÇÃAAO 
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        //valor
        if(despesa.valor != ''){// se for diferente se vazio eu aplico o filtro, senão eu não aplico 

            //filtro
            //sobreponha o valor do Array, original ATENÇÃAAO 
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        
        return despesasFiltradas //lá no pesquisar terá a função que receberá esse retorno
    }

    //CRIANDO O METRODO REMOVER DESPESAS
    remover(id) {
        //recupera o ID e executa a função de remoção do item em localStorage. (Toda despesa tem uma number id único e não se repete, se nnão tiver não é lido)
        localStorage.removeItem(id)
    }
}

//Intanciando Bd
let bd = new Bd()


///Cadastrando despesas

function cadastrarDispesas() { //está no onclick do buttom+

    //referenciando seleção através de variáveis, primeiro define getElementById e define como variável
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')

    
    //confirmando se estamos recebendo todos os valores do nosso cadastro. Não defina .value no getElement pq talvez mais na frente a gente pode precisar recuperar a variável de fato e vira o valor dela. 
    //console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value) //funcionou!! faz a mesma coisa na instância
    
    //INSTANCIANDO O OBJETO DESPESAS
    let despesa = new Despesa(
        ano.value,
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )
    //Validação de dados tem que ser feita antes de gravar, por isso tem que ser aqui, ou seja, gravar depende da validação
    if (despesa.validarDados()) {//pode ser feito com true ou false
        //chamando a função//método gravar do Objeto Bd para o que eu quero que seja salvo
        bd.gravar(despesa)
        //se verdade dialog success
        //console.log('dados validos')
        //jquary, a ação do botão está sendo feita de modo programático, agora não precisa mais da tag button do modal lá no index.html
        //Note que é referenciado pelo ID
        //alterando o a mensagem erro
        document.getElementById('modal_title').innerHTML = 'Registro inserido com sucesso!'
        document.getElementById('modal_title_div').className = 'modal-header text-success'
        document.getElementById('texto-corpo').innerHTML = 'A despesa foi cadastrada!!'
        document.getElementById('botao').className = 'btn btn-success'
        document.getElementById('botao').innerHTML = 'Voltar'

        //configurando modal dados válidos
        $('#registraDespesas').modal('show')

        //Limpar campos de dados após sucesso de gravação. Ou seja limpar os VALORES ADICIONADOS
        //como os valores já foram chamados lá encima a gente não precisa chamar de novo pelo dom
        /*
        document.getElementById('ano').value = ''
        document.getElementById('mes').value = ''
        document.getElementById('dia').value = ''
        document.getElementById('tipo').value = ''
        document.getElementById('descricao').value = ''
        document.getElementById('valor').value = ''
        */
        //então fica assim:
        ano.value = ''
        mes.value = '' 
        dia.value = '' 
        tipo.value = '' 
        descricao.value = '' 
        valor.value = ''

    }else{
        //se falso dialog error
        //jquary, a ação do botão está sendo feita de modo programático, agora não precisa mais da tag button do modal lá no index.html
        //configurando modal dados Inválidos
        document.getElementById('modal_title').innerHTML = 'Erro na inclusão do registro!'
        document.getElementById('modal_title_div').className = 'modal-header text-danger'
        document.getElementById('texto-corpo').innerHTML = 'Preencha todos os campos!'
        document.getElementById('botao').className = 'btn btn-danger'
        document.getElementById('botao').innerHTML = 'Voltar e corrigir'
        $('#registraDespesas').modal('show')

        
    }
    
}




//alterando título

//Utilizaremos os Local Storage pq são poucos dados

//function gravar(d) {//recebendo Objeto Literal dentro da função gravar
    //localStorage.setItem('despesa', JSON.stringify(d))//convertendo o objeto d em notação JSON
    //para ver se deu certo atualize a página co Ctrl + f5 (para atualizar removendo o cache) Para casos de allterações no arquivo Js e os arquivos não serem carregados...
    //até agora só está sobreescrevendo o Objeto, mas a intenção é salva-los, logo: adicionar uma lógica de criador único para cada registro feito dentro de local storage

//}

//Objetos Literais e a notação JSON são parecidas CUIDADOOOO. JSON é uma string. A escrita é toda dentro dos becktigs, seguidos por chave. "nome" : "resultado", virgula serapa a próxima estring. nome e resultado tem que estar dentro de parênteses. Em um Objeto fica só nome: "resultado",. só resultado é uma string.

//Objetos Literais não podem serem transitados na cominicação pois eles só existem na instância da aplicação, já o JSON, sim. Então JSON.stringify converte objeto literais em notação JSON O INVERSO  é com JSON.parse().

//setItem abre ligação com LocalStorage e JSON transita pra lá. JSON é tipo um ZIP
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////Agora é a parte de carregar as listas de despesas, relativo a página consultas//////////////////////////////////


function carregarListaDespesas(despesas = Array(), filtro = false) { // passa parâmetro default para o onload aparecer os registros, é relativo ao onload do bady de consula.htm
    ///a chamada é feita lá embaixo então tem que 'tirar' o filtro aqui antes do onload, senão da error, tirando com setença If ELSE 
    if (despesas.length == 0 && filtro == false){
        // se o length for 0 vc recebe um valor vazio. Fora que se o filtro for falso, indica que não é uma 'pesquisa', 
        // no caso de não se adicionar nenhum filtro 
        despesas = bd.recuperarTodosRegistros() //recuperar os registros se o lenght for igual a 0. Pq passa pelo filtro e pode acarretar error
        
    }
    //fazendo a chamada ficar dentro de um Array
    //let despesas = Array() //essa chamada passará a ser feita dentro do parâmetro da função por default
    //despesas = bd.recuperarTodosRegistros() //despesas passa a receber o array criado em RecuperarTodosRegistros, não só criados como também  tratados.

    //implementando registros de primeiro de forma estática
    //selecionando ListaDespesas(elemento do tbody da tabela) pela API do DOM e atribuindo a uma variável para  referenciar
    let listaDespesas = document.getElementById('listaDespesas') 
    //limpando os valores que não cair no filtro para não aparecer no tbody
    listaDespesas.innerHTML = ''   

    /*
    <tr>         para usar de lembrança de como ficrá a Tabela (sequência de valores etc)
        0 = <td>15/06/2018</td>
        1 = <td>Alimentação</td>
        2 = <td>Compras do mês</td>
        3 = <td>444,75</td>
        n = ...
    </tr>
    */

    //Percorrer o Array despesas, listando cada despesas de forma dinâmica com método forEach() e dentro dele uma função de callback
    despesas.forEach(function(d){
         //após percorrido d representa cada valor nos seus repectivos lugar. ano x mes x dia x etc
         
         //cirando a linha  TR. E associando a linha recem criada a uma variável
         let linha = listaDespesas.insertRow() /// insertRow() adiciona linha no body

         //inserir valores// criar colunas (td) NAS LINHAS
         linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` // insertCell ele insere valores na linhas criadas,consequentemente, espera um parâmetro. Cada interCell insere um TD.
         // temos, portanto, 3 linhas e 4 colunas. Com o innerHTML a gente acessa o conteudo interno da uma TD e inserimos concatenando os respectivos valores, usando o parâmetro d, isso apenas na posição de cada insertCell(n). Logo, cada inserte tera sua descrição no innerHTML igual no Excel. 
         ///////////////////////////////////////
         //ajustar o tipo usando um keyz antes da linha, pq a conversão tem que ser antes.
         switch(d.tipo) { //Relativo ao insertCell(1)
            //a comparação case é por === (idêntico). Note que o valor é retornado em '1' e não number 1
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break

         }
         linha.insertCell(1).innerHTML = d.tipo

         linha.insertCell(2).innerHTML = d.descricao
         linha.insertCell(3).innerHTML = `${d.valor} R$`

         //criar o botão de excluir
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesas_${d.id}` //agora associamos o id do objeto como valor do buttom (d.id é referente ao d do parmâmetro  da função de callback do forEach)// para evitar conflitos colocaremos a string para identificação que aquilo está representando o id.
        btn.onclick = function() {
            //remover a despesa
            //alert(this.id) // conferindo se está pegando id_despesas_${d.id} ///impressão : id_despesas Number do id
            //Porém ele ainda não encontra nenhum intem com essa referência no LocalStorage, logo colocaremos uma sentença para ele passa a representar esse valor no LocalStore, qual valor ? O valor do Id. 

            //referenciando por uma variável:
            let id = this.id.replace('id_despesas_', '') // replace substitui o valor de uma elemento// ou troca

            //Conferindo 
            //alert(id) // impressão 1 (que é o valor do Id)

            //Agora sim passar o id do Objeto bd com o elemento configurado// qual elemento? o id_despesas_
            //AQUI TEM QUE O MODAL ANTES DE ENVIAR A INFORMAÇÃO NO ONCLICK
            if(id){

                bd.remover(id) // metodo remover do Objeto Bd 

                //após remover a despesa nós podemos atualizar a página para excluir a despesa do Layout
                //Processo feito pelo BOM 
                //window.location.reload() //mesma coisa de clicar no button de refresh

                //adicionando o modál

                document.getElementById('modal_title').innerHTML = 'Despesa!!'
                document.getElementById('modal_title_div').className = 'modal-header text-success'
                document.getElementById('texto-corpo').innerHTML = 'A despesa foi removida com sucesso !!'
                document.getElementById('botao').className = 'btn btn-success'
                document.getElementById('botao').innerHTML = 'Voltar'
                $('#registraDespesasRemover').modal('show')
            }
            //atualizando página ao clicar no voltar do modal ou ao fechar.
            document.getElementById('botao').onclick = function() { window.location.reload() }
            document.getElementById('botao-fechar').onclick = function() { window.location.reload() }
            
        }
        linha.insertCell(4).append(btn)

        //console.log(d)
    })
    //console.log(despesas)
    

}
/////////////////////////////////////////FILTRO DE PESQUISA //////////////////////////////////////////////////////////////
function pesquisarDespesas () {
    //coletar valores no campo dos formulários para referenciar, e nisso está sendo recuperado o value daquele determinado campo html
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    //recuperando a primeira variável despesa, lá encima:
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    //fazendo a chamada de função PesquisarDespesas e tornando ela referencia com uma variável dessa função 
    let despesas = bd.Pesquisar(despesa) // despesa é chamada como parâmetro da método pesquisar do Objeto Bd, utilizando o instanciamento de Despesa (objeto)

    //recuperando a intância de bd e executando o método pesquisar(quando clicado o esperado é aparecer o resultado de despesa)
    //bd.Pesquisar(despesa) // foi feito na linha 89(onde foi dado o console.log

    /*
    let listaDespesas = document.getElementById('listaDespesas') 
    //limpando os valores que não cair no filtro para não aparecer no tbody
    listaDespesas.innerHTML = ''   
    /*
    /*
    <tr>         para usar de lembrança de como ficrá a Tabela (sequência de valores etc)
        0 = <td>15/06/2018</td>
        1 = <td>Alimentação</td>
        2 = <td>Compras do mês</td>
        3 = <td>444,75</td>
        n = ...
    </tr>
    */

    /*
    //Percorrer o Array despesas, listando cada despesas de forma dinâmica com método forEach() e dentro dele uma função de callback
    despesas.forEach(function(d){
         //após percorrido d representa cada valor nos seus repectivos lugar. ano x mes x dia x etc
         
         //cirando a linha  TR. E associando a linha recem criada a uma variável
         let linha = listaDespesas.insertRow() /// insertRow() adiciona linha no body

         //inserir valores// criar colunas (td) NAS LINHAS
         linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` // insertCell ele insere valores na linhas criadas,consequentemente, espera um parâmetro. Cada interCell insere um TD.
         // temos, portanto, 3 linhas e 4 colunas. Com o innerHTML a gente acessa o conteudo interno da uma TD e inserimos concatenando os respectivos valores, usando o parâmetro d, isso apenas na posição de cada insertCell(n). Logo, cada inserte tera sua descrição no innerHTML igual no Excel. 
         ///////////////////////////////////////
         //ajustar o tipo usando um keyz antes da linha, pq a conversão tem que ser antes.
         switch(d.tipo) { //Relativo ao insertCell(1)
            //a comparação case é por === (idêntico). Note que o valor é retornado em '1' e não number 1
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break

         }
         linha.insertCell(1).innerHTML = d.tipo

         linha.insertCell(2).innerHTML = d.descricao
         linha.insertCell(3).innerHTML = `${d.valor} R$`
        
    })

    */


    ////SIMPLIFICANDO POIS OS CÓDIGOS SÃO IGUALS TANTO EM CARREGARLISTA DESPESAS QUANTO NO PESQUISAR DESPESAS

    this.carregarListaDespesas(despesas, true)
}


/////////////////////////////////////////////// página soma //////////////////////////






