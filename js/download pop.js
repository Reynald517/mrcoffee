function openPopup() {
    const popup = document.getElementById('myPopup');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const popup = document.getElementById('myPopup');
    popup.classList.remove('active');
    
    setTimeout(() => {
        if (!popup.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    }, 300);
}

document.addEventListener('click', function(event) {
    const popup = document.getElementById('myPopup');
    const popupContent = document.querySelector('.popup');
    
    if (popup.classList.contains('active') && 
        !popupContent.contains(event.target) && 
        !event.target.hasAttribute('onclick')) {
        closePopup();
    }
});