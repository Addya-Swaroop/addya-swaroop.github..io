const products = {
    monica:{name:"Monica R11",price:25300,image:"./images/image copy.png"},
    moody:{name:"Moody",price:25300,image:"./images/image copy 2.png"},
    lime:{name:"Lime 02(br)",price:25300,image:"./images/image copy 3.png"},
    heavnly:{name:"Heavnly R02",price:25300,image:"./images/image copy 4.png"},
    kafka:{name:"Kafka 01",price:32300,image:"./images/image copy 10g.png"},
    brutal:{name:"Brutal 01",price:32300,image:"./images/image copy 9g.png"},
    fuse:{name:"Fuse MGR1",price:32300,image:"./images/image copy 7g.png"},
    mosh:{name:"Mosh 02",price:32300,image:"./images/image copy 8g.png"},
    goxx:{name:"Goxx 03",price:32300,image:"./images/image copy 15g.png"},
    paranoyd:{name:"paranoyd 03(cm)",price:32300,image:"./images/image copy 14g.png"},
    eden:{name:"Eden 02(br)",price:32300,image:"./images/image copy 13g.png"},
    riff:{name:"Riff 037",price:32300,image:"./images/image copy 12g.png"},
    fata:{name:"Fata 01(bl)",price:32300,image:"./images/image copy 5g.png"},
    alto:{name:"Alto GC9",price:32300,image:"./images/image copy 11g.png"}
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart(){
    localStorage.setItem("cart",JSON.stringify(cart));

    const count=document.getElementById("cartCount");
    if(count) count.innerText=cart.length;

    const items=document.getElementById("cartItems");
    const total=document.getElementById("cartTotal");

    if(items){

        items.innerHTML="";

        let sum=0;

        cart.forEach((item,index)=>{

            sum+=item.price;

            items.innerHTML+=`
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <button onclick="removeItem(${index})">
                Remove
                </button>
            </div>
            `;
        });

        total.innerText=`Total: ₹${sum}`;
    }
}

function removeItem(index){
    cart.splice(index,1);
    updateCart();
}

updateCart();

const cartBtn=document.getElementById("cartBtn");
const drawer=document.getElementById("cartDrawer");
const overlay=document.getElementById("overlay");
const close=document.getElementById("closeCart");

if(cartBtn){
    cartBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        drawer.classList.add("open");
        overlay.classList.add("show");
    });
}

if(close){
    close.addEventListener("click",()=>{
        drawer.classList.remove("open");
        overlay.classList.remove("show");
    });
}

if(overlay){
    overlay.addEventListener("click",()=>{
        drawer.classList.remove("open");
        overlay.classList.remove("show");
    });
}

const search=document.getElementById("name");

if(search){

search.addEventListener("input",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".model,.specs")
.forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=
text.includes(value)
?"block":"none";

});

});
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if(id && document.getElementById("productName")){

    const product = products[id];

    document.getElementById("productName").innerText =
    product.name;

    document.getElementById("productPrice").innerText =
    "₹" + product.price;

    document.getElementById("productImage").src =
    product.image;

    document.getElementById("addCartBtn")
    .addEventListener("click",()=>{

        cart.push(product);

        updateCart();

        alert("Added to Cart");
    });
}
const desktopCartBtn =
document.getElementById("desktopCartBtn");

if(desktopCartBtn){
    desktopCartBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        drawer.classList.add("open");
        overlay.classList.add("show");
    });
}
document.querySelectorAll(".cartBtn").forEach(btn => {

    btn.addEventListener("click",(e)=>{

        e.preventDefault();

        drawer.classList.add("open");
        overlay.classList.add("show");

    });

});