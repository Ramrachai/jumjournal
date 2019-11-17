<?php
/**
 * Template Name: Bangla Homepage 
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
                        <span> শেয়ার </span>
                        এবং
                        <span> এক্সপ্লোর </span>
                    </h1>
                    <h3> নতুন আইডিয়া এবং চিন্তা</h3>
                    <p> ৈবচিত্র মানুষ ৈবচিত্র চিন্তা </p>
                    <a class="home-btn" href="<?php echo esc_url( home_url( '/' ) ); ?>Get-involved">Get involved</a>
                </div>


            </div>
            <div class="col-md-6 col-12">
                <div class="hero-img-container">
                    <!-- <img class = 'img-fluid' src="<?php //echo get_template_directory_uri().'/images/hero-bg.svg' ?>" alt=""> -->
                    <?php get_template_part('components/hero-image')?>
                </div>
            </div>
        </div>
    </div>

    <div id="fav" class="fav bounce">
        <a href="#target"><i class="fas fa-angle-down"></i></a>
    </div>
</section>
<!--.hero section-->

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
</div>
<!--.home-nav-box-->

<section class="description">
    <div class="green-bars hide-on-mobile">

        <svg version="1.1" id="green-bar1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px" width="210.4px" height="125.9px" viewBox="0 0 210.4 125.9"
            style="enable-background:new 0 0 210.4 125.9;" xml:space="preserve">
            <style type="text/css">
            .barStroke {
                fill: url(#SVGID_1_);
            }
            </style>
            <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="32.6498" y1="1.3169" x2="151.5959"
                y2="133.593" gradientTransform="matrix(1 0 0 -1 0 126.7723)">
                <stop offset="0" style="stop-color:#00C08D" />
                <stop offset="0.2939" style="stop-color:#29C77F" />
                <stop offset="0.7722" style="stop-color:#66D16B" />
                <stop offset="1" style="stop-color:#7ED563" />
            </linearGradient>
            <path class="barStroke"
                d="M143.9,4.8L6.6,5.7V122l138.1-0.9c32.1-0.2,58-26.4,57.8-58.5C202.2,30.5,176,4.6,143.9,4.8z" />
        </svg>


    </div>
    <!-- green bars finish  -->

    <div class="container">
        <div class="row">
            <div class="col-md-4 col-sm-12 col-12 description-left-container">
                <div class="description-left ">
                    <h2>Leave no one <span>behind</span></h2>
                    <p>
                        Jumjournal is an leading online community and archive based on Chittagong Hill Tracts raising
                        voice of marginalized people to reach across the whole world. It’s an amazing platform to share
                        and explore new ideas and thoughts representing diverse views of diverse people from different
                        communities.
                    </p>
                </div>
            </div>
            <div class="col-md-8 col-sm-12 col-12">

                <div class="description-right">
                    <div class="single-description">
                        <i class="fas fa-bullhorn"></i>
                        <div class="text">
                            <h2>Promoting Culture</h2>
                            <p>Promoting diverse culture of indigenous people Bangladesh and reach the world's people is
                                one of our primary objectives </p>
                        </div>
                    </div> <!-- single description finish -->

                    <div class="single-description">
                        <i class="fas fa-cloud-upload-alt"></i>

                        <h2>Conserving Culture</h2>
                        <p>We already lost many precious cultural components as no one sincerely conserved them in the
                            past. Jumjournal is trying hard to conserve them sustainably for present and future
                            generation</p>

                    </div> <!-- single description finish -->

                    <div class="single-description">
                        <i class="far fa-check-square"></i>

                        <h2>All resources in one place</h2>
                        <p>In jumjournal you will find almost all helpful resources regarding Bangladeshi indigenous
                            people's culture </p>

                    </div> <!-- single description finish -->

                    <div class="single-description">
                        <i class="fas fa-dove"></i>

                        <h2>Freedom to speak</h2>
                        <p>Speak loud, raise your voice. This is a place to talk independently and logically</p>

                    </div> <!-- single description finish -->

                    <div class="single-description">
                        <i class="fas fa-share-alt"></i>

                        <h2>Share your knowledge</h2>
                        <p>Share what you want to share with people. Here you can spread your precious experience,
                            knowledge and ideas which may contribute in advancement of society and culture. </p>

                    </div> <!-- single description finish -->

                    <div class="single-description">
                        <i class="fas fa-university"></i>

                        <h2>Research</h2>
                        <p>We can hardly find appropriate resources to study or research on indigenous community of
                            Bangladesh. Jumjournal aims at providing precise information regarding indigenous socity and
                            their culture</p>

                    </div> <!-- single description finish -->

                </div>
            </div>
        </div>
    </div>

</section>

<div class="feature-text">
    <h2>More from Jumjournal </h2>
</div>

<div class="feature-container">

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

    <div class="container all-features" id='features'>
        <div class="row">
            <div class="col-12 features">
                <!-- learn -->
                <div class="learn">
                    <i class="fas fa-graduation-cap"></i>
                    <h3>Learn</h3>
                    <p>Let’s explore what’s on Jumjournal.There are lot's of stuff regarding our own history, culture,
                        people,lifestyle and struggle.</p>
                    <a href="#" class='btn home-btn  '>Learn More</a>
                </div>
                <!-- learn -->

                <!-- Entertainment -->
                <div class="entertainment">
                    <i class="fa fa-music"></i>
                    <h3>Entertainment</h3>
                    <p>Feel Your Identity. Photos, videos and musics are organized at one place to enjoy and feel them
                        even more better.</p>
                    <a href="#" class='btn home-btn '>Learn More</a>
                </div>
                <!-- Entertainment -->

                <!-- Contribute -->
                <div class="contribute">
                    <i class="fas fa-hands-helping"></i>
                    <h3>Contribute</h3>
                    <p>Let's make it even better. Jumjournal is comitted to build a great platform of online
                        resources.Be a part of this initiative.</p>
                    <a href="#" class='btn home-btn '>Learn More</a>
                </div>
                <!-- Contribute -->


            </div>
        </div>
    </div>
</div>


<section class='file-submit'>
    <div class="container">
        <div class="row">
            <div class="col-12 file-submit-container">
                <h2>Send us your files</h2>
                <p>Your small contribution can play very important role to sustainably conserve your culture for present
                    and future generations. Get started today, be a part of jumjournal community. You can send us
                    Audios, Videos, Pictures and Pdf books. </p>
                <div class='submit-btn-container'> <a href="#" class='home-btn'>File submit</a> </div>
            </div>
        </div>
    </div>
</section>



<?php get_template_part('global-templates/footer-sub'); ?>
<?php get_template_part('global-templates/footer-one'); ?>

<?php get_footer(); ?>