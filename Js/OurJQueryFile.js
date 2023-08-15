/* globla $,jQuery,alert,console*/
$(document).ready(function () {
    "use strict";

    //////////////////////////  loading animate  //////////////////////////////////

    $(window).on('load', function () {
            
      $(".Loading_page .sk-cube-grid").fadeOut(2000,function(){
        
        $("body").css("overflow","auto")
        $(this).parent().fadeOut(2000,function () {
          //Show Scroll
          
          // remove the section Loading_page
           $(this).remove()
        })
      })
    });


      /////////////////////////////     Move between sections  //////////////////////////

       
                //the InnerHeight return the all height was done by padding or height any thing
                var Offset_of_First_Section_ByInnerHeigth= $('.navbar').innerHeight()
                $('.navbar').css('height',Offset_of_First_Section_ByInnerHeigth)

                var lengthOfAncor=$('#MoveSections > li > a').length
                var ancorDirectChiled=$('#MoveSections > li > a')
                $('#MoveSections > li > a').click(function (e) {
                    e.preventDefault()
                    var move=$(this).text();
                          
                          $('html,body').animate({
                              scrollTop:$('#'+$(this).text()).offset().top - Offset_of_First_Section_ByInnerHeigth
                              
                          },1000);        
                });
      





      /////////////////////////////////////////////////////////////////////////////////////////

       ///////////////////////////////    Scroll top   //////////////////////////////////
      var ScrollButn= $("#Scroll-Top")
      $(window).scroll( function (){
        // Summrize If conndition this is better of hiding and show the button to scroll
       ($(this).scrollTop() >= 550)?ScrollButn.show(500):ScrollButn.hide(500)

      })

     // Scroll top move to up
    ScrollButn.on("click",function () {
    $("html,body").animate({  scrollTop:0 },2000)
     })


});