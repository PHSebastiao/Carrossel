$(function () {

    var numeroItens = $(".carrossel .item").length;
    var widthItem = parseInt($(".carrossel .item").css('width'));
    var widthTotal = widthItem * numeroItens;
    $(".carrossel").css('width', widthTotal)

    var i = 0;

    $(".botaoLeft").click(function (e) {
        e.preventDefault();
        i--;
        if (i == -1) i = numeroItens - 1;
        let a = parseInt($(".carrossel").css('margin-left'))
        // console.log(i, numeroItens, a, widthTotal-a);
        if (widthTotal == widthTotal - a) {
            $(".carrossel li:last").insertBefore($(".carrossel li:first"));
            $(".carrossel").css('margin-left', `-=${widthItem}px`);
            // console.log("oi")
        }
        rolagemEsquerda();
    });

    $(".botaoRight").click(function (e) {
        e.preventDefault();
        i++;
        let a = -parseInt($(".carrossel").css('margin-left'))
        if (i == numeroItens) i = 0;
        // console.log(i, numeroItens, a, widthTotal-a);
        if (widthTotal - a == widthItem) {
            $(".carrossel li:first").insertAfter($(".carrossel li:last"));
            $(".carrossel").css('margin-left', `+=${widthItem}px`);
            // console.log("oie")
        }
        rolagemDireita();
    });
    function rolagemEsquerda() {
        $(".carrossel").animate({ 'margin-left': `+=${widthItem}px` }, '500');
    }
    function rolagemDireita() {
        $(".carrossel").animate({ 'margin-left': `-=${widthItem}px` }, '500');
    }
});