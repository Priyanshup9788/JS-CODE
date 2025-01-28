//Q1

class Product {

    constructor() {
        this.prod_list = ["shirt", "T-shirt", "Pant"];
        this.render();
    }

    render() {
        let div = document.createElement("div");
        let btn = document.createElement("button")
        btn.id = "btn";
        btn.style.width = "200px";
        btn.style.height = "20px";
        btn.textContent = "enter"
        let input = document.createElement("input");
        input.id = "search";
        input.placeholder = "enter product name";

        let list = document.createElement("p");
        list.id = "status";

        div.appendChild(input)
        div.appendChild(btn)
        div.appendChild(list);
        document.body.appendChild(div);

        btn.addEventListener("click", () => this.search())
    }

    search() {
        let value = document.getElementById("search").value;
        let list = this.prod_list;
        let result = list.filter((prod) => prod == value)
        if (result.length > 0) {
            document.getElementById("status").textContent = `${result} is available`;
        }
        else {
            document.getElementById("status").textContent = `Not available`;
        }
    }
}

// const q1=new Product();

// Q2

class login {
    constructor() {
        this.render();
    }

    render() {
        let email_field = document.createElement("input");
        email_field.id = "email_fld";
        email_field.placeholder = "Enter Email";
        let pass_field = document.createElement("input");
        pass_field.id = "pass_fld";
        pass_field.placeholder = "Enter Password";

        let signup_btn = document.createElement("button");
        signup_btn.id = "sign-up";
        signup_btn.textContent = "SignUp";

        let validat = document.createElement("p");
        validat.id = "validate";

        let br = document.createElement("br");

        let div = document.createElement("div");

        div.appendChild(email_field);
        div.appendChild(pass_field);
        div.appendChild(signup_btn);
        div.appendChild(br);
        div.appendChild(validat);

        document.body.appendChild(div);

        signup_btn.addEventListener("click", () => this.validate())

    }

    validate() {

        document.getElementById("validate").textContent = "";

        let email = document.getElementById("email_fld").value.trim();
        let pass = document.getElementById("pass_fld").value.trim();

        console.log(email.includes("@"))

        if (!email.includes("@")) {
            document.getElementById("validate").textContent = "email must contain @ Symbol";
            return;
        }

        if (pass.length < 6) {
            document.getElementById("validate").textContent = "Password must be greater than 6 characters";
            return;
        }

        alert("user signed Up");
    }
}

//const Q2=new login();

class todo {
    constructor() {
        
        this.render();
        
    }

    render() {
        document.body.innerHTML = "";
        let add_field = document.createElement("input");
        add_field.id = "add";
        add_field.placeholder = "enter task";
        let add_btn = document.createElement("button");
        add_btn.id = "add_btn";
        add_btn.textContent = "Add Task";

        let upperdiv = document.createElement("div");
        upperdiv.id = "upper_div";

        let lowerdiv = document.createElement("div");
        lowerdiv.id = "lower_div";

        let tbl = document.createElement("table");
        tbl.innerHTML = `<tbody id="tblbody">

        </tbody>`

        upperdiv.appendChild(add_field);
        upperdiv.appendChild(add_btn);

        lowerdiv.appendChild(tbl)

        document.body.appendChild(upperdiv);
        document.body.appendChild(lowerdiv);

        


        let records = localStorage.getItem("tasks");
        records = records ? JSON.parse(records) : [];

        let tbllist = document.getElementById("tblbody");
        tbllist.innerHTML = "";

        if (records.length > 0) {
           
            records.forEach((taskk) => {
                tbllist.innerHTML += `
                <tr>
                    <td>${taskk.task}</td>
                    <td><button class="remove" >Delete</button></td>
                </tr>

            `
            });

            let btns=document.querySelectorAll(".remove");
            console.log(btns)
            btns.forEach((btn,index)=>{
                btn.addEventListener("click",()=> this.removerecord(index))
            })

        }
        else {
            tbllist.innerHTML = "No Records Found";
        }
        document.getElementById("add_btn").addEventListener("click", () => this.add());

    }

    removerecord(index) {
        console.log("remov");
            let records = localStorage.getItem("tasks");
            records = records ? JSON.parse(records) : [];
            console.log(records)
            records.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(records));

            this.render();
        }

    add() {
        let task = document.getElementById("add").value;


        if (task === "") {
            alert("can't empty");
        }
        else {
            let records = localStorage.getItem("tasks");
            records = records ? JSON.parse(records) : [];

            let newtask = { task }

            records.push(newtask);

            localStorage.setItem("tasks", JSON.stringify(records));

            this.render();
        }

    }
}

// const Q3 = new todo();

// Counter (Increment/Decrement):

class Counter{
    constructor()
    {
        this.render();
    }

    render(){
        let div=document.createElement("div");
        let btn1=document.createElement("button");
        btn1.id="inc";
        btn1.textContent="Increment";

        let btn2=document.createElement("button");
        btn2.id="dec";
        btn2.textContent="Decrement";

        let p=document.createElement("p");
        p.id="count";
        p.textContent=0;

        div.appendChild(btn1);
        div.appendChild(p);
        div.appendChild(btn2);
        

        document.body.appendChild(div);

        btn1.addEventListener("click",()=>this.increment());
        btn2.addEventListener("click",()=>this.decrement());
    }

    increment()
    {
        let count=parseInt(document.getElementById("count").textContent);
        count++;
        document.getElementById("count").textContent=count;
    }

    decrement()
    {
        let count=parseInt(document.getElementById("count").textContent);
        if(count<=0)
        {
           return;
        }
        count--;
        document.getElementById("count").textContent=count;
    }

}

// const q4=new Counter();

// Q5 Toggle Light/Dark Mode:

class Theme{
    constructor()
    {
        this.render();
    }

    render(){
        let div=document.createElement("div");
        let btn=document.createElement("button");
        btn.id="theme";
        btn.textContent="Toggle Theme";

        let p=document.createElement("p");
        p.id="status";
        p.textContent="Light Mode";

        div.appendChild(btn);
        div.appendChild(p);

        document.body.appendChild(div);

        btn.addEventListener("click",()=>this.toggle());
    }

    toggle(){
        let status=document.getElementById("status").textContent;
        document.body.style.backgroundColor="white";
        if(status=="Light Mode")
        {
            document.getElementById("status").textContent="Dark Mode";
            document.body.style.backgroundColor="black";
            document.body.style.color="white";
        }
        else{
            document.getElementById("status").textContent="Light Mode";
            document.body.style.backgroundColor="white";
            document.body.style.color="black";
        }
    }
}

const q5=new Theme();

