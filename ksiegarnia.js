const categoriesBtn = document.querySelector('.categories')
const categoriesMenu = document.querySelector('.categories-menu')

const bookUl = document.querySelector('.book-list')
const toShopCardBtn = document.querySelectorAll('.to-shop-cart')

const main = document.querySelector('.main')
const mainShopCart = document.querySelector('.main-shop-cart')
const shopCartBtn = document.querySelector('.shop-cart-btn')
const navbar = document.querySelector('.navbar')
const backBtn = document.querySelector('.back-btn')

const shopCardAmount = document.querySelector('.shop-am')
const clipboardAmount = document.querySelector('.clip-am')




const showMenu = () => {
    categoriesMenu.classList.add('show')
}

const hideMenu = () => {
    categoriesMenu.classList.remove('show')
}



const showShopCart = () => {
    main.classList.add('hide')

    mainShopCart.classList.add('show')
    mainShopCart.classList.remove('hide')

    navbar.classList.remove('show-grid')
    navbar.classList.add('hide')
}

const showClipboard = () => {
    main.classList.add('hide')

    mainShopCart.classList.add('hide')
    mainShopCart.classList.remove('show')

    navbar.classList.remove('show-grid')
    navbar.classList.add('hide')
}

const backToMain = () => {
    main.classList.remove('hide')

    mainShopCart.classList.add('hide')
    mainShopCart.classList.remove('show')

    navbar.classList.remove('hide')
}







const addToShopCard = (e) => {
    let button = e.target
    let bookDiv = button.parentElement.parentElement
    let bookTitle = bookDiv.getElementsByClassName('title')[0].innerText
    let bookAuthor = bookDiv.getElementsByClassName('author')[0].innerText
    let bookValue = bookDiv.getElementsByClassName('value')[0].innerText
    let bookImage = bookDiv.getElementsByClassName('books-images')[0].src

    let newLiElement = document.createElement('li')
    newLiElement.classList.add('new-li-element')
    bookUl.append(newLiElement)

    let newBookListElement = document.createElement('div')
    newBookListElement.classList.add('book-list-element')
    newLiElement.append(newBookListElement)

    let newImage = document.createElement('img')
    newImage.classList.add('book-list-img')
    newImage.src = bookImage
    newBookListElement.append(newImage)

    let bookDivOne = document.createElement('div')
    bookDivOne.classList.add('book-list-one')
    newBookListElement.append(bookDivOne)


    let bookListTitle = document.createElement('span')
    bookListTitle.classList.add('book-list-title')
    bookListTitle.textContent = bookTitle
    bookDivOne.append(bookListTitle)

    let bookListAuthor = document.createElement('span')
    bookListAuthor.classList.add('book-list-author')
    bookListAuthor.innerText = bookAuthor
    bookDivOne.append(bookListAuthor)

    addShopCartAmount()


    let bookDivTwo = document.createElement('div')
    bookDivTwo.classList.add('book-list-two')
    newBookListElement.append(bookDivTwo)

    let bookListAmount = document.createElement('span')
    let bookListAmountContent = `<input class="book-list-amount" type="number" min="1" max="10" value="1">`
    bookListAmount.innerHTML = bookListAmountContent
    bookDivTwo.append(bookListAmount)


    let bookListValue = document.createElement('span')
    bookListValue.classList.add('book-list-value')
    bookListValue.textContent = bookValue
    bookDivTwo.append(bookListValue)

    let bookListCurrency = document.createElement('span')
    bookListCurrency.classList.add('book-list-currency')
    bookListCurrency.textContent = 'zł'
    bookDivTwo.append(bookListCurrency)

    let bookListButton = document.createElement('button')
    bookListButton.classList.add('book-list-button')
    bookListButton.innerHTML = '<i class="fa fa-xmark"></i>'
    bookDivTwo.append(bookListButton)




    let checkTitle = document.getElementsByClassName('book-list-title')
    for(let i = 0; i < checkTitle.length; i++) {
        if(checkTitle[i].innerText == bookTitle) {
            alert('Dodano do koszyka')
            return
        }
    }
 
    
}


const addShopCartAmount = () => {
    let allLiElements = document.querySelectorAll('li')
    shopCardAmount.textContent = allLiElements.length
}





const checkClick = () => {
    let deleteBtn = document.getElementsByClassName('book-list-button')
    for (let i = 0; i < deleteBtn.length; i++) {
        let button = deleteBtn[i]
        button.addEventListener('click', removeItem)
    }
}

const removeItem = e => {
    let buttonClicked = e.target
    buttonClicked.closest('li').remove()

    let allLiElements = document.querySelectorAll('li')

    shopCardAmount.textContent = allLiElements.length

    updateValue()
}






const quantityInputs = () => {
    let inputAmount = document.getElementsByClassName('book-list-amount')
    for (let i = 0; i < inputAmount.length; i++) {
        let button = inputAmount[i]
        button.addEventListener('change', updateValue)
    }
}

const changeInput = (e) => {
    let input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateValue()
}

const updateValue = () => {
    
    let ulList = document.getElementsByClassName('book-list')[0]
    let bookListElements = ulList.getElementsByClassName('book-list-element')
    let total = 0

    for (let i = 0; i < bookListElements.length; i++) {
        let bookListElement = bookListElements[i]
        let priceElement = bookListElement.getElementsByClassName('book-list-value')[0]
        let inputElement = bookListElement.getElementsByClassName('book-list-amount')[0]

        let price = parseFloat(priceElement.textContent)
        let quantity = inputElement.value

        total = total + (price * quantity)
    }
    document.getElementsByClassName('total-value')[0].innerText = total

}




const updateTotalValue = (e) => {
    let button = e.target
    let checkedDiv = button.parentElement.parentElement
    
    let totalValue = document.getElementsByClassName('total-value')[0]

    let totalValueNum = document.getElementsByClassName('total-value')[0].textContent
    let bookValueNum = checkedDiv.getElementsByClassName('value')[0].textContent

    let totalPrice = parseFloat(totalValueNum)
    let price = parseFloat(bookValueNum)

    
    totalValue.textContent = totalPrice + price
}








categoriesBtn.addEventListener('mouseover', showMenu)
categoriesBtn.addEventListener('mouseout', hideMenu)

shopCartBtn.addEventListener('click', showShopCart)
backBtn.addEventListener('click', backToMain)

bookUl.addEventListener('click', checkClick)
bookUl.addEventListener('change', quantityInputs)

toShopCardBtn.forEach(button => {
    button.addEventListener('click', addToShopCard)
    button.addEventListener('click', updateTotalValue)
});
