'use strict'
var som = document.getElementById("musica"); 
function mouseOver() { 
    som.play(); 
} 

//Primeiramente capturaremos os botões
const display = document.getElementById('display')
//Não podemos chamar os botões pela classe, pois todos têm a mesma.
//Então usaremos o querySelectorAll()
                                        //Buscar qualquer elemento que parte de seu nome 'id' tenha tecla
const numeros = document.querySelectorAll('[id*="tecla"]');
                                            //Buscar qualquer elemento que parte de seu nome 'id' tenha operador 
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
//Criar uma variável que irá guardar o operador
let operador;
//E criar uma variável que irá guardar o número substituído, o pendente
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = Number(display.textContent.replace(',', '.'));
        novoNumero = true;
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

const atualizarDisplay = (texto) => {
    //Se for novo número, então não concatena, mas limpa a tela
    if(novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
   //Senão, concatena
    }else{
                        //Operador de atribuição para concatenar com o que já tem, porém nem sempre será requerido a concatenação, então terá que arrumar isso
        display.textContent += texto.toLocaleString('BR');
    }
}

//Cada vez que é clicado, é adicionado um número no display. Target é para pegar o alvo que está sendo clicado
const inserirNumero = (evento) =>{ atualizarDisplay(evento.target.textContent) 
     //Para fazer exibir o conteúdo do botão também 
}

const selecionarOperador = (evento) =>{
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = Number(display.textContent.replace(',','.'));
        console.log(operador)
    }
}

//Como capturar os clicks de cada tecla
numeros.forEach (numero => numero.addEventListener('click', inserirNumero)); //Inserção de evento em cada tecla. 
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))
//selecionar pois ele não será concatenado, ele limpará a tela assim que clicado, ou operar a conta anterior se solicitada.

const ativarIgual = () =>{
    calcular();
    operador = undefined;
}
//Botão de igualdade
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = ''; //Limpa somente o que etá na tela

document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

const limparCalculo = () =>{
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);

};
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () =>{
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

//Teclado físico:

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
    '/': 'operadorDividir', 
    '*': 'operadorMultiplicar', 
    '-': 'operadorSubtrair', 
    '+': 'operadorAdcionar', 
    '=': 'igual', 
    'Enter': 'igual', 
    'Backspace': 'backspace', 
    'c': 'limparDisplay', 
    'Espace':  'limparCalculo', 
    ',': 'decimal'
}

const mapearTeclado = (evento) =>{
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
   if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}

document.addEventListener('keydown', mapearTeclado);