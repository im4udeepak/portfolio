(function () {
  "use strict";
  let currentYear = document.getElementById("currentYear");
  currentYear.innerHTML = new Date().getFullYear();

  let ageDetector = document.getElementById("ageDetector");
  if (ageDetector) {
      let birthYear = parseInt(1997, 10);
      let runningYear = new Date().getFullYear();
      // Calculate the age
      let age = runningYear - birthYear;
      ageDetector.innerHTML = age;
  }

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
      el = el.trim()
      if (all) {
          return [...document.querySelectorAll(el)]
      } else {
          return document.querySelector(el)
      }
  }

  /**
   * Easy event listener function
   */
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

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
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

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
      let elementPos = select(el).offsetTop
      window.scrollTo({
          top: elementPos,
          behavior: 'smooth'
      })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
      const toggleBacktotop = () => {
          if (window.scrollY > 100) {
              backtotop.classList.add('active')
          } else {
              backtotop.classList.remove('active')
          }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
      select('body').classList.toggle('mobile-nav-active')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
      if (select(this.hash)) {
          e.preventDefault()

          let body = select('body')
          if (body.classList.contains('mobile-nav-active')) {
              body.classList.remove('mobile-nav-active')
              let navbarToggle = select('.mobile-nav-toggle')
              navbarToggle.classList.toggle('bi-list')
              navbarToggle.classList.toggle('bi-x')
          }
          scrollto(this.hash)
      }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
      if (window.location.hash) {
          if (select(window.location.hash)) {
              scrollto(window.location.hash)
          }
      }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
      let typed_strings = typed.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')
      new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
      });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
      new Waypoint({
          element: skilsContent,
          offset: '80%',
          handler: function (direction) {
              let progress = select('.progress .progress-bar', true);
              progress.forEach((el) => {
                  el.style.width = el.getAttribute('aria-valuenow') + '%'
              });
          }
      })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
          let portfolioIsotope = new Isotope(portfolioContainer, {
              itemSelector: '.portfolio-item'
          });

          let portfolioFilters = select('#portfolio-flters li', true);

          on('click', '#portfolio-flters li', function (e) {
              e.preventDefault();
              portfolioFilters.forEach(function (el) {
                  el.classList.remove('filter-active');
              });
              this.classList.add('filter-active');

              portfolioIsotope.arrange({
                  filter: this.getAttribute('data-filter')
              });
              portfolioIsotope.on('arrangeComplete', function () {
                  AOS.refresh()
              });
          }, true);
      }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
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

  /**
   * Testimonials slider
   */
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
      },
      breakpoints: {
          320: {
              slidesPerView: 1,
              spaceBetween: 20
          },

          1200: {
              slidesPerView: 3,
              spaceBetween: 20
          }
      }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
      AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false
      })
  });
  /**
   * dynamic service json
   */
  // 
  document.addEventListener("DOMContentLoaded", function () {
      // Your JavaScript code here
      const homePageService = (item, index) => {
          return `<div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="${item?.delay}">
  <div class="icon"><i class="${item?.icon}"></i></div>
  <h4 class="title"><a href="inner-page.html#${item?.id}" title="${item?.title}">${item?.title}</a></h4>
  <p class="description">${item?.description}</p></div>`;
      }
      const serviceDetails = (item, index) => {
          return `<section class="${index % 2 === 0 ? 'about' : 'about section-bg'}" id="${item?.id}">
      <div class="container">
          <div class="row">
              <div class="col-lg-12 pt-4 pt-lg-0 content" data-aos="fade-left">
                  <h3>${item?.title}</h3>
                  <p class="fst-italic">${item?.description}</p>
                  <div class="row">
                      <div class="col-lg-12">
                      <ul>${item?.points?.map((elm, i) => `<li key=${i} class="d-block"><i class="bi bi-chevron-right"></i> <strong>${elm?.title}:</strong><span>${elm?.description}</span></li>`).join('')}</ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>`;
      }
      fetch('/assets/jsons/service.json')
          .then(response => response.json())
          .then(serviceJson => {
              const service = serviceJson;
              if (document.getElementById("homePageServices")) {
                  const items = document.getElementById("homePageServices");
                  service.forEach((element, index) => {
                      items.innerHTML += homePageService(element, index);
                  });
              }
              if (document.getElementById("services-details")) {
                  const itemDetails = document.getElementById("services-details");
                  service.forEach((element, index) => {
                      itemDetails.innerHTML += serviceDetails(element, index);
                  });
              }
          })
          .catch(error => {
              console.error('Error loading JSON:', error);
          });
  });
  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()