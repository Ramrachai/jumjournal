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

	<div class="jumjournal-hero page-header type-three" style = "background: url('<?php echo get_template_directory_uri(); ?>/images/cht.jpg')">
    <div class="<?php echo esc_attr( $container ); ?>">
      <div class="row">
        <div class="col-md-12">
          <div class="content-inner">
            <div class="leader">
              <!-- <img src="<?php echo get_template_directory_uri(); ?>/images/cht.jpg" alt="Leader" class="img-responsive"> -->
            </div>
            <div class="empty-space-50 hide-on-mobile"></div>
            <h1 class="heading">Leave No one behind</h1>
            <h3 class="moto">Jumjournal is an leading online community and archive based on Chittagong Hill Tracts raising voice of marginalized people to reach across the whole world. It’s an amazing platform to share and explore new ideas and thoughts representing diverse views of diverse people from different communities. </h3>
            <div class="btn-btn">
              <a class="site-btn white" href="<?php echo esc_url( home_url( '/' ) ); ?>Get-involved" >Get involved</a>
              <a href="<?php echo esc_url( home_url( '/' ) ); ?>submit" class="site-btn white">file Submit</a>
            </div>
          </div>
          <div id="fav" class="fav">
            <a href="#target"><i class="fas fa-angle-down"></i></a>
          </div>

        </div>
      </div>
    </div>
  </div><!--.page-header-->

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
            <a href="#" class ='btn btn-default  '>Learn More</a>
          </div>
        <!-- learn -->

        <!-- Entertainment -->
        <div class="entertainment">
        <i class="fa fa-music"></i>
            <h3>Entertainment</h3>
            <p>Feel Your Identity. Photos, videos and musics are organized at one place to enjoy and feel them even more better.</p>
            <a href="#" class ='btn btn-default '>Learn More</a>
          </div>
        <!-- Entertainment -->

        <!-- Contribute -->
        <div class="contribute">
        <i class="fas fa-hands-helping"></i>
            <h3>Contribute</h3>
            <p>Let's make it even better. Jumjournal is comitted to build a great platform of online resources.Be a part of this initiative.</p>
            <a href="#" class ='btn btn-default '>Learn More</a>
          </div>
        <!-- Contribute -->


        </div>
      </div>
    </div>
  </div>

 

<?php get_template_part('global-templates/footer-sub'); ?>
<?php get_template_part('global-templates/footer-one'); ?>

<?php get_footer(); ?>
