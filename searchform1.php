<?php
/**
 * The template for displaying search forms
 *
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>
</button>
<form method="get" id="searchform" class="site-searchform " action="<?php echo esc_url( home_url( '/' ) ); ?>" role="search">
	<label class="sr-only" for="s"><?php esc_html_e( 'Search', 'understrap' ); ?></label>
	<div class="input-group form-group">
<select name="" id="" class='search-filter'>
<option>All</option>
    <option>Bangla Blog</option>
    <option>English Blog</option>
    <option>Music</option>
    <option>Video</option>
    <option>Pictures</option>
</select>
		<input class="field form-control" id="s" name="s" type="text"
			placeholder="<?php esc_attr_e( 'Type here &hellip;', 'understrap' ); ?>" value="<?php the_search_query(); ?>" required >
		<button type="submit" class='btn btn-success search-btn'><i class ='fa fa-search'></i></button>
		<!-- <input class="submit" id="searchsubmit" name="submit" type="submit" value="<?php //esc_attr_e( 'Search', 'understrap' ); ?>"> -->
	</div>
</form>
