          <div class="post-single">
              <div class="post-image">
                  <?php if ( ! has_post_thumbnail() ) { ?>
                  <img src="<?php echo get_template_directory_uri(); ?>/images/post-images/image-size-two.jpg"
                      alt="post image">
                  <?php } else {
								echo get_the_post_thumbnail( $post->ID, 'medium' ); 
							} ?>
              </div>
              <div class="post-content">
                  <h2 class="post-title">
                      <a class="article-popup" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                          <?php the_title(); ?>
                      </a>
                  </h2>
                  <!-- import post - meta  -->
                  <?php get_template_part('loop-templates/post-meta'); ?>

                  <div class="post-excerpt">
                      <?php echo excerpt(18) ; ?>
                      <br>
                      <a href="<?php the_permalink();?>" class='read-more'>Read more</a>
                  </div>
              </div>
              <a href="<?php the_permalink(); ?>" class="link-overlay" title="<?php the_title_attribute(); ?>"></a>
          </div>
          <!--.post-single-->