const products = {
  monica:{name:"Monica R11",price:51300,image:"./images/image copy.png"},
moody:{name:"Moody",price:45300,image:"./images/image copy 2.png"},
lime:{name:"Lime 02(br)",price:35300,image:"./images/image copy 3.png"},
heavnly:{name:"Heavnly R02",price:42300,image:"./images/image copy 4.png"},
kafka:{name:"Kafka 01",price:16300,image:"./images/image copy 10g.png"},
brutal:{name:"Brutal 01",price:32100,image:"./images/image copy 9g.png"},
fuse:{name:"Fuse MGR1",price:23300,image:"./images/image copy 7g.png"},
mosh:{name:"Mosh 02",price:42300,image:"./images/image copy 8g.png"},
goxx:{name:"Goxx 03",price:45300,image:"./images/image copy 15g.png"},
paranoyd:{name:"paranoyd 03(cm)",price:38300,image:"./images/image copy 14g.png"},
eden:{name:"Eden 02(br)",price:51300,image:"./images/image copy 13g.png"},
riff:{name:"Riff 037",price:42300,image:"./images/image copy 12g.png"},
fata:{name:"Fata 01(bl)",price:38300,image:"./images/image copy 5g.png"},
alto:{name:"Alto GC9",price:47300,image:"./images/image copy 11g.png"}
};
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.forEach(item => {
    if(!item.quantity){
        item.quantity = 1;
    }
});
function removeItem(index){
    cart.splice(index,1);
    updateCart();
}
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
    sum += item.price * item.quantity;
    items.innerHTML += `
    <div class="cart-item">
        <img src="${item.image}" class="cart-thumb">
        <div class="cart-details">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <div class="qty-controls">
                <button onclick="decreaseQty(${index})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${index})">+</button>
            </div>
            <button class="remove-btn"
            onclick="removeItem(${index})">
            Remove
            </button>
        </div>
    </div>
    `;
});
        total.innerText=`Total: ₹${sum}`;
    }
}
function increaseQty(index){
    cart[index].quantity++;
    updateCart();
}
function decreaseQty(index){
    if(cart[index].quantity > 1){
        cart[index].quantity--;
    }
    else{
        cart.splice(index,1);
    }

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
        const existing = cart.find(
item => item.name === product.name
);

if(existing){
    existing.quantity++;
}
else{
    cart.push({
        ...product,
        quantity:1
    });
}
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
const checkoutBtn =
document.getElementById("checkoutBtn");

if(checkoutBtn){
    checkoutBtn.addEventListener("click",()=>{
        if(cart.length === 0){
            alert("Your cart is empty");
            return;
        }
        alert("Proceeding to checkout");
    });

}