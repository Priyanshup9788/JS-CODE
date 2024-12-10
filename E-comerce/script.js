console.log("syegf")

let sampledata=[
    {
        img:"prod-main1.webp",
        name:"CHAPTER ONE",
        desc:"Eau De Parfum",
        price:"11,400",
        qnty:50
    },
    {
        img:"prod-main2.webp",
        name:"Cutting Rain",
        desc:"Eau De Parfum",
        price:"11,400",
        qnty:50
    },
    {
        img:"prod-main3.webp",
        name:"Oud Mangifera",
        desc:"Eau De Parfum",
        price:"11,400",
        qnty:50
    }
];


class header{
    constructor(){
        this.render();
    }

    render()
    {
        let count=JSON.parse(localStorage.getItem("cart")).length
        document.getElementById("header").innerHTML=`
            <nav class="navbar navbar-expand-lg navbar-light bg-primary">
            <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand text-white" href="#">Hidden brand</a>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active text-white" aria-current="page" href="index.html">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link text-white" href="cart.html">Cart(<span id="cart-count">${count}</span>)</a>
                  </li>
                </ul>
                <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-dark" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>
        `;
    }

    updateCartCount(count) {
        document.getElementById("cart-count").textContent = count;
      }

}

class main{
    constructor(product,cart)
    {
        this.product=product;
        this.cart=cart;
        this.render();
    }

    render()
    {
        let prod_section=document.getElementById("product-section");
        let container=document.createElement("div");
        container.classList.add="container";
        let row=document.createElement("div");
        row.classList.add("row");
        row.classList.add("gx-5");
        prod_section.appendChild(container);
        container.appendChild(row);
        row.innerHTML=this.product.map((product)=>`
                    <div class="col-4">
                        <div class="prod-container">
                            <img src="img/${product.img}" class="img-fluid prod-img" alt="">
                            <div class="contant px-2">
                                <h3 class="fs-6 mb-0">${product.name}</h3>
                                <div class="d-flex justify-content-between">
                                    <p class="fs-6">${product.desc}</p>
                                    <p class="fs-6">Rs. ${product.price} | ${product.qnty} ml</p>
                                </div>
                                  <button type="button" class="btn btn-outline-dark w-100" onclick="cart.addTocart('${product.img}','${product.name}','${product.desc}','${product.price}','${product.qnty}')">Add to Cart</button>
                            </div>
                        </div>
                    </div>
        `).join("");

  
        

        
    }
}

class footer{
    constructor(){
        this.render();
    }

    render()
    {
        document.getElementById("footer").innerHTML=`
        
            <div class="bg-primary">
                <p class="text-center text-white fs-6">All rights reserved | © 2024, E-commerce </p>
            </div>
        
        `;
    }
}

class Cart{
    constructor(){
        this.items = JSON.parse(localStorage.getItem("cart")) || [];
        this.updateCartDisplay();
    }

    addTocart(img,name,desc,price,qnty) {
        console.log("data")
        this.items.push({img,name,desc,price,qnty});
    
        console.log(this.items);

        localStorage.setItem("cart", JSON.stringify(this.items));
        this.updateCartDisplay();
    
        alert(`${name} added to the cart!`);
    }

    updateCartDisplay() {
        const navbar = new header();
        navbar.updateCartCount(this.items.length)
    }

    displayCartItems() {
        const cartItemsContainer = document.getElementById("cart-section");
    
        if (this.items.length === 0) {
          cartItemsContainer.innerHTML = `<p class="text-center"> Your cart is empty</p>`;
        } else {
          cartItemsContainer.innerHTML = this.items
            .map(
              (item) => `

                <div class="cart-item my-3 ">
                    <div class="d-flex flex-wrap flex-row justify-content-center">
                        <img src="img/${item.img}" alt="desc" height="120" width="120" >
                        <div class="cart-details  mt-2">
                            <h4>${item.name}</h4>
                            <h6>RS.${item.price}</h6>
                            <button type="button" onclick="cart.removeFromCart('${item.name}')" class="btn btn-secondary">Remove</button>
                        </div>
                    </div>
                </div>
            `
            )
            .join("");
        }
    }

    removeFromCart(name) {
        this.items = this.items.filter((item) => item.name !== name);
        localStorage.setItem("cart", JSON.stringify(this.items));
        this.displayCartItems();
        this.updateCartDisplay();
      }

}

const cart = new Cart();



new header();
new footer();

if(document.getElementById("product-section")){
    new header();

    new main(sampledata,cart);
}

if(document.getElementById("cart-section")){
    new header();

    cart.displayCartItems();
}