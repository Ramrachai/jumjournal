<?php
/**
 *
 * This template part as footer style one
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$container = get_theme_mod( 'understrap_container_type' );
?>
<!-- footer -->
  <div class="footer type-one">
    <div class="<?php echo esc_attr( $container ); ?>">
      <div class="row">
        
          <?php if ( is_active_sidebar( 'footerfull' ) ) : ?>
            <?php dynamic_sidebar( 'footerfull' ); ?>
          <?php endif; ?>
        
      </div> <!-- row finish -->
    </div> <!-- container finish -->
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
        <div class="content-inner center copyright">
            <p>&copy; Copyright | 2017-<?php echo get_the_date('Y'); ?> Jumjournal | All right reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </div> <!-- footer type-one finish -->
  <!--.footer-->

  <div id="support-center" class="support-center">
    <i class="fas fa-medkit"></i>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>support-center">
      Support <br> center
    </a>
  </div>