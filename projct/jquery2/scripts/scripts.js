$(document).ready(function(){

    let openModal = $('.openModal');
    let modal = $('.modal');
    let modalCloseBtn = $('.modal .close');

    openModal.click(function(){
        modal.fadeIn(400);
    });


    modalCloseBtn.click(function(){
        modal.fadeOut(400);
    });
    
});