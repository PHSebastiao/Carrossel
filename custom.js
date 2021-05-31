$(function () {

    var numeroItens = $(".carrossel .item").length;
    var widthItem = parseInt($(".carrossel .item").css('width'));
    var heightItem = parseInt($(".carrossel .item img").css('height'));
    var widthTotal = widthItem * numeroItens;
    $("#content").width(widthItem).height(heightItem);
    $(".carrossel").css('width', widthTotal).height(heightItem);

    var i = 1;

    // var rolagemAutomatica = setInterval(function () { rolagemDireita(); }, 4000);

    // $("#content").hover(
    //     function () {
    //         clearInterval(rolagemAutomatica);
    //     },
    //     function () {
    //         rolagemAutomatica = setInterval(function () { rolagemDireita() }, 4000);
    //     }
    // );

    for (n = 0; n < numeroItens; n++) {
        $(".botoes-nav").append(`<div class="nav-botao" id="botaonav${n}"></div>`);
    }

    $(".nav-botao").click(function (e) {
        let idNum = 1 + parseInt($(e.currentTarget)[0].id.match(/\d/g));

        let rolagem = parseInt($(`#img${idNum}`).position().left);
        let posicaoAtual = parseInt($(`#img${i}`).position().left);
        i = idNum;
        // if (rolagem == posicaoAtual) {
        //     return;
        // } else if (rolagem == 0) {
        //     $(".carrossel").animate({ 'margin-left': `0px` });
        // } else {
        //     console.log(rolagem, posicaoAtual, rolagem > posicaoAtual)
        //     $(".carrossel").animate({ 'margin-left': `-=${rolagem}px` });
        // }
        // } else if (rolagem > posicaoAtual) {
        //     rolagem -= posicaoAtual
        //     $(".carrossel").animate({ 'margin-left': `-=${rolagem}px` });
        //     i = idNum;
        // } else if (rolagem < posicaoAtual && rolagem != 0) {
        //     $(".carrossel").animate({ 'margin-left': `+=${rolagem}px` });
        //     i = idNum;
        // } 
    });










    $(".botaoLeft").click(function (e) {
        e.preventDefault();

        rolagemEsquerda();
    });

    $(".botaoRight").click(function (e) {
        e.preventDefault();

        rolagemDireita();
    });

    function rolagemEsquerda() {
        i--;
        if (i == 0) i = numeroItens;
        let a = parseInt($(".carrossel").css('margin-left'));
        console.log(widthTotal, a, i)
        if (widthTotal == widthTotal - a) {
            $(".carrossel li:last").insertBefore($(".carrossel li:first"));
            $(".carrossel").css('margin-left', `-=${widthItem}px`);
        }

        $(".carrossel").animate({ 'margin-left': `+=${widthItem}px` }, {
            duration: 500,
            progress: function () {
                $('.botaoLeft').addClass("disabled")
            },
            done: function () {
                $('.botaoLeft').removeClass("disabled")
            }
        });
    }

    function rolagemDireita() {
        i++;
        if (i == numeroItens + 1) i = 1;
        let a = -parseInt($(".carrossel").css('margin-left'))
        if (widthTotal - a == widthItem) {
            $(".carrossel li:first").insertAfter($(".carrossel li:last"));
            $(".carrossel").css('margin-left', `+=${widthItem}px`);
        }

        // console.log("imagem 1: " + parseInt($("#img1").position().left))
        // console.log("imagem 2: " + parseInt($("#img2").position().left))
        // console.log("imagem 3: " + parseInt($("#img3").position().left))
        // console.log("imagem 4: " + parseInt($("#img4").position().left))
        // console.log("---------------")
        console.log(widthTotal, a, i)
        $(".carrossel").animate({ 'margin-left': `-=${widthItem}px` }, {
            duration: 500,
            progress: function () {
                $('.botaoRight').addClass("disabled");
            },
            done: function () {
                $('.botaoRight').removeClass("disabled");
            }
        });
    }
});