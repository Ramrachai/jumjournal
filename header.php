<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$container = get_theme_mod( 'understrap_container_type' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <div class="site" id="page">



        <!-- nav bar start  -->
        <nav class="top-nav navbar navbar-expand-lg navbar-dark ">

            <div class="container">

                <!-- Brand and toggle button -->
                <a class="navbar-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <?php get_template_part('components/logo'); ?> </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#userMenu"
                    aria-controls="userMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- End -->

                <!-- Your website Links -->
                <div class="collapse navbar-collapse" id="userMenu">
                    <div class="jum-search ">
                        <?php get_search_form(); ?>
                    </div>

                    <?php
             wp_nav_menu( array(
             'menu'              => 'primary',
             'theme_location'    => is_user_logged_in()? 'user-menu-loggedin' : 'user-menu-loggedout',
             'depth'             => 2,
             'container'         => 'div',
             'container_class'   => '',
             'container_id'      => '',
             'menu_class'        => 'navbar-nav mr-auto',
             'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
             'walker'          => new understrap_WP_Bootstrap_Navwalker()
             ));
        ?>



                </div>
                <!-- End -->
            </div> <!-- end container -->
        </nav>
        <!-- nav bar finish -->