$(function(){


    /**
     * 
     * @header
     * 밑으로 스크롤시 배경생성
     * 
     */
    let lastScroll = 0;

    $(window).scroll(function(){
        curr = $(this).scrollTop(); //현재스크롤바 시작 위치
        hereOffset = $('.sc_vis').offset().top; //문서전체에서 그놈의 시작지점


        html=`스크롤 바의 위치 :${curr}<br>
        타겟(here)의 위치 : ${hereOffset}
        `
        if (curr > hereOffset ) {
            $('header').removeClass("deactive");
            $('header').addClass('hide');
            $('header svg').css('fill','#000');
        } else {
            $('header').removeClass('hide');
            $('header').addClass("deactive");
            $('header svg').css('fill','var(--color-yellow1)');
        }
        lastScroll = curr;

    })


     /**
     * @sidemenu
     * 
     */
    $('.header .btn-nav').click(function(e){ ///이벤트
        e.preventDefault(); //이벤트막기

        if(!$(this).hasClass('on')){
            showMenu.restart();// 메뉴버튼 클릭시에도 작동하려고
        }


        $('.header .side-nav,.header .btn-nav').toggleClass('on');
        $('body').toggleClass('scroll_hidden');
       
    })         

    gsap.set('.side-nav .side_menu .nav',{
        yPercent:100
    })

    showMenu = gsap.to('.side-nav .side_menu .nav',{
        yPercent:0,
        stagger:0.1,
        paused:true
    })

    // 메인비쥬얼 왼쪽영역
    gsap.from('.sc_vis .group_vis .group_intro > *',{
        delay:1,
        opacity:0,
        y:20,
        stagger:0.1
    })

    
    // 텍스트 효과
    const headTxt = new SplitType('.sc_vis .group_vis .group_intro .title', { types: 'words, chars', });


    gsap.set('.sc_vis .group_vis .group_intro .title .char',{
        yPercent:100,
        opacity:0,

    })
    gsap.to('.sc_vis .group_vis .group_intro .title .char',{
        yPercent:0,
        opacity:1,
        stagger:0.08
    })







     /**
     * @slide
     * 
     */
    var mainSlide = new Swiper(".main_slide", {
        spaceBetween: 3,
        loop:true,
        speed:1000,
        parallax: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    
    });

    mainSlide.on('slideChange',function(){
        gaugeMotion.restart();
    })

    $('.main_slide .btn-autoplay').click(function(){

        if ($(this).hasClass('on')) {
            gaugeMotion.resume();
        } else {
            gaugeMotion.pause();
        }
        //isOn = ($(this).hasClass('on'))?gaugeMotion.resume():gaugeMotion.pause();
        $(this).toggleClass('on');
        
    })

    gaugeMotion = gsap.to('.gauge .curr',5,{
        height:'100%',
        ease:'none',
        paused:true,
        onComplete:function(){
            mainSlide.slideNext();
        }
    })
    gaugeMotion.play();


    /**
     * @service
     * 
     */

    $('.nav').click(function(e){
        e.preventDefault();
        if ($(this).hasClass('on')) { //있습니까?
            $(this).removeClass('on').siblings('.sub').stop().slideUp();
            $('.plus').text("+");
        } else { //첫클릭?
            $('.nav').removeClass('on').siblings('.sub').stop().slideUp();
            $(this).addClass('on').siblings('.sub').stop().slideDown();
            $('.plus').text("-");
            
            // offset = $(this).offset().top - $('.sc_service .group_service .nav').height();
            offset = $(this).offset().top - 96;
            window.scrollTo({top:offset,behavior:"smooth"})
        }
    })

    



    /****
     *  
     *  스크롤시 아래서 위로 효과
     * 
     * 
     */

    // gsap.to('',{
    //     scrollTrigger:{
    //         trigger:"",
    //         start:"",
    //         end:"",
    //         markers:true,
    //     },
    //     // 

    // })

   $('[data-scroll]').each(function(i,e){
        child=$(this).find('>*');
        gsap.from(child,{
            scrollTrigger:{
                trigger:$(this),
                start:"0% 50%",
                end:"100% 0%",
                toggleActions: "play pause resume pause",
                // markers:true,
            },
            opacity:0,
            yPercent:10,
            stagger:0.1,
        })
   })


   /**
    * 
    *  마우스 커서
    * 
    *  */ 
   $(document).mousemove(function(e){
        gsap.to('.cursor',0.3,{
            x:e.clientX,
            y:e.clientY,
        })
   })

   $('a').hover(function(){
        $('.cursor').addClass('on')
    },function(){
       $('.cursor').removeClass('on')
   })




       
})
