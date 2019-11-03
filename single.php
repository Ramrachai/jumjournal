<?php
/**
 * The template for displaying all single posts.
 *
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<?php if ( ! has_post_format() ): ?>
<!-- post featured image via bg-image -->
<div class="post-feature-image"
    style="background-image: url(<?php echo get_the_post_thumbnail_url(get_the_ID(),'full'); ?>);"></div>
<?php endif; ?>

<div class="site-post main-content">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class='col-md-2'>

            </div>
            <div class="col-12 <?php if ( ! has_post_format() ): echo 'col-md-8'; else: echo 'col-md-10'; endif; ?>">
                <div class="post-content-main <?php if ( ! has_post_format() ): echo 'article-margin'; endif; ?> ">

                    <!--loop start-->
                    <?php while ( have_posts() ) : the_post(); ?>

                    <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

                        <!-- check if standard post -->
                        <?php if ( ! has_post_format() ): // standard posts: articles ?>

                        <header class="entry-header">
                            <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

                            <div class="post-meta">
                                <span class="post-author" title="Post author">
                                    By <a href=" <?php echo get_author_posts_url(get_the_author_meta('ID'));?> ">
                                        <?php the_author();  ;?>
                                    </a>
                                </span>

                                <span class="post-time" title='Published Date'>
                                    <i class="fa fa-calendar" aria-hidden="true"></i> &nbsp;
                                    <?php echo get_the_date( 'j F, Y' ); ?>
                                </span>
                                <span class="view-counter" title='Post Viewed'>
                                    <?php setPostViews(get_the_ID()); ?>
                                    <i class="fas fa-eye"></i> <?php echo getPostViews(get_the_ID());?>
                                </span>
                                <span title='Comments'>
                                    <i class="fas fa-comment"></i> <?php echo get_comments_number()?>
                                </span>
                            </div>

                        </header>

                        <div class="entry-content">
                            <?php the_post_thumbnail(); ?>
                            <p class="caption"> <?php the_post_thumbnail_caption(); ?> </p>
                            <div class='post-description'> <?php the_content(); ?> </div>
                            <hr />
                            <div class='post-category'><span>Post Category: </span> <?php the_category();?> </div>
                            <div class='post-tag'><?php the_tags();?> </div>
                        </div>

                        <?php endif; //end ofstandard posts: articles ?>


                        <!-- check if book, photo, audio or video -->
                        <?php if( get_post_format() ) { get_template_part('loop-templates/post-formats'); } ?>

                    </article><!-- #post-## -->

                    <?php understrap_article_nav(); ?>

                    <?php endwhile; // end of the loop. ?>
                    <!-- end-->

                </div>
                <!--.page-content-main-->

            </div>
            <!--.col-->
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
        <div class=" related-post">
            <div class="container">
                <div class="feature-text">
                    <h2>Related posts</h2>
                </div>

                <div class="row">
                    <?php jumjournal_cats_related_post(); ?>
                </div>
            </div>

        </div>


        <?php
			// If comments are open or we have at least one comment, load up the comment template.
			if ( ( comments_open() || get_comments_number() ) && ! has_post_format() ) : ?>
        <div class="row justify-content-center">
            <div class="col-md-9 padding">
                <div class="comment-box">

                    <?php comments_template(); ?>

                </div>
            </div>
        </div>
        <?php endif; ?>

    </div>
</div>
<!--.page .main-content-->


<?php get_template_part('global-templates/footer-one'); ?>

<?php get_footer(); ?>