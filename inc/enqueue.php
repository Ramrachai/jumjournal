<?php
/**
 * understrap enqueue scripts
 *
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( 'understrap_scripts' ) ) {
	/**
	 * Load theme's JavaScript and CSS sources.
	 */
	function understrap_scripts() {
		// Get the theme data.
		$the_theme     = wp_get_theme();
		$theme_version = $the_theme->get( 'Version' );

		$css_version = $theme_version . '.' . filemtime( get_template_directory() . '/css/theme.min.css' );
		wp_enqueue_style( 'understrap-libs', get_stylesheet_directory_uri() . '/css/libs.min.css', array(), $css_version );
		wp_enqueue_style( 'understrap-styles', get_stylesheet_directory_uri() . '/css/theme.min.css', array(), $css_version );
		
		wp_enqueue_style( 'understrap-owlCarousel', get_stylesheet_directory_uri() . '/css/owl.carousel.min.css', array(), $css_version );
		wp_enqueue_style( 'understrap-owlCarouselDefault', get_stylesheet_directory_uri() . '/css/owl.theme.default.min.css', array(), $css_version );
		

		wp_enqueue_script( 'jquery' );
		// wp_enqueue_script( 'owl-carousel', get_template_directory_uri() . 'js/owl.carousel.min.js', array( 'jquery' ), '', true );
		$js_version = $theme_version . '.' . filemtime( get_template_directory() . '/js/theme.min.js' );
		wp_enqueue_script( 'understrap-scripts', get_template_directory_uri() . '/js/theme.min.js', array(), $js_version, true );
		wp_enqueue_script('particles', get_template_directory_uri().'/src/js/particles.js', array(), " ", true ) ;
		wp_enqueue_script('particlesInit', get_template_directory_uri().'/src/js/particlesInit.js', array(), " ", true ) ;
		wp_enqueue_script('app', get_template_directory_uri().'/src/js/scrollmagic/featuresAnimation.js', array(), " ", true ) ;
	}
} // endif function_exists( 'understrap_scripts' ).

add_action( 'wp_enqueue_scripts', 'understrap_scripts' );
