gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksRev = gsap.utils.toArray(".main-nav a").reverse();//for reversing
  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", (e) => {
      link.classList.add("animate-out");
      setTimeout(() => {
        link.classList.remove("animate-out");
      }, 300);
    });
  });
  function navAnimation(direction) {
    //   console.log(direction);// shows if scroll down its 1, if scroll up its -1
      const scrollingDown = direction === 1;
      const links = scrollingDown ? mainNavLinks : mainNavLinksRev; //this will grab which array needs to be used based on direction
    // return gsap.to(mainNavLinks, {
    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
    //   autoAlpha: 0,
    autoAlpha: () => scrollingDown ? 0 : 1, //if we are scrollingdown set autoAlpha to 0
        //   y: 20,
          y: () => scrollingDown ? 20 : 0,
          ease: 'power4.out'
    });
  }
  ScrollTrigger.create({
    start: 100,
    end: "bottom bottom-=20",
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    onEnter: ({direction})=> navAnimation(direction),
    onLeaveBack: ({direction})=> navAnimation(direction),
   //markers: true, //hide before editing image gallery
  });
}
function initHeaderTilt() {
    document.querySelector('header').addEventListener('mousemove', moveImages);
}
function moveImages(e) {
   // console.log(e);
   const { offsetX, offsetY, target } = e;
   const { clientWidth, clientHeight } = target;
   //console.log(offsetX, offsetY, clientWidth, clientHeight);
   //get 0 0 in the center of screen
    const xPos = (offsetX/clientWidth) - 0.5;
    const yPos = (offsetY/clientHeight) - 0.5;
   const leftImages = gsap.utils.toArray('.hg__left .hg__image');
   const modifier = (index) => index*1.2+0.5;
   //move left 3 images
   leftImages.forEach((image, index) => {
       gsap.to(image, {
           duration: 1.2,
           x: xPos*20*modifier(index),
           y: yPos*30*modifier(index),
           //note that header element has perspective set to 1000 in css
           rotationY: xPos*40,
           rotationX: yPos*10
       })
   })
}
function init() {
  initNavigation();
  initHeaderTilt();
}

window.addEventListener("load", function () {
  init();
});
