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
            $(".carrossel").animate({ 'margin-left': `+=${widthItem}px` }, '500')
        } else {
            //console.log(numeroItens, i)
        }
    });
    $(".botaoRight").click(function (e) {
        if (i < numeroItens) {
            i++;
            e.preventDefault();
            $(".carrossel").animate({ 'margin-left': `-=${widthItem}px` }, '500');
        } else {
            //console.log(numeroItens, i)
        }
    });
});