// Defini quais teclas do teclado serão utilizadas
const TECLA = { W: 87, S: 83, D: 68 };
const jogo = {
  pressionou: [],
};

// Configurando a condição para o disparo
let podeAtirar = true;
let tempoDisparo;

// Velocidade e posição do inimigo 1
const velocidade = 5;
let posicaoY = randPosition();

//Verifica se o usuário pressionou alguma tecla
$(document).keydown(function (e) {
  jogo.pressionou[e.which] = true;
});

$(document).keyup(function (e) {
  jogo.pressionou[e.which] = false;
});

function start() {
  $("#inicio").hide();
  $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
  $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
  $("#fundoGame").append("<div id='inimigo2'></div>");
  $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

  // Game Loop a cada 30ms
  if (!jogo.timer) {
    jogo.timer = setInterval(loop, 30);
  }
}

function loop() {
  moveFundo();
  moveJogador();
  moveInimigo1();
  moveInimigo2();
  moveAmigo();
}

function moveFundo() {
  esquerda = parseInt($("#fundoGame").css("background-position"));
  $("#fundoGame").css("background-position", esquerda - 1);
}

function randPosition() {
  return parseInt(Math.random() * 324 + 10);
}

// função para mover o helicóptero cinza
function moveJogador() {
  if (jogo.pressionou[TECLA.W]) {
    const topo = parseInt($("#jogador").css("top"));

    // limitando o helicóptero no topo da página
    if (topo <= 10) return;

    $("#jogador").css("top", topo - 10);
  }

  if (jogo.pressionou[TECLA.S]) {
    const topo = parseInt($("#jogador").css("top"));

    // limitando o helicóptero no final da página
    if (topo >= 434) return;

    $("#jogador").css("top", topo + 10);
  }

  if (jogo.pressionou[TECLA.D]) {
    disparo(); // chama função disparo
  }
}

// função para mover o inimigo 1, helicóptero amarelo
function moveInimigo1() {
  let posicaoX = parseInt($("#inimigo1").css("left"));

  $("#inimigo1").css("left", posicaoX - velocidade);
  $("#inimigo1").css("top", posicaoY);

  if (posicaoX <= 0) {
    posicaoY = randPosition();
    $("#inimigo1").css("left", 694);
    $("#inimigo1").css("top", posicaoY);
  }
}

// função para mover o inimigo 2, caminhão
function moveInimigo2() {
  let posicaoX = parseInt($("#inimigo2").css("left"));

  $("#inimigo2").css("left", posicaoX - 3);

  if (posicaoX <= 0) {
    $("#inimigo2").css("left", 775);
  }
}

// função para mover o amigo, o que vai ser resgatado
function moveAmigo() {
  let posicaoX = parseInt($("#amigo").css("left"));

  $("#amigo").css("left", posicaoX + 1);

  if (posicaoX > 906) {
    $("#amigo").css("left", 0);
  }
}

// função que realiza o disparo da arma do helicóptero cinza
function disparo() {
  if (podeAtirar == true) {
    podeAtirar = false;

    let topo = parseInt($("#jogador").css("top"));
    let posicaoX = parseInt($("#jogador").css("left"));
    let tiroX = posicaoX + 190;
    let topoTiro = topo + 37;

    $("#fundoGame").append("<div id='disparo'></div");
    $("#disparo").css("top", topoTiro);
    $("#disparo").css("left", tiroX);

    tempoDisparo = window.setInterval(executaDisparo, 15);
  }

  // função que realiza o disparo da arma
  function executaDisparo() {
    posicaoX = parseInt($("#disparo").css("left"));
    $("#disparo").css("left", posicaoX + 15);

    if (posicaoX > 900) {
      window.clearInterval(tempoDisparo);
      tempoDisparo = null;
      $("#disparo").remove();
      podeAtirar = true;
    }
  }
}
