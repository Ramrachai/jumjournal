<?php
/**
 * Template Name: Homepage
 *
 * This template will be used as homepage
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

	<section class="jumjournal-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-12  ">
          <div class="heading-container">
              <h1> 
                <span> share </span>  
                and 
                <span> explore </span>
              </h1>
              <h3>new ideas and thoughts</h3>
              <p>representing diverse views of diverse people </p>
              <a class="home-btn" href="<?php echo esc_url( home_url( '/' ) ); ?>Get-involved" >Get involved</a>
          </div>
            
          
        </div>
        <div class="col-md-6 col-12">
          <div class="hero-img-container">
            <img class = 'img-fluid' src="<?php echo get_template_directory_uri().'/images/hero-bg.svg' ?>" alt="">
            <!-- <svg version="1.1" id="hero-img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 238.6 199.1" style="enable-background:new 0 0 238.6 199.1;" xml:space="preserve">
<style type="text/css">
	.hero1{fill:#CB7829;}
	.hero2{fill:#171313;}
	.hero3{fill:#FCC792;}
	.hero4{fill:#F9A83B;}
	.hero5{fill:#333333;}
	.hero6{fill:url(#SVGID_1_);}
	.hero7{fill:#683E05;}
	.hero8{fill:#C4C4C4;}
	.hero9{fill:#FFFFFF;}
	.hero10{fill:#262626;}
	.hero20{fill:url(#SVGID_2_);}
	.hero21{fill:url(#SVGID_3_);}
	.hero22{fill:url(#SVGID_4_);}
	.hero23{fill:#513409;}
	.hero24{fill:url(#SVGID_5_);}
</style>
<polygon class="hero1" points="42.7,77.6 42.3,77.3 42.3,77.3 "/>
<path class="hero2" d="M40.2,132.4c0-0.1,0.1-0.1,0.1-0.2C40.2,132.3,40.2,132.4,40.2,132.4z"/>
<path class="hero2" d="M37.8,104.8c0.2-0.3,0.3-0.6,0.4-0.9c0.1-0.2,0.2-0.5,0.3-0.7C38.3,103.7,38,104.2,37.8,104.8z"/>
<polygon class="hero2" points="25.9,67.7 32.1,88.9 30.4,90.8 18.8,73.5 16.7,74.2 8.2,52.2 "/>
<polygon class="hero3" points="40.1,80.2 40.2,80.3 38.9,81.7 32.1,88.9 30.4,90.8 18.8,73.5 16.7,74.2 8.2,52.2 25.9,67.7 "/>
<polygon class="hero3" points="42.7,77.6 42.3,77.3 42.3,77.3 "/>
<polygon class="hero1" points="42.7,77.7 42.7,77.6 42.7,77.6 "/>
<polygon class="hero4" points="42.7,77.6 42.3,77.3 42.3,77.3 "/>
<polygon class="hero4" points="42.7,77.7 42.7,77.6 42.7,77.6 "/>
<path class="hero3" d="M67.8,94c-0.5,1.3-1.3,2.9-1.9,3.9c-1.8,2.9-4.3,4.9-7,6.1c-1.1,0.5-2.3,0.9-3.5,1.2l0,0
	c-1.3,0.3-2.7,0.6-4,0.7c-1.6,0.2-3.1,0.2-4.6,0.2c-1.3,0-2.5-0.1-3.6-0.2c-3.2-0.3-5.5-0.9-5.7-1v-0.1c0.1-0.3,0.3-0.6,0.4-0.9
	c0.3-0.6,0.5-1.2,0.7-1.7c0.1-0.4,0.3-0.8,0.4-1.2c0.1-0.3,0.2-0.6,0.3-0.9c0-0.1,0.1-0.2,0.1-0.3c0.1-0.2,0.1-0.4,0.2-0.6
	c0-0.1,0.1-0.2,0.1-0.3v-0.1c0.1-0.3,0.2-0.7,0.2-1c0.1-0.4,0.2-0.9,0.2-1.3c0-0.3,0.1-0.7,0.1-1c0-0.2,0-0.4,0.1-0.6
	c0.1-0.6,0.1-1.2,0.1-1.7v-0.1c0-0.1,0-0.2,0-0.4c0-0.1,0-0.2,0-0.2c0-0.4,0-0.8,0-1.1c0-0.2,0-0.3,0-0.5c0,0,0,0,0-0.1l0,0l0,0
	c0-0.2,0-0.4,0-0.6l0,0c-0.3-3.2-1-5.7-1.4-7.2c0-0.1-0.1-0.3-0.1-0.4c-0.1-0.4-0.2-0.6-0.3-0.7c0-0.1,0-0.1,0-0.1l1.4-1.5l0.8,0.7
	l9.4,4.6L49.8,84l-0.4-1.8l16.9,11.2L67.8,94z"/>
<path class="hero5" d="M0,40.3l0.1,1l0.1,0.5l0.1,0.3l0.1,0.6l0.3,2.7l4.7,4.1l3,2.6l17.7,15.5l14.2,12.5l0.1,0.1L41,81l9.3,4.6
	l16,7.9l2.6-0.9l-0.1,1l7.7,0.2L93.2,94l1.4,3.2c0.3,0.1,0.6,0.2,0.9,0.2l0,0c4.7,1.4,9.7,3.7,14,7.5c-0.5-0.7-15-19.7-29.8-35.4
	c-3.3-3.5-6.7-6.8-9.9-9.8c0,0,0-0.3,0-0.8C69.9,51.1,68.3-11,0,40.3z M42.3,77.4L42.3,77.4l0.3,0.3L42.3,77.4z"/>
<path class="hero5" d="M0,41.3c0,0,38,58.3,109.5,64.7L81.1,72.6L21.5,41.3H0z"/>
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-1199.9767" y1="617.2682" x2="-1065.5767" y2="617.2682" gradientTransform="matrix(-1 0 0 1 -961.3767 -498)">
	<stop  offset="0" style="stop-color:#FF6C55"/>
	<stop  offset="1" style="stop-color:#FFE37F"/>
</linearGradient>
<path class="hero6" d="M207.6,44.5c0,0,11.2,98.5,31,121.8c0,0-22.5,31.3-54.7,27.4c0,0-22.4-49.7-79.7-100.9L207.6,44.5z"/>
<ellipse transform="matrix(0.9076 -0.4198 0.4198 0.9076 -14.5155 71.8554)" class="hero7" cx="156" cy="68.9" rx="57.1" ry="9.9"/>
<path class="hero2" d="M37.8,104.8c0.2-0.3,0.3-0.6,0.4-0.9c0.1-0.2,0.2-0.5,0.3-0.7C38.3,103.7,38,104.2,37.8,104.8z"/>
<path class="hero5" d="M99.9,93.7c0,0,33.4,17.5,60.5,74.1c0,0-42-65.4-69-71.9c-0.5-0.1-0.9-0.2-1.4-0.3C63.2,91,99.9,93.7,99.9,93.7
	z"/>
<ellipse transform="matrix(0.3655 -0.9308 0.9308 0.3655 0.5081 97.762)" class="hero5" cx="72" cy="48.5" rx="10.1" ry="13.4"/>
<path class="hero8" d="M60.7,106.1c-1,1.9-0.2,4.1,1.7,5.1c1.9,0.9,4.2,0.1,5.1-1.8c1-1.9,0.2-4.1-1.7-5.1
	C64,103.4,61.7,104.2,60.7,106.1z"/>
<path class="hero8" d="M57.6,115c-1,1.9-0.2,4.1,1.7,5.1c1.9,0.9,4.2,0.1,5.1-1.8c1-1.9,0.2-4.1-1.7-5.1
	C60.9,112.3,58.6,113.1,57.6,115z"/>
<path class="hero8" d="M52.7,124.1c-0.9,1.8-0.2,3.9,1.6,4.8s4,0.1,4.9-1.7s0.2-3.9-1.6-4.8C55.8,121.6,53.6,122.3,52.7,124.1z"/>
<path class="hero8" d="M48.5,132.3c-0.9,1.8-0.2,3.9,1.6,4.8c1.8,0.9,4,0.1,4.9-1.7s0.2-3.9-1.6-4.8C51.6,129.8,49.4,130.6,48.5,132.3
	z"/>
<path class="hero8" d="M43.6,139.8c-0.9,1.8-0.2,3.9,1.6,4.8c1.8,0.9,4,0.1,4.9-1.7s0.2-3.9-1.6-4.8S44.5,138,43.6,139.8z"/>
<path class="hero8" d="M37.3,146.5c-0.9,1.8-0.2,3.9,1.6,4.8c1.8,0.9,4,0.1,4.9-1.7s0.2-3.9-1.6-4.8C40.4,144,38.2,144.7,37.3,146.5z"
	/>
<path class="hero8" d="M29.9,147.2c-0.9,1.8-0.2,3.9,1.6,4.8c1.8,0.9,4,0.1,4.9-1.7s0.2-3.9-1.6-4.8C33,144.7,30.8,145.4,29.9,147.2z"
	/>
<path class="hero8" d="M24.9,141.5c-0.7,1.9-0.1,4.1,1.2,5.1c1.4,0.9,3.1,0.1,3.8-1.8c0.7-1.9,0.1-4.1-1.2-5.1
	C27.3,138.9,25.6,139.7,24.9,141.5z"/>
<path class="hero8" d="M24.1,132.5c-0.7,1.9-0.1,4.1,1.2,5.1c1.4,0.9,3.1,0.1,3.8-1.8c0.7-1.9,0.1-4.1-1.2-5.1
	C26.5,129.8,24.8,130.6,24.1,132.5z"/>
<path class="hero8" d="M23.8,123.1c-0.7,1.9-0.1,4.1,1.2,5.1c1.4,0.9,3.1,0.1,3.8-1.8c0.7-1.9,0.1-4.1-1.2-5.1
	C26.2,120.4,24.5,121.2,23.8,123.1z"/>
<path class="hero8" d="M24.1,113.8c-0.7,1.9-0.1,4.1,1.2,5.1c1.4,0.9,3.1,0.1,3.8-1.8c0.7-1.9,0.1-4.1-1.2-5.1
	C26.5,111.1,24.8,111.9,24.1,113.8z"/>
<path class="hero8" d="M25.5,104.9c-0.7,1.9-0.1,4.1,1.2,5.1c1.4,0.9,3.1,0.1,3.8-1.8c0.7-1.9,0.1-4.1-1.2-5.1
	C27.9,102.2,26.2,103,25.5,104.9z"/>
<path class="hero9" d="M25.5,96.4c-1,1.9-0.2,4.1,1.7,5.1c1.9,0.9,4.2,0.1,5.1-1.8c1-1.9,0.2-4.1-1.7-5.1
	C28.8,93.7,26.5,94.5,25.5,96.4z"/>
<path class="hero10" d="M61.6,108.8c-1.2,1.6-0.8,3.8,0.9,4.9c1.7,1.2,4,0.8,5.1-0.7c1.2-1.6,0.8-3.8-0.9-4.9
	C65.1,106.9,62.8,107.2,61.6,108.8z"/>
<path class="hero8" d="M64.7,98.1c-1,1.9-0.2,4.1,1.7,5.1c1.9,0.9,4.2,0.1,5.1-1.8c1-1.9,0.2-4.1-1.7-5.1C68,95.4,65.7,96.2,64.7,98.1
	z"/>
<path class="hero10" d="M65.6,100.8c-1.2,1.6-0.8,3.8,0.9,4.9c1.7,1.2,4,0.8,5.1-0.7c1.2-1.6,0.8-3.8-0.9-4.9
	C69.1,99,66.8,99.3,65.6,100.8z"/>
<path class="hero10" d="M57.4,116.4c-1.2,1.6-0.8,3.8,0.9,4.9c1.7,1.2,4,0.8,5.1-0.7c1.2-1.6,0.8-3.8-0.9-4.9
	C60.9,114.5,58.6,114.9,57.4,116.4z"/>
<path class="hero10" d="M52.9,124.2c-1.2,1.6-0.8,3.8,0.9,4.9c1.7,1.2,4,0.8,5.1-0.7c1.2-1.6,0.8-3.8-0.9-4.9
	C56.3,122.4,54,122.7,52.9,124.2z"/>
<path class="hero10" d="M46.4,130.9c-1.1,1.5-0.7,3.5,0.9,4.6c1.6,1.1,3.7,0.8,4.8-0.7s0.7-3.5-0.9-4.6
	C49.7,129.1,47.5,129.4,46.4,130.9z"/>
<path class="hero10" d="M41.5,137.7c-1.2,1.6-0.8,3.8,0.9,4.9c1.7,1.2,4,0.8,5.1-0.7c1.2-1.6,0.8-3.8-0.9-4.9
	C44.9,135.8,42.6,136.1,41.5,137.7z"/>
<path class="hero10" d="M34.2,143.1c-1.2,1.6-0.8,3.8,0.9,4.9c1.7,1.2,4,0.8,5.1-0.7c1.2-1.6,0.8-3.8-0.9-4.9
	C37.7,141.2,35.4,141.5,34.2,143.1z"/>
<path class="hero10" d="M26.9,142c-0.8,1.6-0.6,3.8,0.7,4.9c1.2,1.2,2.9,0.8,3.7-0.7c0.8-1.6,0.6-3.8-0.7-4.9
	C29.4,140.1,27.7,140.5,26.9,142z"/>
<path class="hero10" d="M23.5,134.5c-0.8,1.6-0.6,3.8,0.7,4.9c1.2,1.2,2.9,0.8,3.7-0.7c0.8-1.6,0.6-3.8-0.7-4.9
	C26,132.6,24.3,132.9,23.5,134.5z"/>
<path class="hero10" d="M23.6,126.1c-0.8,1.6-0.6,3.8,0.7,4.9c1.2,1.2,2.9,0.8,3.7-0.7c0.8-1.6,0.6-3.8-0.7-4.9
	C26.1,124.2,24.5,124.5,23.6,126.1z"/>
<path class="hero10" d="M24.2,117.4c-0.8,1.6-0.6,3.8,0.7,4.9c1.2,1.2,2.9,0.8,3.7-0.7c0.8-1.6,0.6-3.8-0.7-4.9
	C26.8,115.5,25.1,115.8,24.2,117.4z"/>
<path class="hero10" d="M25.5,109c-0.8,1.6-0.6,3.8,0.7,4.9c1.2,1.2,2.9,0.8,3.7-0.7c0.8-1.6,0.6-3.8-0.7-4.9
	C28,107.1,26.4,107.4,25.5,109z"/>
<path class="hero10" d="M25.8,101.2c-1.2,1.6-0.8,3.8,0.9,4.9c1.7,1.2,4,0.8,5.1-0.7c1.2-1.6,0.8-3.8-0.9-4.9
	C29.2,99.3,26.9,99.6,25.8,101.2z"/>
<path class="hero10" d="M29.5,93.9c-1.2,1.6-0.8,3.8,0.9,4.9c1.7,1.2,4,0.8,5.1-0.7c1.2-1.6,0.8-3.8-0.9-4.9C33,92,30.7,92.3,29.5,93.9
	z"/>
<path class="hero5" d="M26.3,105.3c0.8,0.7,1.6,1.3,2.4,1.9c0,0,1.2,1.3,2.8,3.3c0.2,0.2,0.3,0.4,0.5,0.6c0.1,0.1,0.2,0.2,0.3,0.4
	c1.6,2.1,3.5,4.6,5.1,7.4c2.8,4.7,4.7,9.8,3,13.2c0.8-1.6,4.5-9.9,4-19.6c-0.1-2.2-0.4-4.4-1-6.6c-0.7-2.6-1.7-5.3-3.3-7.9l0,0l0,0
	l0,0c0.3-1.8,0.5-3.5,0.5-5.1v-0.2c0-0.4,0-0.8,0-1.1c0-0.2,0-0.4,0-0.6c-0.2-3.4-0.9-6.3-1.3-7.8c0-0.1-0.1-0.3-0.1-0.4
	c-0.1-0.4-0.2-0.6-0.2-0.7V82l-6.2,6.6l-0.5,0.6l0,0l-0.4,0.5l-1.3,1.4L18.8,73.5l-2.1,0.7l-8.5-22l-3-2.6C5,60.5,6.4,89,26.3,105.3
	z"/>
<path class="hero5" d="M40.1,97.9L40.1,97.9L40.1,97.9L40.1,97.9z"/>
<path class="hero5" d="M32.1,88.9c0.4,0.3,0.7,0.6,1.1,0.9C32.9,89.5,32.5,89.2,32.1,88.9L32.1,88.9z"/>
<path class="hero5" d="M32.1,88.9c0.4,0.3,0.7,0.6,1.1,0.9C32.9,89.5,32.5,89.2,32.1,88.9L32.1,88.9z"/>
<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="-1137.7338" y1="606.9806" x2="-1018.0193" y2="577.9972" gradientTransform="matrix(-1 0 0 1 -961.3767 -498)">
	<stop  offset="0" style="stop-color:#7F4E00"/>
	<stop  offset="1" style="stop-color:#B44A00"/>
</linearGradient>
<polygon class="hero20" points="223.9,132.2 4,48.5 9.9,61.2 226.2,139.8 "/>
<linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="87.5" y1="555" x2="140.5098" y2="555" gradientTransform="matrix(1 0 0 1 0 -498)">
	<stop  offset="0" style="stop-color:#FFBB65"/>
	<stop  offset="1" style="stop-color:#CC3A00"/>
</linearGradient>
<path class="hero21" d="M129.9,90L87.5,38.1L98.2,24l42.4,62.2C138.6,87,132.9,89.1,129.9,90z"/>
<linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="117.9269" y1="525.3088" x2="148.8213" y2="572.8108" gradientTransform="matrix(1 0 0 1 0 -498)">
	<stop  offset="0" style="stop-color:#D06038"/>
	<stop  offset="1" style="stop-color:#AB5F22"/>
</linearGradient>
<path class="hero22" d="M151.6,81.7L113.8,2.9L95,0l48.7,85C143.7,85,147.3,83.6,151.6,81.7z"/>
<rect x="154.6" y="101.8" class="hero23" width="3.6" height="17.7"/>
<linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="-1080.9536" y1="572.012" x2="-1036.6302" y2="572.012" gradientTransform="matrix(-1 0 0 1 -961.3767 -498)">
	<stop  offset="0" style="stop-color:#7F4E00"/>
	<stop  offset="1" style="stop-color:#B44A00"/>
</linearGradient>
<path class="hero24" d="M111.8,82.9l-28.5-9.2c0,0-6.9-7.3-8.1-8.5s44.3,12.2,44.3,12.2L111.8,82.9z"/>
<path class="hero5" d="M38.5,79.4c0,0,79.2,27.1,121.9,88.5C160.4,167.8,132.9,92.6,38.5,79.4z"/>
</svg>

            <div id="slider"></div><div id="replay" style="position:relative; display:inline-block; text-align:right; cursor:pointer; color:#999999; font-family:Arial, Verdana, sans-serif; font-size:12px; bottom: 35px; margin-left: 24px;">replay <img id="replayIcon" src="//greensock.com/_img/codepen/allDevicesBanner/replay.png" width="19" height="19" style="margin-left:2px; vertical-align: middle;" /></div> -->

          </div>
        </div>
      </div>
    </div>

    <div id="fav" class="fav bounce">
        <a href="#target"><i class="fas fa-angle-down"></i></a>
    </div>
  </section><!--.hero section-->

  <div id="target" class="home-nav-box">
    <div class="<?php echo esc_attr( $container ); ?>">
      <div class="row">
        <div class="col-md-12">
          <div class="content-inner center">
              <a class="nav-box-link " href="<?php echo esc_url( home_url( '/' ) ); ?>bangla-blog">
                <div class="nav-box">
                  <i class="fas fa-file-alt"></i>
                  <span>Bangla blog</span>
                </div>
              </a>
            
            
              <a class="nav-box-link " href="<?php echo esc_url( home_url( '/' ) ); ?>english-blog">
                <div class="nav-box">
                  <i class="far fa-file-alt"></i>
                  <span>English blog</span>
                </div>
              </a>
            
            <a class="nav-box-link" href="<?php echo esc_url( home_url( '/' ) ); ?>photo-gallery">
              <div class="nav-box">
                <i class="fas fa-camera-retro"></i>
                <span>Photo Gallery</span>
              </div>
            </a>
            <a class="nav-box-link" href="<?php echo esc_url( home_url( '/' ) ); ?>library">
              <div class="nav-box">
                <i class="fas fa-book"></i>
                <span>Library</span>
              </div>
            </a>
            <a class="nav-box-link" href="<?php echo esc_url( home_url( '/' ) ); ?>audio-archive">
              <div class="nav-box">
                <i class="fas fa-headphones-alt"></i>
                <span>Audio Archive</span>
              </div>
            </a>
            <a class="nav-box-link" href="<?php echo esc_url( home_url( '/' ) ); ?>video-archive">
              <div class="nav-box">
                <i class="fas fa-video"></i>
                <span>Video Archive</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div><!--.home-nav-box-->

<section class="description">
  <div class="green-bars hide-on-mobile">
  <?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="green-bar1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="210.4px" height="125.9px" viewBox="0 0 210.4 125.9" style="enable-background:new 0 0 210.4 125.9;" xml:space="preserve"
	>
<style type="text/css">
	.barStroke{fill:url(#SVGID_1_);}
</style>
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="32.6498" y1="1.3169" x2="151.5959" y2="133.593" gradientTransform="matrix(1 0 0 -1 0 126.7723)">
	<stop  offset="0" style="stop-color:#00C08D"/>
	<stop  offset="0.2939" style="stop-color:#29C77F"/>
	<stop  offset="0.7722" style="stop-color:#66D16B"/>
	<stop  offset="1" style="stop-color:#7ED563"/>
</linearGradient>
<path class="barStroke" d="M143.9,4.8L6.6,5.7V122l138.1-0.9c32.1-0.2,58-26.4,57.8-58.5C202.2,30.5,176,4.6,143.9,4.8z"/>
</svg>


  </div>
<!-- green bars finish  -->

  <div class="container">
    <div class="row">
      <div class="col-md-4 col-sm-12 col-12 description-left-container">
        <div class="description-left ">
          <h2>Leave no one <span>behind</span></h2>
          <p>
          Jumjournal is an leading online community and archive based on Chittagong Hill Tracts raising voice of marginalized people to reach across the whole world. It’s an amazing platform to share and explore new ideas and thoughts representing diverse views of diverse people from different communities.
          </p>
        </div>
      </div>
      <div class="col-md-8 col-sm-12 col-12">

        <div class="description-right">
          <div class="single-description">
            <i class="fas fa-bullhorn"></i>
            <div class="text">
               <h2>Promoting Culture</h2>
               <p>Promoting diverse culture of indigenous people Bangladesh and reach the world's people is one of our primary objectives </p>
            </div> 
          </div> <!-- single description finish --> 

          <div class="single-description">
            <i class="fas fa-cloud-upload-alt"></i>
            
               <h2>Conserving Culture</h2>
               <p>We already lost many precious cultural components as no one sincerely conserved them in the past. Jumjournal is trying hard to conserve them sustainably for present and future generation</p>
            
          </div> <!-- single description finish --> 

          <div class="single-description">
            <i class="far fa-check-square"></i>
            
               <h2>All resources in one place</h2>
               <p>In jumjournal you will find almost all helpful resources regarding Bangladeshi indigenous people's culture </p>
            
          </div> <!-- single description finish --> 

          <div class="single-description">
            <i class="fas fa-dove"></i>
            
               <h2>Freedom to speak</h2>
               <p>Speak loud, raise your voice. This is a place to talk independently and logically</p>
           
          </div> <!-- single description finish --> 

          <div class="single-description">
            <i class="fas fa-share-alt"></i>
           
               <h2>Share your knowledge</h2>
               <p>Share what you want to share with people. Here you can spread your precious experience, knowledge and ideas which may contribute in advancement of society and culture. </p>
           
          </div> <!-- single description finish --> 

          <div class="single-description">
            <i class="fas fa-university"></i>
            
               <h2>Research</h2>
               <p>We can hardly find appropriate resources to study or research on indigenous community of Bangladesh. Jumjournal aims at providing precise information regarding indigenous socity and their culture</p>
            
          </div> <!-- single description finish --> 

        </div>
      </div>
    </div>
  </div>
  
</section>

<div class="feature-text">
  <h2>More from Jumjournal </h2>
</div>

<div class="feature-container" >

  <div class="particles-container">
      
      <div id="particles1-js"></div>
      <div id="particles2-js"></div>
      <div id="particles3-js"></div>
      <div id="particles4-js"></div>
      <div id="particles5-js"></div>
      <div id="particles6-js"></div>
      <div id="particles7-js"></div>
      <div id="particles8-js"></div>
      <div id="particles9-js"></div>
      <div id="particles10-js"></div>
      <div id="particles11-js"></div>
      <div id="particles12-js"></div>
      
  </div>
  
  <div class="container all-features" id = 'features'>
    <div class="row">
      <div class="col-12 features">
      <!-- learn -->
        <div class="learn">
          <i class="fas fa-graduation-cap"></i>
          <h3>Learn</h3>
          <p>Let’s explore what’s on Jumjournal.There are lot's of stuff regarding our own history, culture, people,lifestyle and struggle.</p>
          <a href="#" class ='btn home-btn  '>Learn More</a>
        </div>
      <!-- learn -->

      <!-- Entertainment -->
      <div class="entertainment">
      <i class="fa fa-music"></i>
          <h3>Entertainment</h3>
          <p>Feel Your Identity. Photos, videos and musics are organized at one place to enjoy and feel them even more better.</p>
          <a href="#" class ='btn home-btn '>Learn More</a>
        </div>
      <!-- Entertainment -->

      <!-- Contribute -->
      <div class="contribute">
      <i class="fas fa-hands-helping"></i>
          <h3>Contribute</h3>
          <p>Let's make it even better. Jumjournal is comitted to build a great platform of online resources.Be a part of this initiative.</p>
          <a href="#" class ='btn home-btn '>Learn More</a>
        </div>
      <!-- Contribute -->


      </div>
    </div>
  </div>
</div>


<section class = 'file-submit'>
  <div class="container">
    <div class="row">
      <div class="col-12 file-submit-container">
        <h2>Submit your files</h2>
        <p>Your small contribution can play very important role to sustainably conserve your culture for present and future generations. Get started today, be a part of jumjournal community  </p>
        <div class='submit-btn-container'> <a href="#" class = 'home-btn'>File submit</a> </div>
      </div>
    </div>
  </div>
</section>

 

<?php get_template_part('global-templates/footer-sub'); ?>
<?php get_template_part('global-templates/footer-one'); ?>

<?php get_footer(); ?>
