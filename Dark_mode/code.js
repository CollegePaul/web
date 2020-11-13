
const toggle = document.getElementById('dark');

toggle.addEventListener('click', handleToggle);

function handleToggle(){

    if(toggle.checked){
       
        document.body.style.color= 'white';
        document.body.style.background= '#333333';
        let nav =  document.getElementsByClassName('header');
        nav[0].style.background = '#222222';
        let card=  document.getElementsByClassName('card');
        for( var x = 0; x<card.length; x++){
            card[x].style.background = '#222222';
        }
       

       
    }else{

        document.body.style.color= '#111111';
        document.body.style.background= 'white';
        let nav =  document.getElementsByClassName('header');
        nav[0].style.background = 'gainsboro';
        let card=  document.getElementsByClassName('card');
        for( var x = 0; x<card.length; x++){
            card[x].style.background = 'gainsboro';
        }

    }
    
}