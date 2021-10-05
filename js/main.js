// product data array

const product_data = [
    {
      "id": 0,
      "name": "Shirt",
      "img":"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/78cf048e-29d0-4c0b-a060-d3412c0e8daf/da0g0k7-81b8852d-c1e3-41ac-a28b-4e974470dd23.png/v1/fill/w_416,h_443,strp/fancy_shirt_by_planetzandoria_da0g0k7-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDQzIiwicGF0aCI6IlwvZlwvNzhjZjA0OGUtMjlkMC00YzBiLWEwNjAtZDM0MTJjMGU4ZGFmXC9kYTBnMGs3LTgxYjg4NTJkLWMxZTMtNDFhYy1hMjhiLTRlOTc0NDcwZGQyMy5wbmciLCJ3aWR0aCI6Ijw9NDE2In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.7CEYZeQefJolMVBrbd_59mM5A61JXAbw3GrZHBhoNOY",
      "price": 900
    },
    {
      "id": 1,
      "name": "Pant",
      "img":"https://www.pngall.com/wp-content/uploads/2016/04/Jeans.png",
      "price": 1200
    },
    {
      "id": 2,
      "name": "Shirt",
      "img":"https://www.pngall.com/wp-content/uploads/5/Shirt-PNG-Image-File.png",
      "price": 900
    },
    {
      "id": 3,
      "name": "Panjabi",
      "img":"https://saralifestyle.com.bd/Files/ImageProductMain/e7730c54-a133-49e6-b6ab-b9bb5d631155.jpg",
      "price": 3350
    },
    {
      "id": 4,
      "name": "Suit",
      "img":"https://w7.pngwing.com/pngs/648/584/png-transparent-suit-clothing-jacket-dress-formal-wear-suit-textile-fashion-men-suit.png",
      "price": 7000
    },
    {
      "id": 5,
      "name": "T-shirt",
      "img":"https://www.freeiconspng.com/uploads/blank-t-shirt-png-9.png",
      "price": 300
    },
    {
      "id": 6,
      "name": "Polo-shirt",
      "img":"https://www.pngfind.com/pngs/m/568-5680106_id-pro-wear-polo-shirt-no-pocket-t.png",
      "price": 800
    },
    {
      "id": 7,
      "name": "Panjabi",
      "img":"https://saralifestyle.com.bd/Files/ImageProductMain/30a1234d-de38-48af-8368-b3bcd31228c7.jpg",
      "price": 2500
    },
    {
      "id": 8,
      "name": "Gown",
      "img":"https://lh3.googleusercontent.com/proxy/RBsbdwcAl20AwVBnzh8QwfUYHUYc4JxVr4tAd5-ZoOmCE5zhHh4uQ0z4rKtXCATJi7K16L7IMAQORcz2O2ovjKThFrw796dfoo_SA_frozQi",
      "price": 3550
    },
    {
      "id": 9,
      "name": "T-shirt",
      "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5qj_l1hsY88GI761HQGLdwQMrfiGDXbQjXA&usqp=CAU",
      "price": 250
    }
  ]


// Show all product in the ui

const showProduct = (data) => {

    let product_wrapper = document.getElementById('product_list_wrapper')

    for (product of data) {

        //create a div for a single product
        let item = document.createElement('div')
        item.classList.add('product')

        /*
            set a data attribute into a div and all elements of div
            for finding out the specific product by click event.
        */

        item.setAttribute('data-id', product.id)

        item.innerHTML = `
                        <img src="${product.img}" data-id=${product.id} alt="">
                        <div>
                            <p class="product_name" data-id=${product.id}>${product.name}</p>
                        </div>
                        `
        product_wrapper.appendChild(item)
    }
}


showProduct(product_data)

//storing cart product into this array 

let selected_products = []


const addToCart = (event) => {
    //getting a data attribute by clicking on a single product. 
    const product_id = event.target.getAttribute('data-id');
    
    
    // getting a value from product data array by product id

    const selected_data = product_data[product_id]
    
    /*
        checking a condition whether selected_products array is empty or not.
        if it is empty, push the product with adding quantity(how many times add this specific product to cart).
        if array is not empty, update exsisting data with quantity
    */
    if(selected_products.indexOf(selected_data)===-1){
        selected_data.quantity = 1;
        selected_products.push(selected_data)
    }
    else{
        const index = selected_products.indexOf(selected_data) 
        let temp = selected_products[index];
        temp.quantity = temp.quantity+1
        selected_products[index] = temp;
    }

    //call card_ui function witch creat cart element
    cart_ui(selected_products)
}    


//this function is for creating UI for cart element.
const cart_ui = (selected_products)=>{
    
    let product_total_price = 0;
    const cart_ul = document.getElementById('cart_items')

    //clear UL before show new product in the cart
    cart_ul.innerHTML = ""

    //seleted html tag for showing price
    const subtotal = document.getElementById("subtotal")
    const total = document.getElementById("total")
    const pay = document.getElementById("pay")


    /*
    loop through on selected_products array to show every product 
    that has selected for cart
    */
    for(selected_product of selected_products){

        //distructure the object 
        const {id,name,img,price,quantity} = selected_product

        const create_li = document.createElement('li')
        create_li.classList.add('selected_product')
        create_li.innerHTML = `
                                <div class="quantity">
                                <p>${quantity}</p>
                                </div>
                                <img src=${img} alt="">
                                  <p>${name}</p>
                                <p>BDT ${price}</p>
                                <button><i data-id=${id} class="fas fa-trash-alt"></i></button>
                            `
        cart_ul.appendChild(create_li)

        //calculate the total price
        product_total_price = product_total_price+((parseInt(price)*parseInt(quantity)))
    }
    //show the total price in UI
    subtotal.innerHTML = "Subtotal: "+product_total_price
    total.innerHTML = "Total: "+product_total_price
    pay.innerHTML = "Pay: "+product_total_price

}

//click event listener for shoing product in the cart
document.getElementById('product_list_wrapper').addEventListener('click', (event) => {
    addToCart(event)
})


//remove product from cart
const deleteProduct = (event)=>{
    let target_name = event.target.tagName
    let cart_product_id = event.target.getAttribute('data-id')
    if(target_name==='I'){
        let remove_product = selected_products.filter(product=>product.id != cart_product_id)
        selected_products=[...remove_product]
        cart_ui(selected_products)
        
    }
}


// click event listenr for remove product from cart
document.getElementById('cart_items').addEventListener('click', (event) => {
    deleteProduct(event)
})