<?php
/**
 * The template for displaying the author pages.
 *
 * Learn more: https://codex.wordpress.org/Author_Templates
 *
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="container author-wrapper">
    <div class="row">
        <div class="col-12 col-md-3">
            <header class="author-header">
                <?php
            if ( isset( $_GET['author_name'] ) ) {
            $curauth = get_user_by( 'slug', $author_name );
            } else {
            $curauth = get_userdata( intval( $author ) );
            }
            ?>
                <div class='pic-name'>
                    <!-- show avatar  -->
                    <span class='author-avatar'>
                        <?php if ( ! empty( $curauth->ID ) ) : ?>
                        <?php echo get_avatar( $curauth->ID ); ?>
                        <?php endif; ?>
                    </span>

                    <div class='author-meta'>
                        <!-- show nick name -->
                        <span class='nickname'>
                            <b>Name: </b> <?php echo esc_html( $curauth->nickname ); ?>
                        </span>
                        <!-- show full name -->
                        <span class='fullname'>
                            <?php if ( ! empty( $curauth->first_name ) & ! empty($curauth->last_name ) ) : ?>
                            <b>Full name: </b>
                            <?php echo esc_html( $curauth->first_name. " " . $curauth->last_name ); ?>
                            <?php endif; ?>
                        </span>
                        <span> <b> Role: </b>
                            <?php ; 
                        $user = wp_get_current_user();
                        $roles = ( array ) $user->roles;
                        echo $roles[0];
                        ?>
                        </span>
                        <span><b>Posts: </b> <?php echo count_user_posts($curauth->ID); ?> </span>

                        <?php if ( ! empty( $curauth->user_url ) || ! empty( $curauth->user_description ) ) : ?>
                        <div class='author-description'>
                            <?php if ( ! empty( $curauth->user_description ) ) : ?>
                            <p>
                                <b> <?php esc_html_e( 'About author:', 'understrap' ); ?> </b>
                                <?php esc_html_e( $curauth->user_description ); ?>
                            </p>
                            <?php endif; ?>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
            </header><!-- .page-header -->

        </div> <!-- col-md-3 finish -->
        <div class="col-12 col-md-7">
            <main class="site-main post-style-one" id="main">

                <p class='gradient-text'> <b> <?php echo $curauth->nickname;  ?> </b> has published <b>
                        <?php echo count_user_posts($curauth->ID); ?> </b> posts
                </p>
                <div class="row">

                    <?php 
                    $args = array(
                        // Arguments for your query.
                        'posts_per_page' => '12',
                        'order' => 'DESC',
                        'orderby' => 'date',
                        'ignore_sticky_posts' => true,
                        'post_type' => 'post',
                        'post_status' => 'publish'
                    );

                    // Custom query.
                    $query = new WP_Query( $args );
                ?>
                    <?php if ( $query->have_posts() ) : ?>

                    <?php /* Start the Loop */ ?>
                    <?php while ( $query->have_posts() ) : $query->the_post(); ?>

                    <?php

/*
* Include the Post-Format-specific template for the content.
* If you want to override this in a child theme, then include a file
* called content-___.php (where ___ is the Post Format name) and that will be used instead.
*/
get_template_part( 'loop-templates/content', get_post_format() );
?>

                    <?php endwhile; ?>

                    <?php else : ?>

                    <?php get_template_part( 'loop-templates/content', 'none' ); ?>

                    <?php endif; ?>
                    <!-- // Restore original post data. -->
                    <?php	wp_reset_postdata(); ?>
                </div>

            </main><!-- #main -->

            <!-- The pagination component -->

            <?php understrap_pagination(); ?>
        </div> <!-- col-md-7 finish -->
        <div class="col-12 col-md-2">

        </div> <!-- col-md-2 finish -->
    </div> <!-- row finish -->
</div> <!-- container finish -->





<?php get_template_part('global-templates/footer-one'); ?>

<?php get_footer(); ?>