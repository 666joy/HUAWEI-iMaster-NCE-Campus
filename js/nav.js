$(function(){
    // nav收缩展开
    $('.nav-item>a').on('click',function(){
        if (!$('.nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);

                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
            }else{
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.nav-item.nav-show').removeClass('nav-show');
            }
        }
    });
    //nav-mini切换
    $('#mini').on('click',function(){
        if (!$('.nav').hasClass('nav-mini')) {
            $('.nav-item.nav-show').removeClass('nav-show');
            $('.nav-item').children('ul').removeAttr('style');
            $('.nav').addClass('nav-mini');
        }else{
            $('.nav').removeClass('nav-mini');
        }
    });

    //点击切换页面
    $('#nav-item-tuopu').on('click',function(){
        location.href='tuopu.html';
    });
    $('#nav-item-tongji').on('click',function(){
        location.href='tongji.html';
    });

    $('#nav-item-rizhi').on('click',function(){
        location.href='rizhi.html';
    });
    $('#nav-item-shebei').on('click',function(){
        location.href='shebei.html';
    });
    $('#nav-item-peizhi').on('click',function(){
        location.href='peizhi.html';
    });
    $('#nav-item-zengshan').on('click',function(){
        location.href='zengshan.html';
    });
    $('#nav-item-shanchu').on('click',function(){
        location.href='shanchu.html';
    });
    $('#nav-item-relitu').on('click',function(){
        location.href='relitu.html';
    });
    $('#nav-item-xunren').on('click',function(){
        location.href='xunren.html';
    });
    $('#nav-item-xitongjieshao').on('click',function(){
        location.href='xitongjieshao.html';
    });
    $('#nav-item-xiaozujieshao').on('click',function(){
        location.href='xiaozujieshao.html';
    });
});