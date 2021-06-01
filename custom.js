$(document).ready(function () {
    var numeroItens = $(".carrossel .item").length;
    var widthItem = parseInt($(".carrossel .item").css("width"));
    var heightItem = parseInt($(".carrossel .item img").css("height"));
    var widthTotal = widthItem * numeroItens;
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
        if (rolagem == posicaoAtual) {
            return;
        } else {
            $(".carrossel").animate({ "margin-left": `-${rolagem}px` });
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

    function rolagemEsquerda(r) {
        i--;
        if (i == 0) i = numeroItens;
        let a = parseInt($(".carrossel").css("margin-left"));
        // console.log(widthTotal, a, i)
        if (widthTotal == widthTotal - a) {
            $(".carrossel li:last").insertBefore($(".carrossel li:first"));
            $(".carrossel").css("margin-left", "-="+widthItem+"px");
        }

        $(".carrossel").animate({ "margin-left": `+=${widthItem}px` }, {
            duration: 500,
            progress: function () {
                $(".botaoLeft").addClass("disabled")
                $(".botoes-nav").addClass("disabled");
                ativarBotao();
            },
            done: function () {
                $(".botaoLeft").removeClass("disabled")
                $(".botoes-nav").removeClass("disabled");
            }
        });
    }

    function rolagemDireita() {
        i++;
        if (i == numeroItens + 1) i = 1;
        let a = -parseInt($(".carrossel").css("margin-left"))
        if (widthTotal - a == widthItem) {
            $(".carrossel li:first").insertAfter($(".carrossel li:last"));
            $(".carrossel").css("margin-left", `+=${widthItem}px`);
        }
        
        // console.log(widthTotal, a, i)
        $(".carrossel").animate({ "margin-left": `-=${widthItem}px` }, {
            duration: 500,
            progress: function () {
                $(".botaoRight").addClass("disabled");
                $(".botoes-nav").addClass("disabled");
                ativarBotao();
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
});