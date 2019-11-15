<button class="navbar-toggler hide-on-pc" type="button" data-toggle="collapse" data-target="#primaryNav"
    aria-controls="primaryNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="fa fa-bars"></span>
</button>

<!-- primary menu bar start  -->
<nav class='navbar navbar-expand-lg  navbar-light primary-nav gradient-bg'>
    <!-- toggler button -->


    <!-- primaryNav links   -->
    <div class='collapse navbar-collapse justify-content-center' id='primaryNav'>
        <?php
                wp_nav_menu( array(
                'menu'              => 'primary menu',
                'theme_location'    => 'primary-menu',
                'depth'             => 2,
                'container'         => 'div',
                'container_class'   => '',
                'container_id'      => '',
                'menu_class'        => 'navbar-nav mr-auto',
                'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
                'walker'          => new understrap_WP_Bootstrap_Navwalker()
                ));
                ?>
    </div>
</nav>
<!-- primary nav bar finish  -->