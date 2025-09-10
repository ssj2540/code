$(document).ready(function(){
    //console.log('연결')
    /* 
        .tour .list ul li에
        마우스를 올린 li에만 
        on 클래스 추가
    */

   $('.tour .list ul li').on('mouseenter', function(){
        //console.log('오버함')
        /* 
            무식한 방법이지만, 작동이 잘 됨
            마우스를 오버하면 모든 li에 있는 on 클래스 지움
            없는 li는 가만히 있고 있는 li만 지움
        */
        $('.tour .list ul li').removeClass('on')
        $(this).addClass('on')
   })

   $('footer .right_area .family_site button.open').on('click', function(){
        // console.log('여는 버튼 클릭')
        $('footer .right_area .family_site').addClass('open')
   })

   $('footer .right_area .family_site button.close').on('click', function(){
        // console.log('닫는 버튼 클릭')
        $('footer .right_area .family_site').removeClass('open')
   })

   /* 
        footer .right_area .top 클릭하면
        브라우저가 상단으로 스크롤
    */
   $('footer .right_area .top').on('click', function(){
        //console.log('누름')
        /*
            let scrolling = $(window).scrollTop()
            console.log(scrolling)
            $(window).scrollTop(0)
        */
        $('html, body').animate({
            scrollTop: 0
        }, 500)

   })
   
})//$(document).ready