if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', start)
} else {
    start()
}

function start() {
    var removeCartItem= document.getElementsByClassName('remove')
    for (var i = 0; i < removeCartItem.length; i++) {
        var button = removeCartItem[i]
        button.addEventListener('click', removeitems)
    }

    var quantity = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantity.length; i++) {
        var input = quantity[i]
        input.addEventListener('change', quantityupdated)
    }

    var addtocart = document.getElementsByClassName('addtocart')
    for (var i = 0; i < addtocart.length; i++) {
        var button = addtocart[i]
        button.addEventListener('click', addtocartclick)
    }

    document.getElementsByClassName('purchase')[0].addEventListener('click', purchasebuttonclick)
}

function purchasebuttonclick() {
    alert('thank you')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updatedcart()
}

function removeitems(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updatedcart()
}

function quantityupdated(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatedcart()
}

function addtocartclick(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('producttitle')[0].innerText
    var price = shopItem.getElementsByClassName('productprice')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('productimage')[0].src
    additemcart(title, price, imageSrc)
    updatedcart()
}

function additemcart(title, price, imageSrc) {
    var Row = document.createElement('div')
    Row.classList.add('row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Already purchased')
            return
        }
    }
    var rowcontents = `
        <div class="cart-item ">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price ">${price}</span>
        <div class="cart-quantity ">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="remove" type="button">REMOVE</button>
        </div>`
    Row.innerHTML = rowcontents
    cartItems.append(Row)
    Row.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
    Row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updatedcart() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var Rows = cartItemContainer.getElementsByClassName('row')
    var total = 0
    for (var i = 0; i < Rows.length; i++) {
        var cartRow = Rows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
 
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}