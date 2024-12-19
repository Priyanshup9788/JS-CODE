let employess = [];
let nextId = 1;


document.getElementById("emp-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const salary = document.getElementById("salary").value;
    const perfomance = document.getElementById("performance").value;
    const projects = document.getElementById("projects").value.split(",").map(p => p.trim());

    addEmployee(name, department, salary, perfomance, projects);
    rendertbl();
    // this.reset();

});

document.getElementById("searchInput").addEventListener("keyup",renderfilter);


function addEmployee(name, department, salary, perfomance, projects) {
    employess.push({
        id: nextId++,
        name, department, salary, perfomance, projects
    });
}

function rendertbl() {
    if (employess.length === 0) {
        document.getElementById("empdata").innerHTML = `
            <tr colspan="7">no record</tr>
        `
    }
    else {
        document.getElementById("empdata").innerHTML = employess.map((emp) => `

            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>${emp.perfomance}</td>
                <td>${emp.projects}</td>
                <td class="actions">
                    <button onclick="rmvemp(${emp.id})">Delete</button>
                </td>
            </tr>

        `).join("");
    }
}
function rmvemp(id){
    employess=employess.filter(emp=>emp.id!==id);
    rendertbl();
}

function renderfilter()
{
    let value=document.getElementById("searchInput").value;
    let filterdata=employess.filter(emp=>emp.name.toLowerCase().includes(value.toLowerCase()));

    if (filterdata.length === 0) {
        document.getElementById("empdata").innerHTML = `
            <tr colspan="7">no record</tr>
        `
    }
    else{
    document.getElementById("empdata").innerHTML = filterdata.map((emp) => `

            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>${emp.perfomance}</td>
                <td>${emp.projects}</td>
                <td class="actions">
                    <button onclick="rmvemp(${emp.id})">Delete</button>
                </td>
            </tr>

        `).join("");
    }
}
rendertbl();
