'use strict'
var som = document.getElementById("musica"); 
function mouseOver() { 
    som.play(); 
} 

//Primeiramente chamamos o display, tornando-o também uma variável de escopo global (já que iremos trabalhar com o mesmo dentro de algumas funções)
const display = document.getElementById('display');
//Segrundamente, chamos cada botão. 
//Não podemos chamar os botões pela classe, pois todos têm a mesma.
//Então, usaremos o querySelectorAll()
                                        //Buscar qualquer elemento que parte de seu nome 'id' tenha tecla. O asterisco faz essa busca generalizada.
const numeros = document.querySelectorAll('[id*="tecla"]');
                                            //Buscar qualquer elemento que parte de seu nome 'id' tenha operador. 
const operadores = document.querySelectorAll('[id*=operador]');

//Criar uma variável de tipo primitivo boolean, que fará o teste condicional para saber se é ou não um novo número
let novoNumero = true;
//Criar uma variável que irá guardar o operador
let operador;
//E criar uma variável que irá guardar o número substituído, o pendente, que é diferente do novoNumero
let numeroAnterior;
                            //Retorna o operador diferente de indefinido, ou seja, se ele está vazio
const operacaoPendente = () => operador != undefined;

//O cálculo só ocorre quando não for um número novo
const calcular = () => {
    //Ele já não vai chegar calculando, ele deverá saber se há uma operação pendente, onde o mesmo recebe a seguinte lógica: operador deve ser diferente de indefinada. Então, se operação pendente for true, faça:  
    if (operacaoPendente()){
        //Recebe o texto que está no display e depois passa o mesmo para número, independentemente do tipo (decimal ou integer)
        const numeroAtual = Number(display.textContent.replace(',', '.'));
        //Para limpar o display, apagando da visão e da operação o número anterior, e também não concatenando mais ele ao novo numero
        novoNumero = true;
        //Deverá saber qual operador foi selecionado/clicado, para então efetuar tal cálculo com o número atual
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
       /* if(operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if(operador == '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if(operador == '*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if(operador == '/'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }*/
    }
}
/*Essa função recebe um parâmetro, que no caso é o texto do botão*/ 
const atualizarDisplay = (texto) => {
    //Se for um novo número, então não concatena, mas limpa a tela e coloca um novo número no display
    if(novoNumero){
        //O display recebe o texto, que no caso é o texto conteúdo do botão
        display.textContent = texto.toLocaleString('BR');
                                  //Uma forma mais simplificada de conversão do ponto para a vírgula (em vez de ser da forma padrão americana (ex.: 5.5), ficará da forma como é feito no Brasil: ex.: 5,5) 
      //Se ele for realmente um novo número, ele é adicionado ao display, porém aí ele já não é mais um novo número (pois novo número é apenas aquele que LIMPARÁ a tela), então após isso, recebe falso. (Pois caso não receba, sempre que for clicado ou digitado um novo número, não irá concatenar, mas limpar o display)
        novoNumero = false;
   //Senão, concatena com o número que já há no display
    }else{
                        //Operador de atribuição para concatenar com o que já tem, porém nem sempre será requerido a concatenação, então terá que arrumar isso
        display.textContent += texto.toLocaleString('BR');
    }
}

//Cada vez que é clicado, é adicionado um número no display. Target é para pegar o alvo que está sendo clicado
                    //Essa função recebe do addEventListener um evendo (que é o 'click') e aí, RETORNA em uma outra função (atualizarDisplay) que recebe o 'click', porém o ALVO ('target') que ele 'acerta', que no caso é o CONTEÚDO DE TEXTO do botão (textContent), que é um texto numeral.
const inserirNumero = (evento) =>{ atualizarDisplay(evento.target.textContent) 
     //Para fazer exibir o conteúdo do botão também 
}
//SelecionarOperador é diferente do inserirNumero pois ele não será concatenado, ele limpará a tela assim que clicado, ou operar a conta anterior se solicitada uma nova, ou o sinal de igualdade
const selecionarOperador = (evento) =>{
    //novoNumero foi declaradado como true, logo *se for diferente de um novoNumero (onde novoNumero recebe false), irá realizar o cálculo, e depois receber true novamente, querendo dizer que poderá ter um novo número para efetuar um novo cálculo (além de limpar o display, como foi declarado em atualizarDisplay), também podendo ter um novo operador (/, *, +, -) para tal fim.
    if(!novoNumero){
        calcular();
        novoNumero = true;
        //Em calculo() a variável *operador* estará recebendo quais os alvos que deverá 'focar', ou ter como alvo, que são os operadores aritméticos.
        operador = evento.target.textContent;
        //Numero anterior está no display, cujo já está guardado em determinada variável
        numeroAnterior = Number(display.textContent.replace(',','.'));
        console.log(operador)
    }
}

//Adicionando o evendo click a cada tecla:
               //Pega um numero, e adiciona a ele um evento ouvinte de click, e manda para outra callbackfn (inserirNumero)
numeros.forEach (numero => numero.addEventListener('click', inserirNumero)); //Inserção de evento em cada tecla. 
         //Percorrer cada tecla que tenha no id a palavra 'operador' e, após isso, adicionar a cada tecla um evento Listener do tipo 'click'
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () =>{
    calcular();7
    //Não haverá uma conta pendente, ou seja, exemplo: caso eu faça uma conta: 5 + 5 = 10, graças a atribuição de undefined na variável, fará com que o operador pare de executar, ao invés de continuar a somar, clicando/digitando tanto em "+", quanto em "=", somando sempre com mais 5.
    operador = undefined;
}
//Botão de igualdade. Adicionando um evento de click ao mesmo
document.getElementById('igual').addEventListener('click', ativarIgual);

//Limpa somente o que etá no display
const limparDisplay = () => display.textContent = ''; 

document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

const limparCalculo = () =>{
    //Vai limpar o display
    limparDisplay();
    //Vai zerar o operador
    operador = undefined;
    //Será um numero novo
    novoNumero = true;
    //E o número anterior também será zerado
    numeroAnterior = undefined;
}

//Adiciona um evento de click no botão 
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

                                                        //O conteúdo que está dentro do display será fatiado. inicia-se em zero (todo array inicia no índice zero) e removerá o último (-1 porque ele conta de trás para frente)
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);

//Capiturando o botão backspace a atribuindo a ele um evento de click
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    //Atualizará o display, para que não haja concatenação com o número anterior
    novoNumero = true;
    //E o conteudo do dislay
    atualizarDisplay(display.textContent * -1);

};
document.getElementById('inverter').addEventListener('click', inverterSinal);
                            //se houver em determinada String uma vírgula, então é decimal. E deve ser diferente de menos um                  
const existeDecimal = () => display.textContent.indexOf(',') != -1;
                          //Se for maior que zero (a quantidade de números para ser um decimal), então é um valor, se não, não há nenhum e não pode haver vírgula sem antes haver o zero. 
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () =>{
    //Se não existeDecimal(), não adiciona, 
    if(!existeDecimal()){
      //se existir valor, então adiciona UMA vírgula no display 
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            //Senão houver um valor acima ou abaixo de zero antes da vírgula, então adiciona o zero
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

//Teclado físico:
//Mapeando o teclado:
const mapaTeclado = {
    '0': 'tecla0', 
    '1': 'tecla1', 
    '2': 'tecla2', 
    '3': 'tecla3', 
    '4': 'tecla4', 
    '5': 'tecla5', 
    '6': 'tecla6', 
    '7': 'tecla7', 
    '8': 'tecla8', 
    '9': 'tecla9', 
    '/': 'operadorDivisao', 
    '*': 'operadorMultiplicar', 
    '-': 'operadorSubtrair', 
    '+': 'operadorAdicionar', 
    '=': 'igual', 
    'Enter': 'igual', 
    'Backspace': 'backspace', 
    'c': 'limparDisplay', 
    'Shift':  'limparCalculo', 
    ',': 'decimal'
}

const capturarTeclado = (evento) => {
    //Colocando essa tecla dentro de uma variável, que é igual ao parâmetro e o evento key
    const tecla = evento.key;
    //tecla permitida varre todas as chaves para ver se a tecla digitada é realmente permitida (a interação com a calculadora), ou seja, se está dentro da array mapaTeclado[]
                                 //Então vamos pegar o objeto e o método keys (que extrai de um objeto somente a chave, e trás um array), e passamos como parãmetro (ou onde o evento keys irá agir) dentro do evento a array mapaTeclado, onde nesse array que ele retorna será dado um indexOf, para verificar se existe a tecla, onde ela só existirá se for diferente de -1 (pois vai de 0 à 9), pois o indexOf trás -1 quando não existe e quando existe, retorna algo diferente de -1
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
    //Se for tecla for permitida, então captura pelo id mapaTeclado[tecla] - no caso o indice através do evento click
    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
    console.log(tecla);
}

document.addEventListener('keydown', capturarTeclado);