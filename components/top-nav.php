        <!-- top or user nav bar start  -->
        <nav class=" navbar navbar-expand-lg navbar-dark top-nav">

            <div class="container">

                <!-- Brand and toggle button -->
                <a class="navbar-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <?php get_template_part('components/logo'); ?> </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#userMenu"
                    aria-controls="userMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <!-- <span class="navbar-toggler-icon"></span> -->
                    <i class="fas fa-ellipsis-h"></i>
                </button>
                <!-- End -->

                <!-- Your website Links -->
                <div class="collapse navbar-collapse" id="userMenu">
                    <div class="jum-search ">
                        <?php get_search_form(); ?>
                    </div>

                    <?php
             wp_nav_menu( array(
             'menu'              => 'user menu',
             'theme_location'    => is_user_logged_in()? 'user-menu-loggedin' : 'user-menu-loggedout',
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
                <!-- End -->
            </div> <!-- end container -->
        </nav>
        <!-- top or user nav bar finish -->