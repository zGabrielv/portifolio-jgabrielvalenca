function toggleIcon() {
    const button = document.getElementById('toggleButton');
    const icon = button.querySelector('i');
    if (button.classList.contains('moon')) {
        button.classList.remove('moon');
        button.classList.add('sun');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        button.classList.remove('sun');
        button.classList.add('moon');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}
