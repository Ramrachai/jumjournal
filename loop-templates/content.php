<?php
/**
 * Post rendering content according to caller of get_template_part.
 *
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>

<?php $post_bg = get_the_post_thumbnail_url($post->ID, 'medium') ; ?>

<div class="col-6 col-md-4" id="post-<?php the_ID(); ?>">
    <div class="post-single">
        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
            <div class="post-image" style="background: url('<?php echo $post_bg;  ?>')"></div>
        </a>
        <div class="post-content">
            <h2 class="post-title">
                <a class="article-popup" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                    <?php the_title(); ?>
                </a>
            </h2>
            <?php get_template_part('loop-templates/post-meta'); ?>
        </div>
    </div>
</div>