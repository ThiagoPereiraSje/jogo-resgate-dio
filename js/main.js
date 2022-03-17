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
  colisao();
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

// função da explosão, colisão com o inimigo 1, helicóptero
function explosao1(inimigo1X, inimigo1Y) {
  // somExplosao.play();

  $("#fundoGame").append("<div id='explosao1'></div");

  var div = $("#explosao1");
  div.css("top", inimigo1Y);
  div.css("left", inimigo1X);
  div.animate({ width: 200, opacity: 0 }, "slow");

  let tempoExplosao = window.setInterval(removeExplosao, 1000);

  function removeExplosao() {
    div.remove();
    window.clearInterval(tempoExplosao);
    tempoExplosao = null;
  }
}

// função que verifica a colisão dos itens do jogo
function colisao() {
  const jogadorInimigo1 = $("#jogador").collision($("#inimigo1"));
  // const jogadorInimigo2 = $("#jogador").collision($("#inimigo2"));
  // const disparoInimigo1 = $("#disparo").collision($("#inimigo1"));
  // const disparoInimigo2 = $("#disparo").collision($("#inimigo2"));
  // const jogadorAmigo = $("#jogador").collision($("#amigo"));
  // const amigoInimigo2 = $("#inimigo2").collision($("#amigo"));

  // colisão do jogador (helicóptero) com o inimigo1, helicóptero
  if (jogadorInimigo1.length > 0) {
    // energiaAtual--;

    inimigo1X = parseInt($("#inimigo1").css("left"));
    inimigo1Y = parseInt($("#inimigo1").css("top"));
    explosao1(inimigo1X, inimigo1Y);

    posicaoY = parseInt(Math.random() * 334);
    $("#inimigo1").css("left", 694);
    $("#inimigo1").css("top", posicaoY);
  }

  // colisão do jogador (helicóptero) com o inimigo2, caminhão
  // if (jogadorInimigo2.length > 0) {
  //   energiaAtual--;
  //   inimigo2X = parseInt($("#inimigo2").css("left"));
  //   inimigo2Y = parseInt($("#inimigo2").css("top"));
  //   explosao2(inimigo2X, inimigo2Y);

  //   $("#inimigo2").remove();
  //   reposicionaInimigo2();
  // }

  // colisão do disparo com o inimigo 1, helicóptero
  // if (disparoInimigo1.length > 0) {
  //   velocidade = velocidade + 0.3;
  //   pontos = pontos + 100;
  //   inimigo1X = parseInt($("#inimigo1").css("left"));
  //   inimigo1Y = parseInt($("#inimigo1").css("top"));
  //   explosao1(inimigo1X, inimigo1Y);

  //   $("#disparo").css("left", 950);
  //   posicaoY = parseInt(Math.random() * 334);
  //   $("#inimigo1").css("left", 694);
  //   $("#inimigo1").css("top", posicaoY);
  // }

  // colisão do disparo com o inimigo 2, caminhão
  // if (disparoInimigo2.length > 0) {
  //   pontos = pontos + 50;
  //   inimigo2X = parseInt($("#inimigo2").css("left"));
  //   inimigo2Y = parseInt($("#inimigo2").css("top"));
  //   $("#inimigo2").remove();

  //   explosao2(inimigo2X, inimigo2Y);
  //   $("#disparo").css("left", 950);
  //   reposicionaInimigo2();
  // }

  // colisão do jogador (helicóptero) com o amigo
  // if (jogadorAmigo.length > 0) {
  //   salvos++;
  //   somResgate.play();
  //   reposicionaAmigo();
  //   $("#amigo").remove();
  // }

  // colisão do amigo com o inimigo 2, caminhão
  // if (amigoInimigo2.length > 0) {
  //   perdidos++;
  //   amigoX = parseInt($("#amigo").css("left"));
  //   amigoY = parseInt($("#amigo").css("top"));

  //   explosao3(amigoX, amigoY);
  //   $("#amigo").remove();
  //   reposicionaAmigo();
  // }
}
