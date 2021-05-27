$(function () {

    var numeroItens = $(".carrossel .item").length;
    var widthItem = parseInt($(".carrossel .item").outerWidth(true));
    var widthTotal = widthItem * numeroItens;
    $(".carrossel").css('width', widthTotal)

    var i = 1;

    $(".botaoLeft").click(function (e) {
        e.preventDefault();
        if (i != 1) {
            i--;
            rolagemEsquerda()
        } else {
            $(".carrossel li:last").insertBefore(".carrossel li:first"); // Insere o último antes do primeiro
            $(".carrossel").css('margin-left', `-=${widthItem}px`); // Mantém a imagem atual
            rolagemEsquerda()
        }
    });

    $(".botaoRight").click(function (e) {
        e.preventDefault();
        if (i < numeroItens) {
            i++;
            rolagemDireita()
        } else {
            $(".carrossel li:first").insertAfter(".carrossel li:last");
            $(".carrossel").css('margin-left', `+=${widthItem}px`);
            rolagemDireita()
        }
    });
    function rolagemEsquerda() {
        $(".carrossel").animate({ 'margin-left': `+=${widthItem}px` }, '500');
    }
    function rolagemDireita() {
        $(".carrossel").animate({ 'margin-left': `-=${widthItem}px` }, '500');
    }
});