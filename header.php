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
        <header class='navigation-header'>
            <div class='top-nav-container'>
                <?php get_template_part('components/top-nav');?>
            </div>

            <div class='primary-nav-container-pc hide-on-mobile'>
                <div class='fake-menubar gradient-bg'></div>
                <div id="primary-toggle-menu" class="collapse">
                    <?php get_template_part('components/primary-nav');?>
                </div>
                <button class="btn primary-menu-toggler" data-toggle="collapse" data-target="#primary-toggle-menu">
                    <i class='fa fa-bars'></i>
                    Menu
                </button>
            </div>

            <div class='primary-nav-container-mobile hide-on-pc '>
                <?php  get_template_part('components/primary-nav');?>
            </div>



        </header>
        <div class="empty-space-30"></div>