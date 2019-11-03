<?php
/**
 * The template for displaying archive pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();

$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="wrapper" id="archive-wrapper">

    <h1 class='tag-title feature-text'> Result for tag name: &nbsp; <span> <?php single_tag_title();?> </span> </h1>
    <div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

        <div class="row">

            <div class="col-md-2"></div>
            <div class="col-12 col-md-8 ">
                <main class="site-main" id="main">

                    <?php if ( have_posts() ) : ?>

<<<<<<< HEAD
                    <!-- <header class="page-header">
=======
                    <header class="page-header">
>>>>>>> 13f779ba34669f165648c151428efb4f70c7455f
                        <?php
		the_archive_title( '<h1 class="page-title">', '</h1>' );
		the_archive_description( '<div class="taxonomy-description">', '</div>' );
		?>
<<<<<<< HEAD
					</header> -->
					<!-- .page-header -->
=======
                    </header><!-- .page-header -->
>>>>>>> 13f779ba34669f165648c151428efb4f70c7455f

                    <div class="container">
                        <div class="row"> <?php /* Start the Loop */ ?>
                            <?php while ( have_posts() ) : the_post(); ?>

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
                        </div>
                    </div>

                </main><!-- #main -->

                <!-- The pagination component -->
                <?php understrap_pagination(); ?>
            </div>
            <div class="col-md-2"></div>




        </div> <!-- .row -->

    </div><!-- #content -->

</div><!-- #archive-wrapper -->

<?php get_template_part('global-templates/footer-one'); ?>
<?php get_footer(); ?>