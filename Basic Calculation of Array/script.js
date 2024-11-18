
let prevbtn=document.querySelectorAll(".prev");


let nextbtn=document.querySelectorAll(".next");
nextbtn.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        nextbtn.forEach(btn=>{
            btn.parentElement.style.backgroundColor="#fff"
        });
        
        let current=btn.parentElement;
        let next=current.nextElementSibling;

        if(next){
        current.style.backgroundColor="rgb(221, 248, 125)";
        next.style.backgroundColor="#e679d3";
        }

    })
});

prevbtn.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        prevbtn.forEach(btn=>{
            btn.parentElement.style.backgroundColor="#fff"
        });
        
        let current=btn.parentElement;
        let prev=current.previousElementSibling;

        if(prev){
        current.style.backgroundColor="rgb(221, 248, 125)";
        prev.style.backgroundColor="#e679d3";
        }

    })
});


