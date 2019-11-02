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

// Retrieve the currently-queried object.
$category = get_queried_object();
?>

<div class="category-banner"
    style="background-image: url(<?php echo get_template_directory_uri(); ?>/images/cat-bg.webp);">
    <div class="<?php echo esc_attr( $container ); ?>">
        <div class="row">
            <div class="col-md-12">
                <h1 class="category-name">
                    <?php echo $category->name; ?>
                </h1>

                <?php
					if ( $category->description ) { 
				?>
                <p class="category-description">
                    <?php echo $category->description; ?>
                </p>
                <?php
					};

					if ( $category->category_count > 1 ) { 
				?>
                <p class="total-posts">
                    <?php echo $category->category_count; ?> posts in this category
                </p>
                <?php
					};
				?>

            </div>
        </div>
    </div>
</div>

<div class="wrapper" id="archive-wrapper">

    <div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

        <div class="row">

<<<<<<< HEAD
            <div class="col-2"></div>
            <div class="col-12 col-md-8">
=======
            <div class="col-md-2"></div>
            <div class="col-md-8 col-12">
>>>>>>> 13f779ba34669f165648c151428efb4f70c7455f
                <main class="site-main post-style-one" id="main">

                    <div class="row">

                        <?php if ( have_posts() ) : ?>

                        <?php /* Start the Loop */ ?>
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

                </main><!-- #main -->

                <!-- The pagination component -->
                <?php understrap_pagination(); ?>


            </div> <!-- .row -->

            <div class='col-md-2 ' style='padding: 0 8px 0 8px ;'>
                <ul class='category-list'>
                    <?php wp_list_categories(); ?>
                </ul>

                <p class='tag-list-title'>Tags</p>
                <ul class='tag-list'>
                    <?php
                    $tags = get_tags();
                    if ( $tags ) :
                        foreach ( $tags as $tag ) : ?>
                    <li> <a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>"
                            title="<?php echo esc_attr( $tag->name ); ?>"><?php echo esc_html( $tag->name ); ?></a>
                    </li>
                    <?php endforeach; ?>
                    <?php endif; ?>
                </ul>

            </div>
        </div>


    </div><!-- #content -->


</div>

</div><!-- #archive-wrapper -->

<?php get_template_part('global-templates/footer-one'); ?>
<<<<<<< HEAD
=======

>>>>>>> 13f779ba34669f165648c151428efb4f70c7455f
<?php get_footer(); ?>