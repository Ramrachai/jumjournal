var controller = new ScrollMagic.Controller();

var tlFirstScrollScale = new TimelineMax();
tlFirstScrollScale
  .set("#features", {
    scale: 0.1,
    y: "-100%"
  })

  .to("#features", 1, { scale: 1, y: "-40%" });
var scene1 = new ScrollMagic.Scene({
  triggerElement: ".feature-container",
  triggerHook: 1,
  duration: "100%"
  // offset: -100
})
  .setTween(tlFirstScrollScale)
  .addTo(controller);
// ==========
var tlFirstScroll = new TimelineMax();
tlFirstScroll
  .set("#features", {
    opacity: 0
  })

  .to("#features", 2, { opacity: 1 });

var scene1 = new ScrollMagic.Scene({
  triggerElement: ".feature-container",
  triggerHook: 1,
  duration: "100%"
  // offset: -100
})
  .setTween(tlFirstScroll)
  .addTo(controller);

var tlSecondScroll = new TimelineMax();
tlSecondScroll.to(".learn", 3, { x: "120%" });
tlSecondScroll.to(".entertainment", 3, { x: "-120%" }, "-=3");

var scene2 = new ScrollMagic.Scene({
  triggerElement: ".feature-container",
  triggerHook: 0,
  duration: "100%"
})
  .setTween(tlSecondScroll)
  .setPin(".feature-container")
  .addTo(controller);

var tlthirdScroll = new TimelineMax();
tlthirdScroll
  .set(".feature-text h2", {
    opacity: 0,
    y: "-10%"
  })
  .to(".feature-text h2", 2, { opacity: 1, y: "0%" });

var bounce = new ScrollMagic.Scene({
  triggerElement: ".feature-text",
  triggerHook: 1,
  // offset: 200,
  duration: "100%"
})
  // .setClassToggle(".feature-text h2", "bounce")
  .setTween(tlthirdScroll)
  .addTo(controller);
