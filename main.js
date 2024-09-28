"use strict";

async function getResponse() {
    let response = await fetch("https://dummyjson.com/products");
    let tovars = await response.json();
    tovars.products.slice(0, 15).forEach((element) => {
        document.querySelector(".tovars").innerHTML += `
            <div data-index="${element.id}" class="tovar">
                <div class="tovar__img">
                    <img src="${element.images[0]}" alt="${element.title} image">
                </div>
                <div class="tovar__title">
                    ${element.title}
                </div>
                <div class="tovar__price">
                    $${element.price}
                </div>
            </div>
        `;
    });
}

getResponse();

document.querySelector(".tovars").addEventListener("click", function (event) {
    let target = event.target.closest(".tovar");
    if (!target) return;

    document.querySelector(".tovars").style.display = "none";
    let tovarId = target.dataset.index;

    async function getPost() {
        let response = await fetch(`https://dummyjson.com/products/${tovarId}`);
        let tovar = await response.json();
        document.querySelector(".full_tovar").innerHTML = `
            <div class="full_tovar">
                <div class="tovar__img">
                    <img src="${tovar.images}" alt="${tovar.title} image">
                </div>
                <div class="text">
                   <p> ${tovar.title} <p>
                   
                   <p> Описание товара: ${tovar.description}</p>
                  
                    <p>Категория товара:${tovar.category}</p>
                    
                    <p>Бренд товара:${tovar.brand}<p>
                     <p>Цена товара:${tovar.price}<p>

                     <a href="#" class="btn">Назад</a>
                </div>
              
            </div>
        `;

        document.querySelector(".btn").addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(".full_tovar").innerHTML = "";
            document.querySelector(".tovars").style.display = "flex";
        });
    }

    getPost();
});