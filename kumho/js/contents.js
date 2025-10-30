$(document).ready(function(){
    
    /*
        인터렉티브의 시작은 영역이 브라우저 상단에 닿았을 때
        영역의 상단값 보다 스크롤 된 값이 크면 = 인터렉티브 시작
        ceo_area_start < ceo_scroll
        인터렉티브의 종료는 영역의 하단이 브라우저 하단 위로 올라올 때
        ceo_area_end - ceo_win_h < ceo_scroll

        - 영역 안에 들어가기 전 (인터렉티브 : 시작 전)
        - 영역에 들어갔을 때 (: 진행중)
        - 영역에서 벗어났을 때 (: 종료)
    */
    let ceo_length = $('.ctn_ceo').length
    function ceo_ani(){
        let ceo_win_h = $(window).height() //브라우저의 높이 (중복방지를 위해 ceo 붙임)
        let ceo_scroll = $(window).scrollTop() //현재 스크롤 된 값
        let ceo_area_name = $('.ctn_ceo .ceo_head') //선택자
        let ceo_obj_wrap = $('.ctn_ceo .ceo_head .ceo_photo') //애니메이션 대상 - 선택자
        let ceo_obj = $('.ctn_ceo .ceo_head .ceo_photo .ceo_img') //넓이가 조종되는 요소
        let ceo_obj_start = 50
        let ceo_obj_end = 100
        let ceo_obj_count //현재 계산한 넓이값
        let ceo_obj_bg = $('.ctn_ceo .ceo_head .ceo_photo .ceo_img .bg') //배경을 어둡게
        let ceo_obj_bg_start = 0
        let ceo_obj_bg_end = 0.6
        let ceo_obj_bg_count //현재 opacity의 값
        let ceo_area_start = ceo_area_name.offset().top //맨 위 기준 계산, 시작위치
        let ceo_area_end = ceo_area_start + ceo_area_name.height() - ceo_win_h //맨 위 기준 계산, 끝 위치
        let ceo_total = ceo_area_end - ceo_area_start //전체 스크롤 값
        let ceo_diff//'진행중' 이후에 스크롤 된 값
        let ceo_per //스크롤 된 값이 몇 %인지

        // console.log(ceo_total)

        /*
            '진행중'일 때 또는 시작 되었을 때 몇 % 스크롤 했는지 계산 해야함 
            (ex. 1000pc 동안 인터렉티브를 할 건데, 100px 스크롤 함 = 10%)
            현재 스크롤값(ceo_diff) x 100 / 전체값(ceo_total) = %

            처음의 img넓이값 50 - 종료 img넓이값 100
            (100-50) * 50/100 + 50  == 25 + 50 = 75 (진행율이 50%)
            현재넓이=처음넓이+(최종넓이−시작넓이)×(진행률/100)
        */

        // console.log('시작', ceo_area_start, '종료', ceo_area_end, '스크롤', ceo_scroll)
        if(ceo_scroll > ceo_area_end){
            // console.log('종료')
            ceo_obj_wrap.attr('data-status', 'end')
            ceo_obj.width(ceo_obj_end + '%')
            ceo_obj.height(ceo_obj_end + '%')
            ceo_obj_bg.css('opacity', ceo_obj_bg_end)
        }else if(ceo_scroll < ceo_area_start){
            // console.log('시작전')
            ceo_obj_wrap.attr('data-status', 'start')
            ceo_obj.width(ceo_obj_start + '%')
            ceo_obj.height(ceo_obj_start + '%')
            ceo_obj_bg.css('opacity', ceo_obj_bg_start)
        }else{
            // console.log('진행중')
            ceo_obj_wrap.attr('data-status', 'ing')
            ceo_diff = ceo_scroll - ceo_area_start
            ceo_per = ceo_diff * 100 / ceo_total
            // console.log(ceo_diff, ceo_total, ceo_per)
            ceo_obj_count = ceo_obj_start + (ceo_obj_end - ceo_obj_start) * (ceo_per/100)
            ceo_obj_count = ceo_obj_count * 1.2
            if(ceo_obj_count > ceo_obj_end){ //end값 이상을 넘지 못하게 (100보다 크면 다시 100으로 만듬)
                ceo_obj_count = ceo_obj_end
            }
            // console.log(ceo_obj_count)
            ceo_obj.width(ceo_obj_count + '%')
            ceo_obj.height(ceo_obj_count + '%')
            ceo_obj_bg_count = ceo_obj_bg_start + (ceo_obj_bg_end - ceo_obj_bg_start) * (ceo_per / 100)
            ceo_obj_bg_count = ceo_obj_bg_count * 1.2
            if(ceo_obj_bg_count > ceo_obj_bg_end){
                ceo_obj_bg_count = ceo_obj_bg_end
            }
            ceo_obj_bg.css('opacity', ceo_obj_bg_count)
        }
    }
    if(ceo_length > 0){
        ceo_ani() //브라우저가 로딩 되었을 때 1번만
    }
    $(window).scroll(function(){
        if(ceo_length > 0){
            ceo_ani() //브라우저가 스크롤 될 때마다 1번만
        }
    })

})//ready