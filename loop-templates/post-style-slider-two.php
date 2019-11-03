                <div class="post-item">

                    <div class="post-content">
                        <h2 class="post-title">
                            <a class="article-popup" href="<?php the_permalink(); ?>"
                                title="<?php the_title_attribute(); ?>">
                                <?php the_title(); ?>
                            </a>
                        </h2>
                        <!-- import post - meta  -->
                        <?php get_template_part('loop-templates/post-meta'); ?>

                        <div class="post-excerpt">
                            <?php the_excerpt(); ?>
                        </div>
                    </div>

                    <div class="post-image">
                        <?php if ( ! has_post_thumbnail() ) { ?>
                        <img src="<?php echo get_template_directory_uri(); ?>/images/post-images/image-size-slider.jpg"
                            alt="post image">
                        <?php } else {
                      echo get_the_post_thumbnail( $post->ID, 'large' ); 
                    } ?>
                    </div>

                </div>