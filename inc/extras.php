<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_filter( 'body_class', 'understrap_body_classes' );

if ( ! function_exists( 'understrap_body_classes' ) ) {
	/**
	 * Adds custom classes to the array of body classes.
	 *
	 * @param array $classes Classes for the body element.
	 *
	 * @return array
	 */
	function understrap_body_classes( $classes ) {
		// Adds a class of group-blog to blogs with more than 1 published author.
		if ( is_multi_author() ) {
			$classes[] = 'group-blog';
		}
		// Adds a class of hfeed to non-singular pages.
		if ( ! is_singular() ) {
			$classes[] = 'hfeed';
		}

		return $classes;
	}
}

// Removes tag class from the body_class array to avoid Bootstrap markup styling issues.
add_filter( 'body_class', 'understrap_adjust_body_class' );

if ( ! function_exists( 'understrap_adjust_body_class' ) ) {
	/**
	 * Setup body classes.
	 *
	 * @param string $classes CSS classes.
	 *
	 * @return mixed
	 */
	function understrap_adjust_body_class( $classes ) {

		foreach ( $classes as $key => $value ) {
			if ( 'tag' == $value ) {
				unset( $classes[ $key ] );
			}
		}

		return $classes;

	}
}

// Filter custom logo with correct classes.
add_filter( 'get_custom_logo', 'understrap_change_logo_class' );

if ( ! function_exists( 'understrap_change_logo_class' ) ) {
	/**
	 * Replaces logo CSS class.
	 *
	 * @param string $html Markup.
	 *
	 * @return mixed
	 */
	function understrap_change_logo_class( $html ) {

		$html = str_replace( 'class="custom-logo"', 'class="img-fluid"', $html );
		$html = str_replace( 'class="custom-logo-link"', 'class="navbar-brand custom-logo-link"', $html );
		$html = str_replace( 'alt=""', 'title="Home" alt="logo"', $html );

		return $html;
	}
}

/**
 * Display navigation to next/previous post when applicable.
 */

if ( ! function_exists ( 'understrap_post_nav' ) ) {
	function understrap_post_nav() {
		// Don't print empty markup if there's nowhere to navigate.
		$previous = ( is_attachment() ) ? get_post( get_post()->post_parent ) : get_adjacent_post( false, '', true );
		$next     = get_adjacent_post( false, '', false );

		if ( ! $next && ! $previous ) {
			return;
		}
		?>
<nav class="container navigation post-navigation">
    <h2 class="sr-only"><?php esc_html_e( 'Post navigation', 'understrap' ); ?></h2>
    <div class="row nav-links justify-content-between">
        <?php
				if ( get_previous_post_link() ) {
					previous_post_link( '<span class="nav-previous">%link</span>', _x( '<i class="fa fa-angle-left"></i>&nbsp;%title', 'Previous post link', 'understrap' ) );
				}
				if ( get_next_post_link() ) {
					next_post_link( '<span class="nav-next">%link</span>', _x( '%title&nbsp;<i class="fa fa-angle-right"></i>', 'Next post link', 'understrap' ) );
				}
				?>
    </div><!-- .nav-links -->
</nav><!-- .navigation -->
<?php
	}
}

/**
 * Custom style to display next previous posts
 */

if ( ! function_exists ( 'understrap_article_nav' ) ) {
	function understrap_article_nav() {
		// Don't print empty markup if there's nowhere to navigate.
		$previous = ( is_attachment() ) ? get_post( get_post()->post_parent ) : get_adjacent_post( false, '', true );
		$next     = get_adjacent_post( false, '', false );

		if ( ! $next && ! $previous ) {
			return;
		}
		?>
<?php
			if ( get_previous_post_link() ) {
				previous_post_link( '
					<div class="article-nav article-previous">
						<div class="arrow-icon">
							<i class="fas fa-chevron-circle-left"></i>
						</div>
						<div class="post-title">
							%link
						</div>
					</div>', 
					
					_x( '%title', 'Previous post link', 'understrap' ) );
			}
			if ( get_next_post_link() ) {

				next_post_link( '
					<div class="article-nav article-next">
						<div class="post-title">
							%link
						</div>
						<div class="arrow-icon">
							<i class="fas fa-chevron-circle-right"></i>
						</div>
					</div> ', 

					_x( '%title', 'Next post link', 'understrap' ) );
			
			}
			?>
<?php
	}
}

/**
 * Add a pingback url auto-discovery header for single posts of any post type.
 */
function understrap_pingback() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="' . esc_url( get_bloginfo( 'pingback_url' ) ) . '">' . "\n";
	}
}
add_action( 'wp_head', 'understrap_pingback' );

/**
 * Add mobile-web-app meta.
 */
function understrap_mobile_web_app_meta() {
	echo '<meta name="mobile-web-app-capable" content="yes">' . "\n";
	echo '<meta name="apple-mobile-web-app-capable" content="yes">' . "\n";
	echo '<meta name="apple-mobile-web-app-title" content="' . esc_attr( get_bloginfo( 'name' ) ) . ' - ' . esc_attr( get_bloginfo( 'description' ) ) . '">' . "\n";
}
add_action( 'wp_head', 'understrap_mobile_web_app_meta' );

/**
 * Enable menu description
 */
function prefix_nav_description( $item_output, $item, $depth, $args ) {
	if ( !empty( $item->description ) ) {
			$item_output = str_replace( $args->link_before . '</a>', '<i class="fas ' . $item->description . '"></i>' . $args->link_before . '</a>', $item_output );
	}

	return $item_output;
}
add_filter( 'walker_nav_menu_start_el', 'prefix_nav_description', 10, 4 );

/**
 * Display related posts by category 
 */
function jumjournal_related_posts() {
 
	$post_id = get_the_ID();
	$cat_ids = array();
	$categories = get_the_category( $post_id );

	if ( $categories && ! is_wp_error( $categories ) ) {
    foreach ( $categories as $category ) {
			array_push( $cat_ids, $category->term_id );
    }
	}

	$current_post_type = get_post_type( $post_id );
     
	$args = array(
		'category__in' 			=> $cat_ids,
		'category__not_in' 	=> '1', // exclude uncategorized posts
		'post_type' 				=> $current_post_type,
		'posts_per_page' 		=> '4',
		'post__not_in' 			=> array( $post_id ),
		'orderby' 					=> 'rand'
	);

	// Custom query.
	$query = new WP_Query( $args );
	
	// Check that we have query results.
	if ( $query->have_posts() ) { ?>

<div class="row justify-content-center">
    <div class="col-md-7 padding">

        <div class="related-post-con post-style-one">
            <div class="cat-tilte style-one color-eight no-link">
                Related articles
            </div>
            <div class="row">

                <?php
						// Start looping over the query results.
						while ( $query->have_posts() ) {

							$query->the_post();
							
							// Contents of the queried post results go here.
							get_template_part( 'loop-templates/post-style-one' );

						} 
					?>

            </div>
            <!--row-->
        </div>
        <!--.related-post-con-->

    </div>
</div>

<?php
	}
	// Restore original post data.
	wp_reset_postdata();
 
}

/**
 * Display related books by category 
 */
function jumjournal_related_books() {
 
	$post_id = get_the_ID();
	$cat_ids = array();
	$categories = get_the_category( $post_id );

	if ( $categories && ! is_wp_error( $categories ) ) {
    foreach ( $categories as $category ) {
			array_push( $cat_ids, $category->term_id );
    }
	}

	$current_post_type = get_post_type( $post_id );
     
	$args = array(
		'category__in' 			=> $cat_ids,
		'category__not_in' 	=> '1', // exclude uncategorized posts
		'post_type' 				=> $current_post_type,
		'posts_per_page' 		=> '6',
		'post__not_in' 			=> array( $post_id ),
		'orderby' 					=> 'rand'
	);

	// Custom query.
	$query = new WP_Query( $args );
	
	// Check that we have query results.
	if ( $query->have_posts() ) { ?>

<div class="row justify-content-center book-category similar-books">
    <div class="col-md-10">

        <div class="block-inner">
            <div class="header">
                <h1 class="category-type">Similar Books</h1>
            </div>
            <div class="body-content">
                <div class="book-section owl-carousel owl-theme">

                    <?php
							// Start looping over the query results.
							while ( $query->have_posts() ) {

								$query->the_post();
								
								// Contents of the queried post results go here.
								get_template_part( 'loop-templates/content', get_post_format() );

							} 
						?>

                </div>
            </div>
        </div>
        <!-- .book-inner -->

    </div>
</div>

<?php
	}
	// Restore original post data.
	wp_reset_postdata();
 
}

//Category based Related Post function 
function jumjournal_cats_related_post() {

    $post_id = get_the_ID();
    $cat_ids = array();
    $categories = get_the_category( $post_id );

    if(!empty($categories) && is_wp_error($categories)):
        foreach ($categories as $category):
            array_push($cat_ids, $category->term_id);
        endforeach;
    endif;

    $current_post_type = get_post_type($post_id);
    $query_args = array( 

        'category__in'   => $cat_ids,
        'post_type'      => $current_post_type,
        'post_not_in'    => array($post_id),
        'posts_per_page'  => '4'
     );

    $related_cats_post = new WP_Query( $query_args );

    if($related_cats_post->have_posts()):
         while($related_cats_post->have_posts()): $related_cats_post->the_post(); ?>
<?php get_template_part('loop-templates/related-post-english') ?>
<?php endwhile;

        // Restore original Post Data
        wp_reset_postdata();
     endif;
}



/**
 * Display tags from current post category
 */
if ( ! function_exists( 'understrap_post_tags' ) ) {
	function understrap_post_tags() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html__( ', ', 'understrap' ) );
			if ( $tags_list ) {
				/* translators: %s: Tags of current post */
				printf( '<span class="post-tags">' . esc_html__( '%s', 'understrap' ) . '</span>', $tags_list ); // WPCS: XSS OK.
			}
		}
	}
}



// english single post view counter
function getPostViews($postID){
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
        return "0";
    }
    return $count;
}
function setPostViews($postID) {
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        $count = 0;
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
    }else{
        $count++;
        update_post_meta($postID, $count_key, $count);
    }
}
// Remove issues with prefetching adding extra views
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);


// custom post loop excerpt 
function excerpt($limit) {
	$excerpt = explode(' ', get_the_excerpt(), $limit);
	if (count($excerpt)>=$limit) {
	  array_pop($excerpt);
	  $excerpt = implode(" ",$excerpt).'...';
	} else {
	  $excerpt = implode(" ",$excerpt);
	}	
	$excerpt = preg_replace('`[[^]]*]`','',$excerpt);
	return  "<p>". $excerpt. "</p>" ;
  }