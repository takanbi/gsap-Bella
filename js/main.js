gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksRev = gsap.utils.toArray(".main-nav a").reverse();//for reversing
  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", (e) => {
      link.classlist.add("animate-out");
      setTimeout(() => {
        link.classlist.remove("animate-out");
      }, 300);
    });
  });
  function navAnimation(direction) {
    //   console.log(direction);// shows if scroll down its 1, if scroll up its -1
      const scrollingDown = direction === 1;
      const links = scrollingDown ? mainNavLinks : mainNavLinksRev; //this will grab which array needs to be used based on direction
    // return gsap.to(mainNavLinks, {
    return gsap.to(links, {
      duration: 1,
      stagger: 0.5,
    //   autoAlpha: 0,
    autoAlpha: () => scrollingDown ? 0 : 1, //if we are scrollingdown set autoAlpha to 0
        //   y: 20,
          y: () => scrollingDown ? 20 : 0,
    });
  }
  ScrollTrigger.create({
    start: 100,
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    onEnter: ({direction})=> navAnimation(direction),
    onLeaveBack: ({direction})=> navAnimation(direction),
    markers: true,
  });
}
function init() {
  initNavigation();
}

window.addEventListener("load", function () {
  init();
});
