// feature section animations
// ---> on pc:  <--
// 1st) cards will scale
// 2nd) cards will fade
// 3rd) cards will move left and right
// --> on mobile <--
// 1st and 2nd same as pc
// 3rd) cards will move down

// == mobile animation start ===

function myFunction(mobileView) {
  if (mobileView.matches) {
    // hide particles on mobile
    document.querySelector(".particles-container").remove();

    //cards on scroll animation start
    var controller = new ScrollMagic.Controller();
    var learnScale = new TimelineMax();
    learnScale
      .set(".learn", {
        scale: 0.1
      })

      .to(".learn", 1, { scale: 1 });
    var scale = new ScrollMagic.Scene({
      triggerElement: ".learn",
      triggerHook: 1,
      duration: "100%",
      offset: -120
    })
      .setTween(learnScale)
      .addTo(controller);

    // learn finish
    var controller = new ScrollMagic.Controller();
    var entertainmentScale = new TimelineMax();
    entertainmentScale
      .set(".entertainment", {
        scale: 0.1
      })

      .to(".entertainment", 1, { scale: 1 });
    var scale = new ScrollMagic.Scene({
      triggerElement: ".entertainment",
      triggerHook: 1,
      duration: "100%",
      offset: -120
    })
      .setTween(entertainmentScale)
      .addTo(controller);
    // Entertainment finish

    var controller = new ScrollMagic.Controller();
    var contributeScale = new TimelineMax();
    contributeScale
      .set(".contribute", {
        scale: 0.1
      })

      .to(".contribute", 1, { scale: 1 });
    var scale = new ScrollMagic.Scene({
      triggerElement: ".contribute",
      triggerHook: 1,
      duration: "100%",
      offset: -120
    })
      .setTween(contributeScale)
      .addTo(controller);
    // contribute finish
    // ====First scroll Scale finish======
  } else {
    // cards on scroll animation start
    var controller = new ScrollMagic.Controller();
    var firstScrollScale = new TimelineMax();
    firstScrollScale
      .set("#features", {
        scale: 0.1,
        y: "-100%"
      })

      .to("#features", 1, { scale: 1, y: "-40%" });
    var scale = new ScrollMagic.Scene({
      triggerElement: ".feature-container",
      triggerHook: 1,
      duration: "100%",
    })
      .setTween(firstScrollScale)
      .addTo(controller);
    // ====First scroll Scale finish======

    var firstScrollFade = new TimelineMax();
    firstScrollFade
      .set("#features", {
        opacity: 0
      })

      .to("#features", 2, { opacity: 1 });

    var fade = new ScrollMagic.Scene({
      triggerElement: ".feature-container",
      triggerHook: 1,
      duration: "100%"
      // offset: -100
    })
      .setTween(firstScrollFade)
      .addTo(controller);
    // ====First scroll Fade finish======

    var secondScrollmove = new TimelineMax();
    secondScrollmove.to(".learn", 3, { x: "120%" });
    secondScrollmove.to(".entertainment", 3, { x: "-120%" }, "-=3");

    var move = new ScrollMagic.Scene({
      triggerElement: ".feature-container",
      triggerHook: 0,
      duration: "100%"
    })
      .setTween(secondScrollmove)
      .setPin(".feature-container")
      .addTo(controller);
    // ====Second scroll Move finish======

    var featureText = new TimelineMax();
    featureText
      .set(".feature-text h2", {
        opacity: 0,
        y: "-10%"
      })
      .to(".feature-text h2", 2, { opacity: 1, y: "0%" });

    var bounce = new ScrollMagic.Scene({
      triggerElement: ".feature-text",
      triggerHook: 1,
      duration: "100%"
    })
      .setTween(featureText)
      .addTo(controller);

    // feature Text fade finish
    // ====cards on scroll animation for PC finish
  }
}

var mobileView = window.matchMedia("(max-width: 768px)");
myFunction(mobileView);
mobileView.addListener(myFunction);
