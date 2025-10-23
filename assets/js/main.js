


(function() {
  "use strict";

 
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
const images = [
  "./assets/img/slideshow/s1.jpg",
  "./assets/img/slideshow/s2.jpg",
  "./assets/img/slideshow/s3.jpg",
  "./assets/img/slideshow/s4.jpg",
  "./assets/img/slideshow/s5.jpg",
  "./assets/img/slideshow/s6.jpg",
  "./assets/img/slideshow/s7.jpg",
  "./assets/img/slideshow/s8.jpg",
  "./assets/img/slideshow/s9.jpg"
];

let current = 0;
const imageElement = document.getElementById("slideshow-image");

function showNextImage() {
  current = (current + 1) % images.length;
  imageElement.classList.remove("fade-in"); // Reset class to restart animation
  void imageElement.offsetWidth; // Trigger reflow to restart animation
  imageElement.src = images[current];
  imageElement.classList.add("fade-in");
}

setInterval(showNextImage, 3000);


   
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

 
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

 
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  let backtotop = select('.back-to-top');
let scrollPercent = document.getElementById('scrollPercent');

if (backtotop && scrollPercent) {
  const toggleBacktotop = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.round((scrollTop / docHeight) * 100);

    // Update percentage inside button
    scrollPercent.textContent = `${scrolled}%`;

    // Toggle visibility
    if (scrollTop > 100) {
      backtotop.classList.add('active');
    } else {
      backtotop.classList.remove('active');
    }
  };

  window.addEventListener('load', toggleBacktotop);
  onscroll(document, toggleBacktotop);
}
//--------------------------------------------------MOuse Tracker
const tracker = document.querySelector('.mouse-tracker');

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

// Adjust this value for smoother/faster following
const speed = 0.7;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function smoothFollow() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  tracker.style.transform = `translate(${currentX}px, ${currentY}px)`;

  requestAnimationFrame(smoothFollow);
}

smoothFollow();

//----------------------------------------------------------------------------------
 const typed = document.querySelector('.typed');
    if (typed) {
      let typed_strings = typed.getAttribute('data-typed-items');
      typed_strings = typed_strings.split(',');
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

 
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()


$(document).ready(function() {

  $(window).load(function() {

      $('#loadOverlay').fadeOut('slow');

  })

})

