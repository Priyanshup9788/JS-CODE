let submit_btn = document.getElementById("submit-btn");
let currentIndex = null;

if (document.getElementById("add-task")) {


    submit_btn.addEventListener("click", function (e) {
        e.preventDefault();

        let task_title = document.getElementById("task-title").value;
        let task_desc = document.getElementById("task-description").value;
        let due_date = document.getElementById("due-date").value;
        let priority = document.getElementById("priority").value;
        let category = document.getElementById("category").value;

        if (task_title === "" || task_desc === "" || due_date === "" || priority === "", category === "") {
            alert("Please fill all the fields");
            return;
        }

        let data = { task_title, task_desc, due_date, priority, category };


        let task_data = getRecord();
        task_data.push(data);

        setRecord(task_data);
        alert("Task Added Succsefullyy.....");

        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
        document.getElementById("due-date").value = "";
        document.getElementById("priority").value = "";
        document.getElementById("category").value = "";

        loadtbl();
    });

    document.getElementById("update-btn").addEventListener("click",function(e){
        e.preventDefault();
        let records = getRecord();
        records[currentIndex].task_title = document.getElementById("task-title").value;
        records[currentIndex].task_desc = document.getElementById("task-description").value;
        records[currentIndex].due_date = document.getElementById("due-date").value;
        records[currentIndex].priority = document.getElementById("priority").value;
        records[currentIndex].category = document.getElementById("category").value;
        console.log(records)
        setRecord(records);
        alert("Record Updated...");
        document.getElementById("submit-btn").style.display = "block";
        document.getElementById("update-btn").style.display = "none";
        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
        document.getElementById("due-date").value = "";
        document.getElementById("priority").value = "";
        document.getElementById("category").value = "";
        loadtbl();
    })


    loadtbl();

}

function loadtbl() {
    let task_data = getRecord();
    let table = document.getElementById("datatbl");

    table.innerHTML = "";
    if (task_data.length === 0) {
        table.innerHTML = `<tr><td colspan="4">No Task</td></tr>`;
        return;
    }

    task_data.forEach((data, index) => {
        table.innerHTML += `
          <tr>
                <td>${data.task_title}</td>
                <td>${data.task_desc}</td>
                <td>${data.due_date}</td>
                <td>${data.priority}</td>
                <td>${data.category}</td>
                <td>
                    <button class="btn-back" onclick="loadrecord(${index})">Edit</button>
                    <button class="btn-back" onclick="deleterecord(${index})">Delete</button>
                </td>
            </tr>  
        `;
    });

}

function loadrecord(index) {
    currentIndex = index;
    let records = getRecord();
    let record = records[currentIndex];
    document.getElementById("task-title").value = record.task_title;
    document.getElementById("task-description").value = record.task_desc;
    document.getElementById("due-date").value = record.due_date;
    document.getElementById("priority").value = record.priority;
    document.getElementById("category").value = record.category;
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("update-btn").style.display = "block";
}


function loadData() {
    let task_data = getRecord();
    let task_list = document.getElementById("task-list");

    task_list.innerHTML = "";
    if (task_data.length === 0) {
        task_list.innerHTML = "No Tasks";
        return;
    }

    task_data.forEach((data, index) => {
        task_list.innerHTML += `
            <li class="task ${data.priority}-priority">
                        <div class="task-header">
                            <span class="task-title">${data.task_title}</span>
                            <span class="priority">${data.priority}</span>
                        </div>
                        <p class="task-description">${data.task_desc}</p>
                        <div class="task-footer">
                            <span>Due:${data.due_date}</span>
                           
                        </div>
                    </li>
        `;
    });
}

function filterData(priority) {
    let task_data = getRecord();
    let task_list = document.getElementById("task-list");

    task_list.innerHTML = "";
    if (task_data.length === 0) {
        task_list.innerHTML = "No Tasks";
    }
    else {
        task_data.forEach((data, index) => {
            if (data.priority === priority) {
                task_list.innerHTML += `
            <li class="task ${data.priority}-priority">
                        <div class="task-header">
                            <span class="task-title">${data.task_title}</span>
                            <span class="priority">${data.priority}</span>
                        </div>
                        <p class="task-description">${data.task_desc}</p>
                        <div class="task-footer">
                            <span>Due:${data.due_date}</span>
                            <button class="btn-mark-completed" onclick="deleterecord(${index})">Mark as Completed</button>
                        </div>
                    </li>
        `;
            }
        });
    }

}

function setRecord(task_data) {
    localStorage.setItem("records", JSON.stringify(task_data));
}

function getRecord() {
    const records = localStorage.getItem("records");
    return records ? JSON.parse(records) : [];
}

function deleterecord(index) {
    const records = getRecord();
    records.splice(index, 1);
    setRecord(records)
    loadtbl();
}



if (document.getElementById("task-view")) {
    loadData();


    document.getElementById("priority").addEventListener("change", function () {
        let priority = document.getElementById("priority").value;
        if (priority === "all") {
            loadData();
            return;
        }
        filterData(priority);

    })

}