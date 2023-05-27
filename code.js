// import fetch from "node-fetch";
const API = "https://api.escuelajs.co/api/v1";
const mainContainer = document.querySelector(".cards-container");

async function fetchData(urlApi){
    const response = (await fetch(urlApi)).json();
    return response;
}

const productsList = async (urlApi)=>{
    try{
        const products = await fetchData(`${urlApi}/products`);
        const categoryProducts = [];
        products.forEach(product => {
            if(product.category.id == 1){ //tengo que adaptar eso para que cargue en la homepage 4 elementos de cada categoria.
                categoryProducts.push(product);
            }
        })

    }
    catch(err){
        console.error(err);
    }
}

//makes the container of a category
function categoryContainerConstructor(category){
    let container = document.createElement("div");
    container.classList.add("category-list", `${category.name.replaceAll(" ", "-")}-category`);
    let categoryTitle = document.createElement("h2");
    categoryTitle.classList.add("category-title");
    categoryTitle.textContent = `${category.name}`;

    container.append(categoryTitle);

    return container;
}
function productCardConstructor(product){
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    let img = document.createElement("img");
    img.setAttribute("src", product.images[0]);
    
    let infoDiv = document.createElement("div");

    let price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `$ ${product.price}`;

    let title = document.createElement("p");
    title.classList.add("title");
    title.textContent = product.title;
    
    infoDiv.append(title, price);
    cardDiv.append(img, infoDiv);

    return cardDiv;
}
/* 
<div class="category-list clothes-category">
    <h2 class="category-title">Clothes</h2>
                
    <div class="card">
        <img src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg" alt="">
        <div>
            <p class="price">$ 150</p>
            <p class="title"> Bike </p>
        </div>
    </div>

</div> 
*/


const fetchCategories = async (urlApi)=>{
    try{
        const categories = await fetchData(`${urlApi}/categories`);
        categories.forEach(async(category) => {
            const categoryContainer = categoryContainerConstructor(category);
            mainContainer.append(categoryContainer);

            const products = await fetchProducts(urlApi, category);
            console.log(products)
            products.forEach(product => {
                categoryContainer.append(productCardConstructor(product))
            });
            
        })
    }
    catch(err){
        console.error(err);
    }
}
const fetchProducts = async (urlApi, category)=>{
    try{
        const products = await fetchData(`${urlApi}/products/?categoryId=${category.id}&offset=10&limit=4`);
        return products;
    }
    catch(err){
        console.error(err);
    }
}
fetchCategories(API);