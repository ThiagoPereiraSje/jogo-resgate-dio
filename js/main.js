const TECLA = { W: 87, S: 83, D: 68 };
const jogo = {
  pressionou: [],
};

//Verifica se o usuário pressionou alguma tecla
$(document).keydown(function (e) {
  console.log("tecla: ", e.keyCode);
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
}

function moveFundo() {
  esquerda = parseInt($("#fundoGame").css("background-position"));
  $("#fundoGame").css("background-position", esquerda - 1);
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
    // chama função disparo
  }
}
