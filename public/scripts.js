const recipeCards = document.querySelectorAll('.card')
const ingredients = document.querySelector('.ingredients')
const preparation = document.querySelector('.preparation')
const information = document.querySelector('.information')

for (let card of recipeCards) {
    card.addEventListener("click", function(){
        const recipeIndex = card.getAttribute("id")
        window.location.href = `/recipe/${recipeIndex}`
    })
}

document.querySelector(".ingredients a").addEventListener("click", function(){
        if (ingredients.classList.contains('hide')) {
            document.querySelector(".ingredients a").innerHTML = "ESCONDER"
            ingredients.classList.remove('hide')
        } else {
            document.querySelector(".ingredients a").innerHTML = "MOSTRAR"
            ingredients.classList.add('hide')
        }
    })

document.querySelector(".preparation a").addEventListener("click", function(){
    if (preparation.classList.contains('hide')) {
        document.querySelector(".preparation a").innerHTML = "ESCONDER"
        preparation.classList.remove('hide')
    } else {
        document.querySelector(".preparation a").innerHTML = "MOSTRAR"
        preparation.classList.add('hide')
    }
})

document.querySelector(".information a").addEventListener("click", function(){
    if (information.classList.contains('hide')) {
        document.querySelector(".information a").innerHTML = "ESCONDER"
        information.classList.remove('hide')
    } else {
        document.querySelector(".information a").innerHTML = "MOSTRAR"
        information.classList.add('hide')
    }
})

