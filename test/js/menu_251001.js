$(document).ready(function(){
    /*
        메뉴에 마우스 오버하면 header에 menu_over 클래스 추가
        header 흰색 배경에서 마우스가 영역 바깥으로 나가면 menu_over 클래스 삭제
    */
    
    
    $('header .gnb').on('mouseenter', function(){
        // console.log('올라감')
        $('header').addClass('menu_over')
    })
    $('header').on('mouseleave', function(){
        // console.log('내림')
        $(this).removeClass('menu_over')
    })

    /*  
        이벤트 대상 ----------- header .gnb .gnb_wrap ul.depth1 > li
        결론 : 1. 마우스 오버 대상 1차메뉴 li에 over 클래스 추가
               2. 이전에 오버했던 메뉴 li에서는 over 클래스 삭제
    */
   $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
        $(this).addClass('over')
   })
   $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
        $(this).removeClass('over')
   })

   /*
        이벤트 대상 ----------- header .gnb .gnb_wrap ul.depth1 > li
        조건 : 닫힌 메뉴를 클릭하면 열림 (open 클래스 추가)
                --> 다른 열린 메뉴는 닫음
               열린 메뉴를 클릭하면 닫힘 (open 클래스 삭제)

        --> 열린메뉴와 닫힌 메뉴 구분 방법
            li에 open 있으면 열린 메뉴 / open 없으면 닫힌 메뉴
   */
   $('header .gnb .gnb_wrap ul.depth1 > li').on('click', function(){
    let open_true = $(this).hasClass('open')
        console.log(open_true)
        if(open_true == true){ //열려있다면
            $(this).removeClass('open')
        }else{ //닫혀있다면
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
            $(this).addClass('open')
        }
   })

   /* 
        header .gnb .gnb_open 를 클릭하면 메뉴가 열림
            --> header에 menu_open 클래스 추가
        header .gnb .gnb_close 를 클릭하면 메뉴가 닫힘
            --> header에 menu_open 클래스 삭제
   */
  $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_open')
  })
  $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_open')
  })
})//ready