<?php 

//Changing The Excerpt Length For All Loops
add_filter( 'excerpt_length', function($length) {
    return 5;
} );

?>