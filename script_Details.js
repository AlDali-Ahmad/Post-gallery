window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    fetch(`https://jsonplaceholder.typicode.com/posts/${productId}`)
        .then(response => response.json())
        .then(productData => {
            return fetch(`https://jsonplaceholder.typicode.com/photos/${productId}`)
                .then(response => response.json())
                .then(photoData => {
                    updateProductDetails(productData, photoData.url);
                });
        })
        .catch(error => {
            console.error(error);
        });
});

function updateProductDetails(product, photoUrl) {
    document.querySelector('.product-title').textContent = product.title;
    document.querySelector('.product-description').textContent = product.body;

    const productImage = document.querySelector('.imagedetales');
    if (productImage) {
        productImage.src = photoUrl;
    }
}