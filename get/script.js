let fetch_btn=document.getElementById("fetch");


fetch_btn.addEventListener("click",buttonClickHandler);


function buttonClickHandler()
{
    
    let listcontainer=document.getElementById("user-list");

    listcontainer.innerHTML="";

    const xhr= new XMLHttpRequest();

    xhr.open("GET","https://jsonplaceholder.typicode.com/users",true);

    console.log("button clicked");

    xhr.onprogress = function(){
        console.log("progress");
    }

    xhr.onload=function(){
        if(this.status===200){

            let container=document.createElement("div");

            

            let response =JSON.parse( this.responseText);
            response.forEach(Data => {
                listcontainer.innerHTML+=`
                <tr>
                    <th scope="row">${Data.id}</th>
                    <td>${Data.name}</td>
                    <td>${Data.username}</td>
                    <td>${Data.email}</td>
                </tr>`
            });
        }
        else{
            console.log(this.status);
        }
    }

    xhr.send();
}



