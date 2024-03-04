const search = () => {
    const searchBox = document.querySelector('#search-item').value.toUpperCase();
    const storeItems= document.querySelector('#product-list');
    const product = document.querySelectorAll('.product');
    const pname = document.getElementsByTagName('h2');

    for (let i = 0; i<pname.length; i++) {
        let match = product[i].getElementsByTagName('h2')[0];
        if(match) {
           let textValue =  match.textContent || match.innerHTML
        }
    }
}