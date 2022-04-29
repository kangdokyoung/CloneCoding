$(document).ready(()=>{
    $(".circle1").click(()=>{
        $(".popmenu_c1").fadeIn();
        $("#body").css("background-color","rgba(0, 0, 0, 0.2)");
    });
    $(".exit_c1").click(()=>{
        $(".popmenu_c1").fadeOut();
        $("#body").css("background-color","#fff");

    });
});
