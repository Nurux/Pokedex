class MobileNavbar {
    constructor(mobileMenu, navList, navLink) {
        this.mobileMenu = document.querySelector(mobileMenu)
        this.navList = document.querySelector(navList)
        this.navLink = document.querySelectorAll(navLink)
        this.activeClass = 'active';

        this.handleClick = this.handleClick.bind(this);
    }

    animatedLink() {
        this.navLink.forEach((link) =>{
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards 0.3s`)
        })
    }


    handleClick(){
        this.navList.classList.toggle(this.activeClass);
        this.animatedLink();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener('click', this.handleClick);
    }

    init(){
        if(this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobile_menu = new MobileNavbar('.mobile_menu', '.pagination', '.pagination button');

mobile_menu.init()