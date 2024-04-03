let listaNumerosSorteados = [];
let teto = 40;
let numeroAletorio = GerarNumeroAleatorio();
let tentativas = 1;

function exbirMensagemNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.35});
}
function exbirMensagemInicial(){
    exbirMensagemNaTela('h1', 'Jogo do numero secreto');
    let mensagemJogo = `Escolha um numero entre 1 e ${teto}`;
    exbirMensagemNaTela('p',mensagemJogo);

}

exbirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroAletorio){
        exbirMensagemNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exbirMensagemNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        if(chute > numeroAletorio) {
            exbirMensagemNaTela('p','O número secreto é menor!');
        }
        else{
            exbirMensagemNaTela('p','O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
    console.log(numeroAletorio == chute);
}
function GerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random()*teto + 1);
    let quantidadeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeElementosNaLista == teto){
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return GerarNumeroAleatorio();
    }else{
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    numeroAletorio = GerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exbirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true)
}
