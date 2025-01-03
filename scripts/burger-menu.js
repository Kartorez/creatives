document.addEventListener('DOMContentLoaded', function(){
    const body=document.body;
    const menu=document.querySelector('.burger-menu');
    const menuBody=document.querySelector('.header__menu');
    const header = document.querySelector('header');
    
    //меню
    menu.addEventListener('click', function(){
      body.classList.toggle('no-scroll');
      menuBody.classList.toggle('active');
      menu.classList.toggle('active');
    });

    document.addEventListener('click',function(){
      const target=event.target;
      if(!target.closest('.burger-menu') && !target.closest('.header__menu') )
    {
      menu.classList.remove('active');  
      menuBody.classList.remove('active');
      body.classList.remove('no-scroll');  
    }
    });
});