const products = [
    {
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },{
        image: 'https://via.placeholder.com/100',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 'Rs.100'
    },
];

const itemsPerPage = 10;
let currentPage = 1;

function displayProducts(page) {
    const productBody = document.getElementById('productBody');
    productBody.innerHTML = '';
    
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);
    
    paginatedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
        `;
        productBody.appendChild(row);
    });
}

function setupPagination() {
    const pagination = document.getElementById('pagination');
    const pageCount = Math.ceil(products.length / itemsPerPage);
    pagination.innerHTML = '';
    
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        
        if (i === currentPage) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', () => {
            currentPage = i;
            displayProducts(currentPage);
            
            document.querySelectorAll('.pagination button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
        
        pagination.appendChild(button);
    }
}

window.addEventListener('load', () => {
    displayProducts(currentPage);
    setupPagination();
});