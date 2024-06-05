document.addEventListener('DOMContentLoaded', () => {
    const navmenu = document.querySelector('.navmenu');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navmenu a');

    const heroSection = document.querySelector('.hero');

    function toggleNavMenu() {
        const heroSectionBottom = heroSection.getBoundingClientRect().bottom;

        if (heroSectionBottom < 0) {
            navmenu.classList.add('show');
        } else {
            navmenu.classList.remove('show');
        }
    }

    function activateNavLink() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        toggleNavMenu();
        activateNavLink();
    });

    navLinks.forEach(item => {
        item.addEventListener('click', function(e){
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});
