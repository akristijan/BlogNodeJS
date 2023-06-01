document.addEventListener('DOMContentLoaded', ()=>{
    const searchButton = document.querySelector('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.querySelector('.searchInput');
    const closeBtn = document.querySelector('#searchClose');

    searchButton.addEventListener('click', ()=> {
        searchBar.style.visibility= 'visible';
        searchBar.classList.add('open');
        searchButton.setAttribute('aria-expended', 'true');
        searchInput.focus()
    })


    closeBtn.addEventListener('click', ()=> {
        searchBar.style.visibility= 'hidden';
        searchBar.classList.remove('open');
        searchButton.setAttribute('aria-expended', 'false');
       
    })

})