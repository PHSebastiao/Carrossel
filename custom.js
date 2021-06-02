$(document).ready(function () {
    var numeroItens = $(".carrossel .item").length;
    var widthItem = parseInt($(".carrossel .item").css("width"));
    var heightItem = parseInt($(".carrossel .item img").css("height"));
    
    let items = Object.keys($(".carrossel .item"));
    var widthTotal = 0;
    for (k = 0; k < items.length -2; k++) {
       widthTotal += $(`#img${k+1}`)[0].width;
    }


    $("#content").width(widthItem).height(heightItem);
    $(".carrossel").css("width", widthTotal).height(heightItem);

    var i = 1;

    // Rolagem Automática
    let timer = 5000;
    var rolagemAutomatica = setInterval(function () { rolagemDireita(); }, timer);

    $("#content").hover(
        function () {
            clearInterval(rolagemAutomatica);
        },
        function () {
            rolagemAutomatica = setInterval(function () { rolagemDireita() }, timer);
        }
    );
    
    // Botões de Navegação
    for (n = 1; n <= numeroItens; n++) {
        $(".botoes-nav").append(`<div class="nav-botao" id="botaonav${n}"></div>`);
    }
    $("#botaonav1").addClass("active");

    $(".nav-botao").click(function (e) {
        let idNum = parseInt($(e.currentTarget)[0].id.match(/\d/g));

        let rolagem = parseInt($(`#img${idNum}`).position().left);
        let posicaoAtual = parseInt($(`#img${i}`).position().left);

        i = idNum;
        
        let width = $(`#img${i}`)[0].width;
        let height = $(`#img${i}`)[0].height;

        if (rolagem == posicaoAtual) {
            return;
        } else {
            $(".carrossel").animate({ "margin-left": `-${rolagem}px` }, {
                duration: 500,
                start: function () {
                    ajustarCarrossel(width, height);
                }
            });
            ativarBotao();
            
        }
    });

    // Função dos botões
    $(".botaoLeft").click(function (e) {
        e.preventDefault();

        rolagemEsquerda();
    });

    $(".botaoRight").click(function (e) {
        e.preventDefault();

        rolagemDireita();
    });

    function rolagemEsquerda() {
        let widthAtual = $(`#img${i}`)[0].width;
        i--;
        if (i == 0) i = numeroItens;
        let a = parseInt($(".carrossel").css("margin-left"));
        let width = $(`#img${i}`)[0].width;
        let height = $(`#img${i}`)[0].height;
        // console.log(widthTotal, a, i)
        if (widthTotal == widthTotal - a) {
            $(".carrossel li:last").insertBefore($(".carrossel li:first"));
            $(".carrossel").css("margin-left", `-=${width}px`);
        }
        
        $(".carrossel").animate({ "margin-left": `+=${width}px` }, {
            duration: 500,
            start: function () {
                $(".botaoLeft").addClass("disabled")
                $(".botoes-nav").addClass("disabled");
                if (widthAtual != width || heightItem != height) {
                    ajustarCarrossel(width, height);
                }
                ativarBotao();
            },
            done: function () {
                $(".botaoLeft").removeClass("disabled")
                $(".botoes-nav").removeClass("disabled");
            }
        });
    }

    function rolagemDireita() {
        let widthAtual = $(`#img${i}`)[0].width;
        i++;
        if (i == numeroItens + 1) i = 1;
        let a = -parseInt($(".carrossel").css("margin-left"));
        let width = $(`#img${i}`)[0].width;
        let height = $(`#img${i}`)[0].height;
        if (widthTotal - a == widthAtual) {
            $(".carrossel li:first").insertAfter($(".carrossel li:last"));
            $(".carrossel").css("margin-left", `+=${width}px`);
        }
        
        // console.log(widthTotal, a, i)
        $(".carrossel").animate({ "margin-left": `-=${widthAtual}px` }, {
            duration: 500,
            start: function () {
                $(".botaoRight").addClass("disabled");
                $(".botoes-nav").addClass("disabled");
                ativarBotao();
                if (widthAtual != width || heightItem != height) {
                    ajustarCarrossel(width, height);
                }
            },
            done: function () {
                $(".botaoRight").removeClass("disabled");
                $(".botoes-nav").removeClass("disabled");
            }
        });
    }
    function ativarBotao() {
        $(".active").removeClass("active");
        $("#botaonav"+i).addClass("active");
    }
    function ajustarCarrossel(w, h) {
        $("#content").animate({ "width": `${w}px`, "height": `${h}px`}, 500);
        console.log("alo")
    }
});