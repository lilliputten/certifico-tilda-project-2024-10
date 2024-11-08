import {
  // smallTresholdPx, // 660
  // mobileTresholdPx, // 960
  wideTresholdPx, // 1200
} from '../variables';

import './ClientsGallery.styles.scss';

export function initClientsGallery() {
  const galleryWrapper = $('.uc-ClientsBlock');
  if (!galleryWrapper[0]) {
    return;
  }
  galleryWrapper[0].classList.toggle('GalleryWrapper', true);
  const galleryContainer = galleryWrapper.find('.t467__descr');
  galleryContainer[0].classList.toggle('GalleryContainer', true);
  galleryContainer.html('<div class="GalleryCarousel owl-carousel owl-theme"></div>');
  const owlCarousel = galleryContainer.find('.owl-carousel');
  const galleryContent = $('.uc-ClientsContent');
  const galleryContentItems = galleryContent.find('.tn-atom');
  galleryContentItems.each((_n, node) => {
    // Remove tn-atom classes: they cause tilda lazy load code exception
    const img = node.getElementsByTagName('img')[0];
    img?.classList.toggle('tn-atom__img', false);
    node.classList.toggle('tn-atom', false);
    node.classList.toggle('item', true);
  });
  galleryContentItems.appendTo(owlCarousel);
  galleryContent.remove();
  // Start gallery...
  const owl = owlCarousel.owlCarousel({
    loop: true,
    center: true,
    dots: true,
    nav: false,
    margin: 5,
    // Autoplay...
    // @see https://owlcarousel2.github.io/OwlCarousel2/demos/autoplay.html
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 2000,
    // Responsive...
    items: 4,
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      640: { items: 3 },
      [wideTresholdPx]: { items: 5 },
    },
  });
  // Navigation arrows (find)...
  const navRight = document
    .querySelector('.t-slds__arrow.t-slds__arrow-right')
    ?.cloneNode(true) as HTMLElement;
  const navLeft = document
    .querySelector('.t-slds__arrow.t-slds__arrow-left')
    ?.cloneNode(true) as HTMLElement;
  if (navLeft && navRight) {
    // Add nodes...
    const block = galleryWrapper.find('.t467');
    block.append(navLeft, navRight);
    // Set click handers...
    navLeft.addEventListener('click', () => owl.trigger('prev.owl.carousel'));
    navRight.addEventListener('click', () => owl.trigger('next.owl.carousel'));
    // Stop autoplay on hover...
    const startAutoPlay = () => owl.trigger('play.owl.autoplay');
    const stopAutoPlay = () => owl.trigger('stop.owl.autoplay');
    navLeft.addEventListener('mouseover', stopAutoPlay);
    navLeft.addEventListener('mouseout', startAutoPlay);
    navRight.addEventListener('mouseover', stopAutoPlay);
    navRight.addEventListener('mouseout', startAutoPlay);
  }
}
