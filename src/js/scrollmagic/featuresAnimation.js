// feature section animations
// ---> on pc:  <--
// 1st) cards will scale
// 2nd) cards will fade
// 3rd) cards will move left and right
// --> on mobile <--
// 1st and 2nd same as pc
// 3rd) cards will move down

function featureAnimation(mobileView) {
  if (mobileView.matches) {
    // hide particles on mobile
    document.querySelector(".particles-container").remove();
    // == mobile view animation start ===
    //cards on scroll animation start
    var controller = new ScrollMagic.Controller();
    var learnScale = new TimelineMax();
    learnScale
      .set(".learn", {
        scale: 0.1
      })

      .to(".learn", 1, { scale: 1 });
    var scale1 = new ScrollMagic.Scene({
      triggerElement: ".learn",
      triggerHook: 1,
      duration: "80%",
      offset: -120
    })
      .setTween(learnScale)
      .addTo(controller);

    // learn finish
    var entertainmentScale = new TimelineMax();
    entertainmentScale
      .set(".entertainment", {
        scale: 0.1
      })

      .to(".entertainment", 1, { scale: 1 });
    var scale2 = new ScrollMagic.Scene({
      triggerElement: ".entertainment",
      triggerHook: 1,
      duration: "80%",
      offset: -120
    })
      .setTween(entertainmentScale)
      .addTo(controller);
    // Entertainment finish

    var contributeScale = new TimelineMax();
    contributeScale
      .set(".contribute", {
        scale: 0.1
      })

      .to(".contribute", 1, { scale: 1 });
    var scale3 = new ScrollMagic.Scene({
      triggerElement: ".contribute",
      triggerHook: 1,
      duration: "80%",
      offset: -120
    })
      .setTween(contributeScale)
      .addTo(controller);
    // contribute finish
    // ====First scroll Scale finish======
  } else {
    //PC animation start
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
      duration: "100%"
    })
      .setTween(firstScrollScale)
      .addTo(controller);
    // ====Sclae on  scroll  finish======

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
    // ====Fade In on  scroll  finish======

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
    // ====Move on  scroll  finish======

    var featureText = new TimelineMax();
    featureText
      .set(".feature-text h2", {
        opacity: 0,
        y: "-10%"
      })
      .to(".feature-text h2", 2, { opacity: 1, y: "0%" });

    var featureTextFade = new ScrollMagic.Scene({
      triggerElement: ".feature-text",
      triggerHook: 1,
      duration: "100%"
    })
      .setTween(featureText)
      .addTo(controller);

    // feature Text fade finish
    // ====cards on scroll animation for PC finish
  } //else finish
} // featureAnimation function finish

var mobileView = window.matchMedia("(max-width: 768px)");
featureAnimation(mobileView);
mobileView.addListener(featureAnimation);

// hero image animation start
// var heroImg = new TimelineMax({ repeat: -1 });
// heroImg
//   .from("#belt", 2, { y: "0%", x: "50%", ease: Power1.easeInOut })
//   .to("#belt", 2, { y: "0%", x: "0%", ease: Power1.easeInOut })
//   .from("#hair", 2, { y: "50%", x: "50%", ease: Power1.easeInOut }, "-=4")
//   .to("#hair", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
//   .from("#bandage", 2, { y: "-50%", x: "50%", ease: Power1.easeInOut }, "-=4")
//   .to("#bandage", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
//   .from("#stick", 2, { y: "-60%", x: "-20%", ease: Power1.easeInOut }, "-=4")
//   .to("#stick", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
//   .from("#chain", 2, { y: "30%", x: "-20%", ease: Power1.easeInOut }, "-=4")
//   .to("#chain", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
//   .from("#basket", 2, { y: "30%", x: "50%", ease: Power1.easeInOut }, "-=4")
//   .to("#basket", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
//   .from("#face", 2, { y: "-20%", x: "-20%", ease: Power1.easeInOut }, "-=4")
//   .to("#face", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
//   .from("#neck", 2, { y: "-30%", x: "-20%", ease: Power1.easeInOut }, "-=4")
//   .to("#neck", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4");

// var heroImgBuild = new ScrollMagic.Scene({
//   triggerElement: ".jumjournal-hero",
//   triggerHook: 0,
//   duration: "100%"
// })
//   .setTween(heroImg)
//   .addIndicators()
//   .addTo(controller);

//cards on scroll animation start
var controller = new ScrollMagic.Controller();
var heroImg = new TimelineMax();
heroImg
  .from("#belt", 2, { y: "0%", x: "50%", ease: Power1.easeInOut })
  .to("#belt", 2, { y: "0%", x: "0%", ease: Power1.easeInOut })
  .from("#hair", 2, { y: "50%", x: "50%", ease: Power1.easeInOut }, "-=4")
  .to("#hair", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
  .from("#bandage", 2, { y: "-50%", x: "50%", ease: Power1.easeInOut }, "-=4")
  .to("#bandage", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
  .from("#stick", 2, { y: "-60%", x: "-20%", ease: Power1.easeInOut }, "-=4")
  .to("#stick", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
  .from("#chain", 2, { y: "30%", x: "-20%", ease: Power1.easeInOut }, "-=4")
  .to("#chain", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
  .from("#basket", 2, { y: "30%", x: "50%", ease: Power1.easeInOut }, "-=4")
  .to("#basket", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
  .from("#face", 2, { y: "-20%", x: "-20%", ease: Power1.easeInOut }, "-=4")
  .to("#face", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4")
  .from("#neck", 2, { y: "-30%", x: "-20%", ease: Power1.easeInOut }, "-=4")
  .to("#neck", 2, { y: "0%", x: "0%", ease: Power1.easeInOut }, "-=4");

var heroImgBuild = new ScrollMagic.Scene({
  triggerElement: ".jumjournal-hero",
  triggerHook: 0,
  duration: "100%"
})
  .setTween(heroImg)
  .setPin(".jumjournal-hero")
  .addTo(controller);

// Hero animation finish  finish
