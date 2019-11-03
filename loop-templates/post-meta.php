<div class="post-meta">
    <span title='Published Date'>
        <i class="fa fa-calendar" aria-hidden="true"></i> &nbsp;
        <?php echo get_the_date( 'j M, Y' ); ?>
    </span>

    <!-- <a href="<?php //echo get_author_posts_url(get_the_author_meta('ID'));?>" class='author'>
        <i class="fas fa-user"></i>
        &nbsp;
        <?php //the_author(); ?>
    </a> -->

    <span title='Comments'>
        <i class="fas fa-comment"></i> <?php echo get_comments_number()?>
    </span>
    <span class="view-counter" title='Post Viewed'>
        <?php setPostViews(get_the_ID()); ?>
        <i class="fas fa-eye"></i> <?php echo getPostViews(get_the_ID());?>
    </span>
    <!-- <span class='tag'> <?php //understrap_post_tags(); ?> </span> -->

</div> <!-- post meta finish -->