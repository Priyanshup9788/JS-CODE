let currentIndex=null;
document.addEventListener("DOMContentLoaded",displayrecords);

function displayrecords(){
    let recordlist=document.getElementById("recodr-list");
    recordlist.innerHTML="";

    let records=getrecords();

    if (records.length === 0){
        recordlist.innerHTML=`<tr><td colspan="4" class="text-center"> records not found </td></tr>`;
        return;
    }

    records.forEach((record,index) => {
        recordlist.innerHTML+=`
        <tr>
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.course}</td>
            <td>
                <button class="update-btn" onclick="loadrecord(${index})">Edit</button>
                <button class="delete-btn" onclick="deleterecord(${index})">Delete</button>
            </td>
        </tr>
        `
    });
    
}

//getrecord
function getrecords()
{
    const records=localStorage.getItem("records");
    return records?JSON.parse(records):[];  
}

//addrecord
function addRow()
{
    let name=document.getElementById("namee").value;
    let course=document.getElementById("course").value;

    if(name===""||course===""){
        alert("insert proper record");
        return;
    }
    let newRecord={
        id:genrateid(),
        name:name,
        course:course,
    }

    const records=getrecords();
    records.push(newRecord);
    localStorage.setItem("records",JSON.stringify(records));

    clearform();
    displayrecords();
}

//id genrator
function genrateid()
{
    let id=Math.floor(Math.random()*Date.now());
    return id;
}

function loadrecord(index)
{
    currentIndex=index;
    let records=getrecords();
    let record=records[currentIndex];
    document.getElementById("namee").value=record.name;
    document.getElementById("course").value=record.course;
}

//updaterecord
function updateRow()
{
    let records=getrecords();
    records[currentIndex].name=document.getElementById("namee").value.trim();
    records[currentIndex].course=document.getElementById("course").value.trim();
    localStorage.setItem("records",JSON.stringify(records));
    clearform();
    displayrecords();
}

//deleterecord
function deleterecord(index)
{
    const records=getrecords();
    records.splice(index,1);
    localStorage.setItem("records",JSON.stringify(records));
    displayrecords();
}

//clear
function clearform()
{
    document.getElementById("namee").value="";
    document.getElementById("course").value="";
    
}