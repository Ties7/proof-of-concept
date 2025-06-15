const gallery = document.querySelector('.gallery')

// hide extra images when script is enabled, since then, you can view the gallery modal
gallery.classList.remove('show-all')


// =========== carousel nav label ===========

// selects the carousel container and the element that shows page number
const carousel = document.querySelector('.carousel')
const navLabel = document.querySelector('.carousel-nav-label')

carousel.addEventListener('scroll', function() { //when carousel is scrolled
    const currentPage = Math.round(carousel.scrollLeft / carousel.clientWidth) //caclulate wich page you are on (dividing scroll position by width of image)
    const pageCount = Math.round(carousel.scrollWidth / carousel.clientWidth) //calculate number of pages  (dividing scroll width by image width)
    navLabel.textContent = `${currentPage + 1} / ${pageCount}` //update the count
})

// resize
// TODO: vragen aan Sanne hoe ik dit kan doen zonder javascript
// (want momenteel is het bij verschillende maten zo dat je soms vooruit of achteruit gaat in de carousel)
window.addEventListener('resize', function() {
    carousel.scrollTo({
        left: carousel.scrollLeft,
        behavior: "instant"
    })
})


// =========== carousel buttons ===========

// scroll 1 image forward or backwards
function scrollCarousel(amount) {
    carousel.scrollLeft += carousel.clientWidth * amount // add or substract image width to scroll left based on the amount 
}

document.querySelector('.carousel-btn.left').addEventListener('click', function() {
    scrollCarousel(-1)
})

document.querySelector('.carousel-btn.right').addEventListener('click', function() {
    scrollCarousel(1)
})

// =========== modal opening ===========

const detailModal = document.querySelector('.detail-modal')
const galleryItems = [...gallery.children]

function openModal(item) {
    detailModal.showModal()
    carousel.scrollTo({
        left: carousel.clientWidth * item,
        behavior: "instant"
    })
}

galleryItems.forEach(function(item, index) {
    item.addEventListener('click', function() {
        openModal(index)
    })
})
