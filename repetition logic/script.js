function generateTable()
{
    let val=document.getElementById("number-input").value;

    if(val===""||isNaN(val)){
        alert("Invalid input!!");
        return;
    }

    let list = document.getElementById("table-list");

    list.innerHTML="";

    for(let i=1;i<=10;i++)
    {
        let iteam=document.createElement("li");
        iteam.textContent=`${val} x ${i} = ${val * i}`;
        list.appendChild(iteam);
    }
}