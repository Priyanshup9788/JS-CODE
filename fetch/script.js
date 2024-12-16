let fetc=document.getElementById("fetch");
let img_cont=document.getElementById("img_container");
let tbl_data=document.getElementById("tbl_data");
let url="https://jsonplaceholder.typicode.com/users";

function getData(){
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        tbl_data.innerHTML=""
        data.forEach(daata => {
            tbl_data.innerHTML+=`
            <tr>
                    <th scope="row">${daata.id}</th>
                    <td>${daata.name}</td>
                    <td>${daata.username}</td>
                    <td>${daata.email}</td>
                </tr>`
        });
        
        
    })
};

fetc.addEventListener("click",getData);

