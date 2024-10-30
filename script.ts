function setupCarousel(
  carousel: HTMLDivElement,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement,
  carouselItems: NodeListOf<HTMLDivElement>,
  itemLength: number
): void {
  let index: number = 0;
  prevBtn.addEventListener('click', () => {
    index--;
    console.log(index);

    if (index < 0) {
      carousel.scrollLeft += itemLength * carouselItems.length;
      index = carouselItems.length - 3;
      console.log(index);
    } else {
      carousel.scrollLeft -= itemLength;
    }
  });

  nextBtn.addEventListener('click', () => {
    index++;
    if (index > carouselItems.length - 3) {
      carousel.scrollLeft -= itemLength * carouselItems.length;
      index = 0;
    } else {
      carousel.scrollLeft += itemLength;
    }
  });
}

function hideMobileNavDrawer(scrollToTop: boolean): void {
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

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

let currentPage: string = 'home';

function showPage(currentPage: string, nextPage: HTMLElement): void {
  if (currentPage === 'home') {
    imageHero.classList.add('hide');
    homePage.classList.add('hide');
  } else if (currentPage === 'shop') {
    shopPage.classList.add('hide');
  } else if (currentPage === 'story') {
    storyPage.classList.add('hide');
  } else if (currentPage === 'contact') {
    contactPage.classList.add('hide');
  } else if (currentPage === 'faq') {
    faqPage.classList.add('hide');
  }

  nextPage.classList.remove('hide');
  if (nextPage === homePage) {
    imageHero.classList.remove('hide');
  }
}

//CAROUSEL BEST SELLERS SECTION HOME PAGE//
const carousel = document.querySelector('.carousel') as HTMLDivElement;
const prevBtn = document.querySelectorAll('.prev-btn')[0] as HTMLElement;
const nextBtn = document.querySelectorAll('.next-btn')[0] as HTMLElement;
const carouselItems = document.querySelectorAll(
  '.carousel-item'
) as NodeListOf<HTMLDivElement>;

const itemLength: number = carouselItems[0].offsetWidth;

setupCarousel(carousel, prevBtn, nextBtn, carouselItems, itemLength);

//SECONDARY CAROUSEL ON HOME PAGE//
const carousel2 = document.querySelector('.carousel-2') as HTMLDivElement;
const prevBtn2 = document.querySelectorAll('.prev-btn')[2] as HTMLElement;
const nextBtn2 = document.querySelectorAll('.next-btn')[2] as HTMLElement;
const carouselItems2 = document.querySelectorAll(
  '.carousel-item-2'
) as NodeListOf<HTMLDivElement>;

const itemLength2: number = carouselItems2[0].offsetWidth;

setupCarousel(carousel2, prevBtn2, nextBtn2, carouselItems2, itemLength2);

//NAVBAR CHANGE IN STYLE ON SCROLL//

const navBar = document.getElementById('nav') as HTMLElement;
const mobileDrawer = document.querySelector(
  '.mobile-drawer'
) as HTMLUListElement;

window.addEventListener('scroll', () => {
  const computedStyles = window.getComputedStyle(mobileDrawer);
  const visibility: string = computedStyles.getPropertyValue('visibility');
  if (window.scrollY > 0) {
    navBar.style.backgroundColor = '#BE8DFF';
    navBar.style.paddingTop = '33px';

    navBar.style.paddingBottom = '33px';

    mobileDrawer.style.backgroundColor = '#FDE9E2';
  } else {
    mobileDrawer.style.backgroundColor = '#fdfdff';
    navBar.style.paddingTop = '45px';
    navBar.style.paddingBottom = '45px';

    if (visibility === 'hidden') {
      navBar.style.backgroundColor = 'transparent';
    } else {
      navBar.style.backgroundColor = '#fdfdff';
    }
  }
});

//hide and show mobile nav drawer//

const mobileBurgerIcon = document.getElementById(
  'mobile-nav-menu'
) as HTMLImageElement;

mobileBurgerIcon.addEventListener('click', () => {
  const computedStyles = window.getComputedStyle(mobileDrawer);
  const visibility: string = computedStyles.getPropertyValue('visibility');
  if (visibility === 'hidden') {
    mobileDrawer.style.visibility = 'visible';
    mobileDrawer.style.opacity = '1';
    if (window.scrollY === 0) {
      navBar.style.backgroundColor = '#fdfdff';
    } else {
      navBar.style.backgroundColor = '#BE8DFF';
    }
  } else {
    hideMobileNavDrawer(false);
    if (window.scrollY === 0) {
      navBar.style.backgroundColor = 'transparent';
    }
  }
});

//toggles mobile nav on and off depending on screen size//

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1100) {
    hideMobileNavDrawer(false);

    if (window.scrollY === 0) {
      navBar.style.backgroundColor = 'transparent';
    }
  }
});

//SHOWING SHOP PAGE//

const shopLinks = document.querySelectorAll(
  '.page-link-shop'
) as NodeListOf<HTMLAnchorElement>;
const imageHero = document.querySelector('.image-hero') as HTMLElement;
const shopPage = document.querySelector('.page-shop') as HTMLDivElement;

shopLinks.forEach((link) => {
  link.addEventListener('click', () => {
    // homePage.classList.add('hide');
    // imageHero.classList.add('hide');
    // shopPage.style.display = 'flex';
    showPage(currentPage, shopPage);
    hideMobileNavDrawer(true);
    currentPage = 'shop';
  });
});

//SHOWING HOME PAGE//
const homePage = document.querySelector('main') as HTMLElement;
const homeLink = document.querySelector('.home-logo') as HTMLHeadingElement;

homeLink.addEventListener('click', () => {
  showPage(currentPage, homePage);
  hideMobileNavDrawer(true);
  currentPage = 'home';
});

//review section controls//

const reviewGridsContainers = document.querySelectorAll(
  '.grids-container'
) as NodeListOf<HTMLDivElement>;
const reviewPrevButtons = document.querySelectorAll(
  '.review-control-prev'
) as NodeListOf<HTMLButtonElement>;
const reviewNextButtons = document.querySelectorAll(
  '.review-control-next'
) as NodeListOf<HTMLButtonElement>;

reviewPrevButtons.forEach((button) => {
  button.addEventListener('click', () => {
    reviewGridsContainers[0].scrollLeft > 0 ||
    reviewGridsContainers[1].scrollLeft > 0
      ? reviewGridsContainers.forEach(
          (container) => (container.scrollLeft -= window.innerWidth)
        )
      : reviewGridsContainers.forEach(
          (container) => (container.scrollLeft += window.innerWidth)
        );
  });
});

reviewNextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    reviewGridsContainers[0].scrollLeft === window.innerWidth ||
    reviewGridsContainers[1].scrollLeft === window.innerWidth
      ? reviewGridsContainers.forEach(
          (container) => (container.scrollLeft -= window.innerWidth)
        )
      : reviewGridsContainers.forEach(
          (container) => (container.scrollLeft += window.innerWidth)
        );
  });
});

const reviewItemsToHide = document.querySelectorAll(
  '.mobile-hide'
) as NodeListOf<HTMLElement>;

window.addEventListener('resize', () => {
  if (window.innerWidth < 525) {
    reviewItemsToHide.forEach((item) => item.classList.add('hide'));
  } else {
    reviewItemsToHide.forEach((item) => item.classList.remove('hide'));
  }
});

const reviewLinks = document.querySelectorAll(
  '.reviews-link'
) as NodeListOf<HTMLAnchorElement>;
const reviewSection = document.querySelectorAll(
  '.review-section'
) as NodeListOf<HTMLElement>;

reviewLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (currentPage === 'shop') {
      reviewSection[1].scrollIntoView({ behavior: 'smooth' });
    } else {
      showPage(currentPage, homePage);
      reviewSection[0].scrollIntoView({ behavior: 'smooth' });
      currentPage = 'home';
    }

    hideMobileNavDrawer(false);
  });
});

//adding to cart and updating number of items in cart//

const addToCartButtons = document.querySelectorAll(
  '.add-to-cart'
) as NodeListOf<HTMLButtonElement>;
const cartCountDesktop = document.querySelector(
  '.cart-count'
) as HTMLDivElement;
const cartCountMobile = document.querySelector(
  '.mobile-cart-count'
) as HTMLDivElement;

// cartCountDesktop.innerText = localStorage.getItem('cartCount') as string;
// cartCountMobile.innerText = localStorage.getItem('cartCount') as string;

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const updatedCartCount = (
      parseInt(cartCountDesktop.innerText) + 1
    ).toString();
    cartCountDesktop.innerText = updatedCartCount;
    cartCountMobile.innerText = updatedCartCount;

    // localStorage.setItem('cartCount', updatedCartCount);
  });
});

//Our Story Page//

const storyPageLinks = document.querySelectorAll(
  '.story-page-link'
) as NodeListOf<HTMLAnchorElement>;
const storyPage = document.querySelector('.story-page') as HTMLDivElement;

storyPageLinks.forEach((link) => {
  link.addEventListener('click', () => {
    showPage(currentPage, storyPage);
    currentPage = 'story';
    hideMobileNavDrawer(true);
  });
});

//contact us page//

const contactPageLinks = document.querySelectorAll(
  '.contact-us-page-link'
) as NodeListOf<HTMLAnchorElement>;

const contactPage = document.querySelector(
  '.contact-us-page'
) as HTMLDivElement;

contactPageLinks.forEach((link) => {
  link.addEventListener('click', () => {
    showPage(currentPage, contactPage);
    currentPage = 'contact';
    hideMobileNavDrawer(true);
  });
});

//contact us form//

const contactForm = document.querySelector(
  '#contact-us-form'
) as HTMLFormElement;

const contactFormNameField = document.querySelector(
  '#contact-form-name'
) as HTMLInputElement;

const contactFormEmailField = document.querySelector(
  '#contact-form-email'
) as HTMLInputElement;

const contactFormMessageField = document.querySelector(
  '#contact-form-message'
) as HTMLInputElement;

const contactVerificationMessage = document.querySelector(
  '#verification-message-contact-form'
) as HTMLDivElement;

const contactEmptyFieldsErrorMessage = document.querySelector(
  '#empty-fields-error-contact-form'
) as HTMLDivElement;

const contactInvalidEmailErrorMessage = document.querySelector(
  '#invalid-email-contact-form'
) as HTMLDivElement;

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  contactEmptyFieldsErrorMessage.classList.add('hide');
  contactInvalidEmailErrorMessage.classList.add('hide');
  contactVerificationMessage.classList.add('hide');

  if (
    !contactFormEmailField.value ||
    !contactFormMessageField.value ||
    !contactFormNameField.value
  ) {
    contactEmptyFieldsErrorMessage.classList.remove('hide');
    setTimeout(() => {
      contactEmptyFieldsErrorMessage.classList.add('hide');
    }, 4000);
  } else if (!validateEmail(contactFormEmailField.value)) {
    contactInvalidEmailErrorMessage.classList.remove('hide');
    setTimeout(() => {
      contactInvalidEmailErrorMessage.classList.add('hide');
    }, 4000);
  } else {
    contactVerificationMessage.classList.remove('hide');
    contactForm.reset();
    setTimeout(() => {
      contactVerificationMessage.classList.add('hide');
    }, 4000);
  }
});

//discount form//

const discountSubmitButton = document.querySelector(
  '.discount-submit-button'
) as HTMLButtonElement;

const emailFieldForDiscount = document.querySelector(
  '.discount-email-field'
) as HTMLInputElement;

const discountVerificationMessage = document.querySelector(
  '#discount-verification-message'
) as HTMLDivElement;

const emailErrorMessageFooter = document.querySelector(
  '#invalid-email-message-footer'
) as HTMLDivElement;

const discountEmailField = document.querySelector(
  '.discount-email-field'
) as HTMLInputElement;

discountSubmitButton.addEventListener('click', () => {
  if (validateEmail(discountEmailField.value)) {
    if (!emailErrorMessageFooter.classList.contains('hide')) {
      emailErrorMessageFooter.classList.add('hide');
    }
    discountVerificationMessage.classList.remove('hide');
    discountEmailField.value = '';
    setTimeout(() => {
      discountVerificationMessage.classList.add('hide');
    }, 4000);
  } else {
    if (!discountVerificationMessage.classList.contains('hide')) {
      discountVerificationMessage.classList.add('hide');
    }
    emailErrorMessageFooter.classList.remove('hide');
    setTimeout(() => {
      emailErrorMessageFooter.classList.add('hide');
    }, 4000);
  }
});

//SHOWING FAQ PAGE//

const faqPage = document.querySelector('.faq-page') as HTMLElement;
const faqPageLinks = document.querySelectorAll(
  '.faq-page-link'
) as NodeListOf<HTMLElement>;

faqPageLinks.forEach((link) => {
  link.addEventListener('click', () => {
    showPage(currentPage, faqPage);
    currentPage = 'faq';
    hideMobileNavDrawer(true);
  });
});
