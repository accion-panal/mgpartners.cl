const buttonGrid = document.getElementById('nav-home-tab');
const buttonList = document.getElementById('nav-profile-tab');
const buttonMap = document.getElementById('nav-contact-tab');

const div = document.getElementById('nav-contact');
const divPagination = document.getElementById('pagination-col');


buttonMap.addEventListener('click', function() {
    div.classList.remove('initialMap');
    div.classList.remove('activeBlock');

    divPagination.style.display = 'none';
});

buttonList.addEventListener('click', function() {
    div.classList.add('initialMap');
    div.classList.add('activeBlock');

    divPagination.style.display = 'block';
});
buttonGrid.addEventListener('click', function() {
    div.classList.add('initialMap');
    div.classList.add('activeBlock');

    divPagination.style.display = 'block';
});

