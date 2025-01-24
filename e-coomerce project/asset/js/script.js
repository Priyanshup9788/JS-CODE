let currentIndex = null;
if (document.getElementById("sign-up")) {
    document.getElementById("sign-up").addEventListener("click", function (e) {
        e.preventDefault();
        let name = document.getElementById("uname").value;
        let email = document.getElementById("emai-id").value;
        let pass = document.getElementById("pass").value;

        if (name === "" || email === "" || pass === "") {
            alert("fill all fields");
        }
        {
            let uid = genrateid();
            let newUser = {
                uid,
                name,
                email,
                pass
            }

            const userRecord = getUserRecords();
            userRecord.push(newUser);
            localStorage.setItem("user", JSON.stringify(userRecord));
            alert("User Created Successfullyyyy....");
            window.location.href = "../../login.html"
        }
    });
}

if (document.getElementById("reset-btn")) {
    document.getElementById("reset-btn").addEventListener("click", function (e) {
        e.preventDefault();
        email = document.getElementById("email-id").value;

        let userRecord = getUserRecords();

        let flag = 1;
        userRecord.forEach(user => {
            if (user.email === email) {
                flag = 0;
            }
        });
        if (flag === 1) {
            alert("invalid username");
        }
        if (flag === 0) {
            let passfield = document.getElementById("pass");
            passfield.style.display = "block"
            document.getElementById("reset-btn").style.display = "none";
            let reset_btn = document.getElementById("reset-btn2");
            reset_btn.style.display = "block"
        }

    });
}


if (document.getElementById("reset-btn2")) {
    document.getElementById("reset-btn2").addEventListener("click", function (e) {
        e.preventDefault();
        let pass = document.getElementById("pass").value;
        let email = document.getElementById("email-id").value;
        let userRecord = getUserRecords();
        let currentIndex = null;
        userRecord.forEach((user, index) => {
            if (user.email === email) {
                currentIndex = index;
            }
        });
        if (currentIndex !== null) {
            userRecord[currentIndex].pass = pass;
            localStorage.setItem("user", JSON.stringify(userRecord));
            document.getElementById("reset-btn2").style.display = "none";
            let reset_btn = document.getElementById("reset-btn");
            reset_btn.style.display = "block"
            alert("Password updated successfully....");
            window.location.href = "../../login.html";
        }
    });
}

if (document.getElementById("log-in")) {
    document.getElementById("log-in").addEventListener("click", function (e) {
        e.preventDefault();
        let email = document.getElementById("email-id").value;
        let pass = document.getElementById("pass").value;

        const userRecord = getUserRecords();
        console.log("login")

        let flag = 1;
        userRecord.forEach(user => {
            if (user.email === email && user.pass === pass) {
                flag = 0;

                let login_status = getLoginStatuse();

                let uid = user.uid;
                let uname = user.name;

                user = {
                    uid, uname
                }

                login_status.push(user);

                localStorage.setItem("status", JSON.stringify(login_status));

            }
        });
        if (flag === 1) {
            alert("invalid username and password");
        }
        if (flag === 0) {
            window.location.href = "../../index.html";
        }
    });
}

if (document.getElementById("dashboard")) {
    document.getElementById("products").addEventListener("click", () => {
        window.location.href = "../../add_product.html";
    })
}
if (document.getElementById("dashboard")) {
    document.getElementById("users").addEventListener("click", () => {
        window.location.href = "../../users.html";
    })
}

if (document.getElementById("add-category")) {
    load_category();
    document.getElementById("cat-btn").addEventListener("click", function (e) {
        e.preventDefault();
        let cat_name = document.getElementById("category").value;

        let categories = getCategoryRecords();
        if (cat_name === "") {
            alert("Please enter category name");
        }
        else {
            let newCat = { cat_name }
            categories.push(newCat);
            localStorage.setItem("category", JSON.stringify(categories));
        }
        load_category();
    });

    document.getElementById("update-btn").addEventListener("click", (e) => {
        e.preventDefault();
        let records = getCategoryRecords();
        records[currentIndex].cat_name = document.getElementById("category").value.trim();
        localStorage.setItem("category", JSON.stringify(records));
        document.getElementById("category").value = "";
        document.getElementById("update-btn").style.display = "none";
        document.getElementById("cat-btn").style.display = "block";
        load_category();
    });
}

if (document.getElementById("add-product")) {
    let cat_list = document.getElementById("cat_list");
    cat_list.innerHTML = ""
    let cat_records = getCategoryRecords();
    cat_records.forEach(record => {
        cat_list.innerHTML += `
            <option value="${record.cat_name}">${record.cat_name}</option>
        `
    });

}

function load_category() {
    let categories = getCategoryRecords();
    cat_tbl = document.getElementById("cat_data")
    cat_tbl.innerHTML = "";
    if (categories.length === 0) {
        cat_tbl.innerHTML = `
            <tr>
                <td>No Records</td>
            </tr>
        `
    }
    else {
        categories.forEach((category, index) => {
            cat_tbl.innerHTML += `
            <tr>
                <th scope="row"><button class="btn fs-5"></button></th>
                <td>
                    <p class="fs-6 mt-2">${category.cat_name}</p>
                </td>
                <td>
                    <button class="btn btn-primary" onclick="loadCatRecord(${index})" >Edit</button>
                    <button class="btn btn-danger" onclick="deleteCatRecord(${index})" >Delete</button>
                </td>
                
              </tr>
        `
        });
    }
}


// add Products

if (document.getElementById("add-product")) {
    load_producttbl();
    document.getElementById("add_prd").addEventListener("click", function (e) {
        e.preventDefault();

        let product_name = document.getElementById("prd_name").value;
        let product_desc = document.getElementById("prd_desc").value;
        let product_price = document.getElementById("prd_price").value;
        let product_cat = document.getElementById("prd_cat").value;
        let product_img = document.getElementById("prd_img").value;
        product_img = product_img.replace(/^.*[\\\/]/, '');
        // let product_img=document.getElementById("prd_img").value();
        let pid = genrateid();
        let new_prd = {
            pid: pid,
            product_name,
            product_desc,
            product_price,
            product_cat,
            product_img
        };

        let allProducts = getProductRecords();

        allProducts.push(new_prd);

        localStorage.setItem("product", JSON.stringify(allProducts));

        load_producttbl();


    });
}

// landing page

if (document.getElementById("mySwiper")) {
    let prod_card = document.getElementById("swiper_product");
    prod_card.innerHTML = "";

    let products = getProductRecords();
    products.forEach((product, index) => {
        prod_card.innerHTML += `
            <div class="swiper-slide">
                            <a href="single-product.html?index=${index}">
                            <div id="prod_card_slider" class="text-center">
                                <div class="pro_img">
                                    <img src="asset/image/${product.product_img}" alt="product-img-1">
                                    <a href="javascript:void(0)" onclick="addcart(${product.pid})" class="btn1">ADD TO CART</a>
                                </div>
                                <h4 class="card-title content-space">${product.product_name}</h4>
                                <span class="price">$${product.product_price}</span>
                            </div>
                            </a>
                        </div>
        `
    });
}

if (document.getElementById("single_prd")) {
    const urlParams = new URLSearchParams(window.location.search);
    const indexValue = urlParams.get('index');
    console.log(indexValue);

    let product_section = document.getElementById("prod_section");
    product_section.innerHTML = "";

    let products = getProductRecords();

    product_section.innerHTML = `
    <div class="col-6">
                        <div class="prod-img w-100">
                            <img src="asset/image/${products[indexValue].product_img}" class="w-100" alt="product">
                        </div>
                    </div>
                    <div class="col-6 d-flex justify-content-center flex-column">
                        <h4 class="card-title content-space fs-2 mb-3">${products[indexValue].product_name}</h4>
                        <span class="price fs-4">$15.00</span>
                        <p class="desc fw-light mt-4">
                            ${products[indexValue].product_desc}
                        </p>
                        <div class="cart d-flex wrap">
                            <span class="cart-num px-3 py-3 border">1</span>
                            <div class="inc-dec d-flex flex-column">
                                <span class="cart-num px-2 py-1 border">+</span>
                                <span class="cart-num px-2 py-1 border">-</span>
                            </div>
                            <a href="javascript:void(0)" onclick="addcart(${products[indexValue].pid})" class="add-cart text-decoration-none fs-5 ms-2">ADD TO CART</a>
                        </div>

                        <div class="prod-info mt-5">
                            <span>Category : </span>
                            <span>${products[indexValue].product_cat}</span>
                            <br>
                        </div>
                    </div>
  `
}

if (document.getElementById("shop_disp")) {
    let shop_disp = document.getElementById("shop_disp");
    shop_disp.innerHTML = "";

    let products = getProductRecords();

    products.forEach((product, index) => {
        
        shop_disp.innerHTML += `
            <div class="col-4">
                <a href="single-product.html?index=${index}">
                        <div class="card">
                            <div class="pro_img w-100">
                                <img src="asset/image/${product.product_img}" class="w-100" alt="product">
                                <a href="javascript:void(0)" class="btn1 text-decoration-none" onclick="addcart(${product.pid})" >ADD TO CART</a>
                            </div>
                            <div class="prod-cont text-center">
                                <h4 class="card-title content-space">${product.product_name}</h4>
                                <span class="price">$${product.product_price}</span>
                            </div>
                        </div>
                </a>
            </div>
        `
    })
}

// log in status
if (document.getElementById("status")) {
    statuse = document.getElementById("status");

    let loginStatus = getLoginStatuse();

    if (loginStatus.length === 0) {
        statuse.textContent = "login";
        statuse.addEventListener("click", () => {
            window.location.href = "login.html"
        })
    }
    else {
        statuse.textContent = loginStatus[0].uname;
        statuse.addEventListener("click", () => {
            const records = getLoginStatuse();
            records.splice(0, 1);
            localStorage.setItem("status", JSON.stringify(records));
            window.location.href = "login.html"
        })
    }

}

// cart page

if(document.getElementById("cart-list"))
{
    let cart_tbl=document.getElementById("cart-list");
    let cart_data=getCart();

    let login_status=getLoginStatuse();

    let sub_total=0;

    cart_data.forEach(cart=>{
        if(login_status[0].uid===cart.uid)
        {
            cart_tbl.innerHTML+=`
                 <tr>
                        <th scope="row"><button class="btn fs-5">x</button></th>
                        <td>
                            <div class="row">
                                <div class="col-1 d-flex wrap justify-center">
                                    <img src="asset/image/${cart.product_img}" height="50px" width="50px" alt="product">
                                </div>
                                <div class="col-11">
                                    <p class="fs-6 mt-2">${cart.product_name}</p>
                                </div>
                            </div>
                        </td>
                        <td><p class="price fs-6 mt-2">${cart.product_price}$</p></td>
                        <td>
                            <div class="cart d-flex wrap">
                                <div class="d-flex wrap align-center">
                                    
                                <span id="qnt_inc" class="cart-num px-2 py-1 border">+</span>
                                <span id="qnt_val" class="cart-num px-2 py-2 border">${cart.qnt}</span>
                                <span id="qnt_desc" class="cart-num px-2 py-1 border">-</span>
                                </div>
                                
                            </div>
                        </td>
                        <td>
                            <p class="price fs-6 mt-2">${cart.product_price*cart.qnt}$</p>
                        </td>
                      </tr>
                      
            `
            sub_total+=(cart.product_price*cart.qnt);
        }
    });

    let sub_ttl=document.getElementById("sub_ttl");

    sub_ttl.innerHTML=`${sub_total}$`;
}

// add to cart
function addcart(pid) {
    
    let products = getProductRecords();

    let cart1 = getCart();

    let flag = 0;
    cart1.forEach(cartt => {
        if (pid === cartt.pid) {
            console.log("double")
            let qnt=cartt.qnt;
            console.log(cartt.qnt)
            qnt++
            cartt.qnt=qnt;
            flag = 1;
        }
    })

    if (flag === 0) {
        products.forEach(product => {
            if (pid === product.pid) {
                let cart = getCart();


                let login_Status = getLoginStatuse();
                let uid = login_Status[0].uid;
                let product_img = product.product_img;
                let product_name = product.product_name;
                let product_price = product.product_price;
                let qnt = 1;

                let cartId = genrateid();
                let newCart = {
                    cartId,
                    uid,
                    pid,
                    product_img,
                    product_name,
                    product_price,
                    qnt
                }

                cart.push(newCart);

                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Product Added...")

            }
        })
    }
    else{
        

                localStorage.setItem("cart", JSON.stringify(cart1));

    }
}

// generate id
function genrateid() {
    let id = Math.floor(Math.random() * Date.now());
    return id;
}

//cart 
function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// login status
function getLoginStatuse() {
    const login_status = localStorage.getItem("status");
    return login_status ? JSON.parse(login_status) : [];
}

// load product table
function load_producttbl() {
    let prd_tbl = document.getElementById("prod_data");

    let prd_records = getProductRecords();
    prd_tbl.innerHTML = "";
    if (prd_records.length === 0) {
        prd_tbl.innerHTML += `<tr>No Records Found</tr>`
    }
    else {
        prd_records.forEach((product, index) => {
            prd_tbl.innerHTML += `
                <tr>
                <td><p class="fs-6 mt-2">${product.pid}</p></td>
                <td><img src="asset/image/${product.product_img}" height="50px" width="50px" alt="product"></td>
                <td><p class="fs-6 mt-2">${product.product_name}</p></td>
                <td><p class="fs-6 mt-2">${product.product_desc}</p></td>
                <td><p class="fs-6 mt-2">${product.product_price} $</p></td>
                <td><p class="fs-6 mt-2">${product.product_cat}</p></td>
                <td>
                    <button class="btn btn-primary" onclick="loadProdRecord(${index})" >Edit</button>
                    <button class="btn btn-danger" onclick="deleteProdRecord(${index})" >Delete</button>
                </td>
              </tr>
            `
        });
    }
}

// deleteProdRecord
function deleteProdRecord(index) {
    const records = getProductRecords();
    records.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(records));
    load_producttbl();
}

// load category
function loadCatRecord(index) {
    currentIndex = index;
    let records = getCategoryRecords();
    let record = records[currentIndex];
    document.getElementById("category").value = record.cat_name;
    document.getElementById("update-btn").style.display = "block";
    document.getElementById("cat-btn").style.display = "none";

}

// Category Delete
function deleteCatRecord(index) {
    const records = getCategoryRecords();
    records.splice(index, 1);
    localStorage.setItem("category", JSON.stringify(records));
    load_category();
}




//getuserrecord
function getUserRecords() {
    const user_data = localStorage.getItem("user");
    return user_data ? JSON.parse(user_data) : [];
}

//getproductrecord
function getProductRecords() {
    const product_data = localStorage.getItem("product");
    return product_data ? JSON.parse(product_data) : [];
}

//getcategoryrecord
function getCategoryRecords() {
    const category_data = localStorage.getItem("category");
    return category_data ? JSON.parse(category_data) : [];
}
