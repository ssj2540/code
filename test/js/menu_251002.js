$(document).ready(function(){

    /**********************************************************
     * 기준 1024 이하 = 모바일, 1025 이상 = pc형 / 작동 시기를 잘 따줘줘야 함.
     * 브라우저 넓이에 따라 pc모드인지 모바일인지 구분 (기능이 다르게 작동해야되기 떄문)
     **********************************************************/
    let mobile_size = 1024
    let device_status // pc mobile 구분
    let win_w // 브라우저 넓이

    function size_chk(){ 
        // 함수 정의 
         /* 처음에 브라우저가 로딩 되었을 때와 브라우저가 리사이즈 되었을 때 
            즉, 계산이 반복될 때 함수로 정의 후 계속 호출하는 방식) */
        win_w = $(window).width()
        if(win_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        console.log(device_status)
    }
    size_chk() // 함수 호출 (문서가 로딩된 이후 1번 실행)
    $(window).resize(function(){ // 리사이즈 될 때 마다 1번 실행
        size_chk() // 함수 호출
    })

    /*
        누구한테(1차 메뉴 li), 무엇을 했을 때('마우스를 올렸을 때')
        조건 --> li 중 오버를 한 것만 over 클래스 추가
                 메뉴에서 벗어나면 over 클래스 삭제
        결론: header .gnb .gnb_wrap ul.depth1 > li 에 over 클래스 추가

    */
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        // console.log('메뉴 오버')
        if(device_status == 'pc'){
            $(this).addClass('over')
        }
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave focusout', function(){
        // console.log('나감')
        $(this).removeClass('over')
    })

    /*
        누구한테(header .gnb), 무엇을 했을 때('마우스를 올렸을 때')
        조건 --> header.menu_over::before (흰색 배경) 안에서는 over 유지
        결론: header에 menu_over 클래스 추가
    */
    $('header .gnb').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            $('header').addClass('menu_over')
        }
    })
    $('header').on('mouseleave', function(){
        $(this).removeClass('menu_over')
    })

    /*  ------키보드 접근성------
        키보드 tab키로 이동할 때 메뉴가 종료되면?
            --> header menu_over 클래스가 사라지게 하기 위해서
        메뉴 다음에 나오는 button이나 a한테 focus가 가면 메뉴를 닫게 함 
    */
    $('header .util .lang .lang_open').on('focusin', function(){
        $('header').removeClass('menu_over')
    })
    
    /**********************************************************
     *  모바일에서 1차메뉴를 클릭하면 2차 메뉴 열기
     * 메뉴가 열려있으면 나 자신을 닫고
     * 메뉴가 닫혀있으면 열려있는 다른 메뉴는 닫고 나 자신은 열기
     * ----- 클릭 했을 때 메뉴가 열렸는지(li open 추가) 닫혔는지(open 클래스 없음) 판단
     **********************************************************/    
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'mobile'){
            e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
            if($(this).parent().hasClass('open') == true){
                //메뉴가 열려있는 상태 -- 나 자신을 닫고 끝냄
                $(this).parent().removeClass('open')
                $(this).next().slideUp()
            }else{
                //메뉴가 닫혀있는 상태 - 다른 메뉴를 전부 닫고 나만 열음
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp()
                $(this).parent().addClass('open')
                $(this).next().slideDown()
            }
            // console.log('모바일')
        }
    });
    /**********************************************************
     * header .gnb .gnb_open 클릭 --> header menu_open 클래스 추가
     * header .gnb .gnb_close 클릭 --> menu_open 클래스 삭제
     **********************************************************/

    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_open')
        $('header .gnb .gnb_bg').show()
    })
    $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_open')
        $('header .gnb .gnb_bg').hide()
    })
    
})//ready