

let ttl_case=document.getElementById("total-cases");
let recover_case=document.getElementById("recovered");
let ttl_death=document.getElementById("deaths");
let actv_case=document.getElementById("active-cases");
let counry_name=document.getElementById("country");
let srch_btn=document.getElementById("btn_srch");


srch_btn.addEventListener("click",createurl);

fetchdata("https://disease.sh/v3/covid-19/countries/india");

function createurl(){
  let country=document.getElementById("search").value; 
  let url=`https://disease.sh/v3/covid-19/countries/${country}`;
  fetchdata(url);
}

function fetchdata(url){
  
  fetch(url).then(response=>{
    if(response.ok){
    return response.json();
    }
    else{
        console.log(response.status);
    }
  }).then(data=>{
    counry_name.innerText=data.country;
    ttl_case.innerText=data.cases;
    recover_case.innerText=data.tests;
    ttl_death.innerText=data.deaths;
    actv_case.innerText=data.active;
  });
}
