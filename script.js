function setupCarousel(carousel, prevBtn, nextBtn, carouselItems, itemLength) {
    var index = 0;
    prevBtn.addEventListener('click', function () {
        index--;
        console.log(index);
        if (index < 0) {
            carousel.scrollLeft += itemLength * carouselItems.length;
            index = carouselItems.length - 3;
            console.log(index);
        }
        else {
            carousel.scrollLeft -= itemLength;
        }
    });
    nextBtn.addEventListener('click', function () {
        index++;
        if (index > carouselItems.length - 3) {
            carousel.scrollLeft -= itemLength * carouselItems.length;
            index = 0;
        }
        else {
            carousel.scrollLeft += itemLength;
        }
    });
}
function hideMobileNavDrawer(scrollToTop) {
    mobileDrawer.style.visibility = 'hidden';
    mobileDrawer.style.opacity = '0';
    if (scrollToTop) {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }
}
var validateEmail = function (email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
var currentPage = 'home';
function showPage(currentPage, nextPage) {
    if (currentPage === 'home') {
        imageHero.classList.add('hide');
        homePage.classList.add('hide');
    }
    else if (currentPage === 'shop') {
        shopPage.classList.add('hide');
    }
    else if (currentPage === 'story') {
        storyPage.classList.add('hide');
    }
    else if (currentPage === 'contact') {
        contactPage.classList.add('hide');
    }
    else if (currentPage === 'faq') {
        faqPage.classList.add('hide');
    }
    nextPage.classList.remove('hide');
    if (nextPage === homePage) {
        imageHero.classList.remove('hide');
    }
}
//CAROUSEL BEST SELLERS SECTION HOME PAGE//
var carousel = document.querySelector('.carousel');
var prevBtn = document.querySelectorAll('.prev-btn')[0];
var nextBtn = document.querySelectorAll('.next-btn')[0];
var carouselItems = document.querySelectorAll('.carousel-item');
var itemLength = carouselItems[0].offsetWidth;
setupCarousel(carousel, prevBtn, nextBtn, carouselItems, itemLength);
//SECONDARY CAROUSEL ON HOME PAGE//
var carousel2 = document.querySelector('.carousel-2');
var prevBtn2 = document.querySelectorAll('.prev-btn')[2];
var nextBtn2 = document.querySelectorAll('.next-btn')[2];
var carouselItems2 = document.querySelectorAll('.carousel-item-2');
var itemLength2 = carouselItems2[0].offsetWidth;
setupCarousel(carousel2, prevBtn2, nextBtn2, carouselItems2, itemLength2);
//NAVBAR CHANGE IN STYLE ON SCROLL//
var navBar = document.getElementById('nav');
var mobileDrawer = document.querySelector('.mobile-drawer');
window.addEventListener('scroll', function () {
    var computedStyles = window.getComputedStyle(mobileDrawer);
    var visibility = computedStyles.getPropertyValue('visibility');
    if (window.scrollY > 0) {
        navBar.style.backgroundColor = '#BE8DFF';
        navBar.style.paddingTop = '33px';
        navBar.style.paddingBottom = '33px';
        mobileDrawer.style.backgroundColor = '#FDE9E2';
    }
    else {
        mobileDrawer.style.backgroundColor = '#fdfdff';
        navBar.style.paddingTop = '45px';
        navBar.style.paddingBottom = '45px';
        if (visibility === 'hidden') {
            navBar.style.backgroundColor = 'transparent';
        }
        else {
            navBar.style.backgroundColor = '#fdfdff';
        }
    }
});
//hide and show mobile nav drawer//
var mobileBurgerIcon = document.getElementById('mobile-nav-menu');
mobileBurgerIcon.addEventListener('click', function () {
    var computedStyles = window.getComputedStyle(mobileDrawer);
    var visibility = computedStyles.getPropertyValue('visibility');
    if (visibility === 'hidden') {
        mobileDrawer.style.visibility = 'visible';
        mobileDrawer.style.opacity = '1';
        if (window.scrollY === 0) {
            navBar.style.backgroundColor = '#fdfdff';
        }
        else {
            navBar.style.backgroundColor = '#BE8DFF';
        }
    }
    else {
        hideMobileNavDrawer(false);
        if (window.scrollY === 0) {
            navBar.style.backgroundColor = 'transparent';
        }
    }
});
//toggles mobile nav on and off depending on screen size//
window.addEventListener('resize', function () {
    if (window.innerWidth >= 1100) {
        hideMobileNavDrawer(false);
        if (window.scrollY === 0) {
            navBar.style.backgroundColor = 'transparent';
        }
    }
});
//SHOWING SHOP PAGE//
var shopLinks = document.querySelectorAll('.page-link-shop');
var imageHero = document.querySelector('.image-hero');
var shopPage = document.querySelector('.page-shop');
shopLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        // homePage.classList.add('hide');
        // imageHero.classList.add('hide');
        // shopPage.style.display = 'flex';
        showPage(currentPage, shopPage);
        hideMobileNavDrawer(true);
        currentPage = 'shop';
    });
});
//SHOWING HOME PAGE//
var homePage = document.querySelector('main');
var homeLink = document.querySelector('.home-logo');
homeLink.addEventListener('click', function () {
    showPage(currentPage, homePage);
    hideMobileNavDrawer(true);
    currentPage = 'home';
});
//review section controls//
var reviewGridsContainers = document.querySelectorAll('.grids-container');
var reviewPrevButtons = document.querySelectorAll('.review-control-prev');
var reviewNextButtons = document.querySelectorAll('.review-control-next');
reviewPrevButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        reviewGridsContainers[0].scrollLeft > 0 ||
            reviewGridsContainers[1].scrollLeft > 0
            ? reviewGridsContainers.forEach(function (container) { return (container.scrollLeft -= window.innerWidth); })
            : reviewGridsContainers.forEach(function (container) { return (container.scrollLeft += window.innerWidth); });
    });
});
reviewNextButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        reviewGridsContainers[0].scrollLeft === window.innerWidth ||
            reviewGridsContainers[1].scrollLeft === window.innerWidth
            ? reviewGridsContainers.forEach(function (container) { return (container.scrollLeft -= window.innerWidth); })
            : reviewGridsContainers.forEach(function (container) { return (container.scrollLeft += window.innerWidth); });
    });
});
var reviewItemsToHide = document.querySelectorAll('.mobile-hide');
window.addEventListener('resize', function () {
    if (window.innerWidth < 525) {
        reviewItemsToHide.forEach(function (item) { return item.classList.add('hide'); });
    }
    else {
        reviewItemsToHide.forEach(function (item) { return item.classList.remove('hide'); });
    }
});
var reviewLinks = document.querySelectorAll('.reviews-link');
var reviewSection = document.querySelectorAll('.review-section');
reviewLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        if (currentPage === 'shop') {
            reviewSection[1].scrollIntoView({ behavior: 'smooth' });
        }
        else {
            showPage(currentPage, homePage);
            reviewSection[0].scrollIntoView({ behavior: 'smooth' });
            currentPage = 'home';
        }
        hideMobileNavDrawer(false);
    });
});
//adding to cart and updating number of items in cart//
var addToCartButtons = document.querySelectorAll('.add-to-cart');
var cartCountDesktop = document.querySelector('.cart-count');
var cartCountMobile = document.querySelector('.mobile-cart-count');
// cartCountDesktop.innerText = localStorage.getItem('cartCount') as string;
// cartCountMobile.innerText = localStorage.getItem('cartCount') as string;
addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var updatedCartCount = (parseInt(cartCountDesktop.innerText) + 1).toString();
        cartCountDesktop.innerText = updatedCartCount;
        cartCountMobile.innerText = updatedCartCount;
        // localStorage.setItem('cartCount', updatedCartCount);
    });
});
//Our Story Page//
var storyPageLinks = document.querySelectorAll('.story-page-link');
var storyPage = document.querySelector('.story-page');
storyPageLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        showPage(currentPage, storyPage);
        currentPage = 'story';
        hideMobileNavDrawer(true);
    });
});
//contact us page//
var contactPageLinks = document.querySelectorAll('.contact-us-page-link');
var contactPage = document.querySelector('.contact-us-page');
contactPageLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        showPage(currentPage, contactPage);
        currentPage = 'contact';
        hideMobileNavDrawer(true);
    });
});
//contact us form//
var contactForm = document.querySelector('#contact-us-form');
var contactFormNameField = document.querySelector('#contact-form-name');
var contactFormEmailField = document.querySelector('#contact-form-email');
var contactFormMessageField = document.querySelector('#contact-form-message');
var contactVerificationMessage = document.querySelector('#verification-message-contact-form');
var contactEmptyFieldsErrorMessage = document.querySelector('#empty-fields-error-contact-form');
var contactInvalidEmailErrorMessage = document.querySelector('#invalid-email-contact-form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    contactEmptyFieldsErrorMessage.classList.add('hide');
    contactInvalidEmailErrorMessage.classList.add('hide');
    contactVerificationMessage.classList.add('hide');
    if (!contactFormEmailField.value ||
        !contactFormMessageField.value ||
        !contactFormNameField.value) {
        contactEmptyFieldsErrorMessage.classList.remove('hide');
        setTimeout(function () {
            contactEmptyFieldsErrorMessage.classList.add('hide');
        }, 4000);
    }
    else if (!validateEmail(contactFormEmailField.value)) {
        contactInvalidEmailErrorMessage.classList.remove('hide');
        setTimeout(function () {
            contactInvalidEmailErrorMessage.classList.add('hide');
        }, 4000);
    }
    else {
        contactVerificationMessage.classList.remove('hide');
        contactForm.reset();
        setTimeout(function () {
            contactVerificationMessage.classList.add('hide');
        }, 4000);
    }
});
//discount form//
var discountSubmitButton = document.querySelector('.discount-submit-button');
var emailFieldForDiscount = document.querySelector('.discount-email-field');
var discountVerificationMessage = document.querySelector('#discount-verification-message');
var emailErrorMessageFooter = document.querySelector('#invalid-email-message-footer');
var discountEmailField = document.querySelector('.discount-email-field');
discountSubmitButton.addEventListener('click', function () {
    if (validateEmail(discountEmailField.value)) {
        if (!emailErrorMessageFooter.classList.contains('hide')) {
            emailErrorMessageFooter.classList.add('hide');
        }
        discountVerificationMessage.classList.remove('hide');
        discountEmailField.value = '';
        setTimeout(function () {
            discountVerificationMessage.classList.add('hide');
        }, 4000);
    }
    else {
        if (!discountVerificationMessage.classList.contains('hide')) {
            discountVerificationMessage.classList.add('hide');
        }
        emailErrorMessageFooter.classList.remove('hide');
        setTimeout(function () {
            emailErrorMessageFooter.classList.add('hide');
        }, 4000);
    }
});
//SHOWING FAQ PAGE//
var faqPage = document.querySelector('.faq-page');
var faqPageLinks = document.querySelectorAll('.faq-page-link');
faqPageLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        showPage(currentPage, faqPage);
        currentPage = 'faq';
        hideMobileNavDrawer(true);
    });
});
