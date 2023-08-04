document.querySelector(".bars-menu").addEventListener("click", () => {
    document.querySelector(".nav-items").classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((item) => {
    item.addEventListener("click", () => {
        document.querySelector(".nav-items").classList.toggle("active");
    });
});

function fetchProducts() {
    const productList = document.getElementById('product-list');

    if (productList) {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(products => {
                const wrapper = document.querySelector('.popular-products-wrapper');
                products.slice(0, 8).forEach(product => {
                    const item = document.createElement('div');
                    item.className = 'popular-products-item';

                    item.innerHTML = `
              <div class="popular-products-image">
                  <a href="./Products/ProductDetails.html?productId=${product.id}" class="property-link" data-tooltip="Product Show">
                      <img src="${product.image}" alt="">
                  </a>
              </div>
              <div class="popular-products-body">
                  <h4>${product.name}</h4>
                  <div class="price">
                      <label>${product.price}</label>
                  </div>
              </div>
            `;

                    wrapper.appendChild(item);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.error('Element with id "product-list" not found.');
    }
}

function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            const productList = document.getElementById('product-list');

            if (productList) {
                posts.slice(0, 9).forEach(post => {
                    const item = document.createElement('div');
                    let x = 1;
                    item.className = 'phone';
                    fetch(`https://jsonplaceholder.typicode.com/photos/${post.id}`)
                        .then(response => response.json())
                        .then(photo => {
                            const imageUrl = photo.url;
                            item.innerHTML = `
                            <section class="newest-phones" id="newest">
                              <div class="phones-section">                    
                                <div class="phones">
                                  <div class="phone" id="product-list">
                                    <img class="imageee" src="${imageUrl}" />
                                    <h5>${post.title}</h5>
                                    <h4 class="price">${post.body}</h4>
                                  </div>
                                </div>
                                <a href="./details_phone.html?productId=${post.id}">
                                  <button type="submit" class="showproduct">Show Product</button>
                                </a>  
                              </div>
                            </section>
                `;
                            x++;
                            productList.appendChild(item);
                        })
                        .catch(error => {
                            console.error('Error fetching photo:', error);
                        });
                });
            } else {
                console.error('Element with id "product-list" not found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function addProduct() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const image = document.getElementById('image').files[0];

    if (!title || !description || !image) {
        alert('Please fill out all fields');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Product added successfully');

            // Reset form fields to default values
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
            document.getElementById('image').value = '';

        })
        .catch(error => console.error(error));
}

const form = document.querySelector('.product-form');

form.addEventListener('submit', event => {
    event.preventDefault();
    addProduct();
});