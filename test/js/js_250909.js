

$(document).ready(function(){
    console.log('11111111')

    $('.box').on('mouseenter', function(){
        console.log('오버함')
        $('.box').addClass('on')
    })
    $('.box').on('mouseleave', function(){
        console.log('내려감')
        $('.box').removeClass('on')
    })
})//$(document).ready

console.log('2연결되었습니다.')