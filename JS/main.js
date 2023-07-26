var productName = document.getElementById('pName');
var productPrice = document.getElementById('pPrice');
var productCategory = document.getElementById('pCategory');
var productDescription = document.getElementById('pDesc');
var productContainer = [];

if (localStorage.getItem('product') != null) {
    productContainer = JSON.parse(localStorage.getItem('product'))
    displayProducts()
}

function addProduct() {
    var productObj = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value,
    }
    productContainer.push(productObj);
    localStorage.setItem('product', JSON.stringify(productContainer))
    displayProducts()
    refresh()
}

function displayProducts() {
    var y = ``
    for (var i = 0; i < productContainer.length; i++) {
        y += `<tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button onclick="setFormForUpdate(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML = y
}

function refresh() {
    productName.value = ""
    productPrice.value = ""
    productCategory.value = ""
    productDescription.value = ""
}

function deleteProduct(i) {
    productContainer.splice(i, 1)
    localStorage.setItem('product', JSON.stringify(productContainer))
    displayProducts()
}

function setFormForUpdate(i) {
    btnUpdate.classList.replace('d-none', 'd-block');
    btnAdd.classList.replace('d-block', 'd-none');
    productName.value = productContainer[i].name
    productPrice.value = productContainer[i].price
    productCategory.value = productContainer[i].category
    productDescription.value = productContainer[i].desc
    deleteProduct(i)
}

function updateProduct() {
    var productObj = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value,
    }
    productContainer.unshift(productObj);
    localStorage.setItem('product', JSON.stringify(productContainer))
    btnAdd.classList.replace('d-none', 'd-block');
    btnUpdate.classList.replace('d-block', 'd-none');
    displayProducts()
    refresh()
}

function searchProduct(y) {
    var box = ``
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(y.toLowerCase())) {
            box += `<tr>
            <td>${i + 1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td><button onclick="setFormForUpdate(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`
        }
    }
    document.getElementById('tbody').innerHTML = box
}