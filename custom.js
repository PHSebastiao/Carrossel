$(function () {

    var numeroItens = $(".carrossel .item").length;
    var widthItem = parseInt($(".carrossel .item").css('width'));
    var heightItem = parseInt($(".carrossel .item img").css('height'));
    var widthTotal = widthItem * numeroItens;
    $("#content").width(widthItem).height(heightItem);
    $(".carrossel").css('width', widthTotal).height(heightItem);

    var i = 0;

    var rolagemAutomatica = setInterval(function () { rolagemDireita(); }, 3000);

    $("#content").hover(
        function () {
            clearInterval(rolagemAutomatica);
        },
        function () {
            rolagemAutomatica = setInterval(function () { rolagemDireita() }, 3000);
        }
    );


    $(".botaoLeft").click(function (e) {
        e.preventDefault();
        i--;
        if (i == -1) i = numeroItens - 1;
        rolagemEsquerda();
    });

    $(".botaoRight").click(function (e) {
        e.preventDefault();
        i++;
        if (i == numeroItens) i = 0;
        rolagemDireita();
    });
    function rolagemEsquerda() {
        let a = parseInt($(".carrossel").css('margin-left'));
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
        let a = -parseInt($(".carrossel").css('margin-left'))
        if (widthTotal - a == widthItem) {
            $(".carrossel li:first").insertAfter($(".carrossel li:last"));
            $(".carrossel").css('margin-left', `+=${widthItem}px`);
        }

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