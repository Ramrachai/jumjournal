<?php
/**
 * Template Name: submit
 *
 *
 * This template will be used as homepage
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

  <div class="page-header type-two">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="content-inner">
            <h1 class="heading">
              Fill out the form below according the content you are going to submit.
            </h1>
            <h3 class="moto">Read more about <a href="" target="_blank">article</a>, <a href="" target="_blank">book</a>, <a href="" target="_blank">photo</a>, <a href="" target="_blank">audio</a>, <a href="" target="_blank">video</a> file submition</h3>
          </div>
        </div>
        <div class="col-md-3">
          <div class="box">
            <img src="images/submit-article-box.png" alt="box" class="img-responsive">
          </div>
        </div>
        <div id="fav" class="fav">
          <i class="fas fa-angle-down"></i>
        </div>

      </div>
    </div>
  </div><!--.page-header-->

  <div class="page main-content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="page-content-main">
            <p class="heading style-one">
              Example: if you want to submit an article please fill article submit form
            </p>
            <div class="submit-content">

              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="article-tab" data-toggle="tab" href="#article" role="tab" aria-controls="article" aria-selected="true"><i class="fas fa-file-alt"></i> Article</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="ebook-tab" data-toggle="tab" href="#ebook" role="tab" aria-controls="ebook" aria-selected="false"><i class="fas fa-book"></i> eBook</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="photo-tab" data-toggle="tab" href="#photo" role="tab" aria-controls="photo" aria-selected="false"><i class="fas fa-camera-retro"></i> Photo</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="audio-tab" data-toggle="tab" href="#audio" role="tab" aria-controls="audio" aria-selected="false"><i class="fas fa-headphones-alt"></i> Audio</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="video-tab" data-toggle="tab" href="#video" role="tab" aria-controls="video" aria-selected="false"><i class="fas fa-video"></i> Video</a>
                </li>
              </ul><!--tab-links-->
  
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="article" role="tabpanel" aria-labelledby="article-tab">
                  
                  <div class="submit-form-con">
                    <div  class="form-content">
                      <!-- <p class="heading style-one">
                        You are login in as <a href="">Manasvi prasad Chakma</a>
                      </p> -->
                      <form action="">
                        <div id="submit-form-icon" class="form-field full icon-right">
                          <input type="text" placeholder="Article title">
                          <div class="info-icon">
                            <i class="fas fa-info-circle"></i>
                          </div>
                          <div class="info-content">
                            Get an attractive title for your content. <br> <a href="">Learn more</a>
                          </div>
                        </div>
                        <div class="form-field full">
                          <textarea name="message" rows="5" cols="30" placeholder="Type or paste full article content here..."></textarea>
                          <div class="info-icon">
                            <i class="fas fa-info-circle"></i>
                          </div>
                          <div class="info-content">
                            Check and recheck for misspelling. <br> <a href="">Learn more</a>
                          </div>
                        </div>
                        <div class="form-field full">
                          <input type="file" name="pic" accept="image/*">
                          <div class="info-icon">
                            <i class="fas fa-info-circle"></i>
                          </div>
                          <div class="info-content">
                            Article related photos <br> <a href="">Learn more</a>
                          </div>
                        </div>
    
                        <p class="heading style-one">
                          Or, add Google drive <span>folder link</span>
                        </p>

                        <div class="form-field full with-icon">
                          <div class="feild-icon">
                            <i class="fab fa-google-drive"></i>
                          </div>
                          <div class="field">
                            <input type="text" placeholder="Google drive folder link here...">
                            <div class="info-icon">
                                <i class="fas fa-info-circle"></i>
                              </div>
                              <div class="info-content">
                                How to get Google drive link? <br> <a href="">Learn more</a>
                              </div>
                          </div>
                          
                        </div>
    
                        <div class="form-field">
                          <button class="submit-data" type="submit">
                              <i class="fas fa-cloud-upload-alt"></i> 
                            Submit</button>
                        </div>
    
                      </form>
                    </div><!--.form-content-->
                  </div>
                
                </div><!--article-->
  
                <div class="tab-pane fade" id="ebook" role="tabpanel" aria-labelledby="ebook-tab">
                  
                  <div class="submit-form-con">
                    <div  class="form-content">
                      <form action="">
                        
                        <div class="form-field full with-icon">
                          <div class="feild-icon">
                            <i class="fab fa-google-drive"></i>
                          </div>
                          <div class="field">
                            <input type="text" placeholder="Google drive folder link here...">
                            <div class="info-icon">
                                <i class="fas fa-info-circle"></i>
                              </div>
                              <div class="info-content">
                                How to get Google drive link? <br> <a href="">Learn more</a>
                              </div>
                          </div>
                          
                        </div>
    
                        <div class="form-field">
                          <button class="submit-data" type="submit">
                              <i class="fas fa-cloud-upload-alt"></i> 
                            Submit</button>
                        </div>
    
                      </form>
                    </div><!--.form-content-->
                  </div>
                
                </div><!--ebook-->
  
                <div class="tab-pane fade" id="photo" role="tabpanel" aria-labelledby="photo-tab">

                  <div class="submit-form-con">
                    <div  class="form-content">
                      <form action="">
                        
                        <div class="form-field full with-icon">
                          <div class="feild-icon">
                            <i class="fab fa-google-drive"></i>
                          </div>
                          <div class="field">
                            <input type="text" placeholder="Google drive folder link here...">
                            <div class="info-icon">
                                <i class="fas fa-info-circle"></i>
                              </div>
                              <div class="info-content">
                                How to get Google drive link? <br> <a href="">Learn more</a>
                              </div>
                          </div>
                          
                        </div>
    
                        <div class="form-field">
                          <button class="submit-data" type="submit">
                              <i class="fas fa-cloud-upload-alt"></i> 
                            Submit</button>
                        </div>
    
                      </form>
                    </div><!--.form-content-->
                  </div>

                </div><!--photo-->
  
                <div class="tab-pane fade" id="audio" role="tabpanel" aria-labelledby="audio-tab">

                  <div class="submit-form-con">
                    <div  class="form-content">
                      <form action="">
                        
                        <div class="form-field full with-icon">
                          <div class="feild-icon">
                            <i class="fab fa-google-drive"></i>
                          </div>
                          <div class="field">
                            <input type="text" placeholder="Google drive folder link here...">
                            <div class="info-icon">
                                <i class="fas fa-info-circle"></i>
                              </div>
                              <div class="info-content">
                                How to get Google drive link? <br> <a href="">Learn more</a>
                              </div>
                          </div>
                          
                        </div>
    
                        <div class="form-field">
                          <button class="submit-data" type="submit">
                              <i class="fas fa-cloud-upload-alt"></i> 
                            Submit</button>
                        </div>
    
                      </form>
                    </div><!--.form-content-->
                  </div>

                </div><!--audio-->
  
                <div class="tab-pane fade" id="video" role="tabpanel" aria-labelledby="video-tab">

                  <div class="submit-form-con">
                    <div  class="form-content">
                      <form action="">
                        
                        <div class="form-field full with-icon">
                          <div class="feild-icon">
                            <i class="fab fa-google-drive"></i>
                          </div>
                          <div class="field">
                            <input type="text" placeholder="Google drive folder link here...">
                            <div class="info-icon">
                                <i class="fas fa-info-circle"></i>
                              </div>
                              <div class="info-content">
                                How to get Google drive link? <br> <a href="">Learn more</a>
                              </div>
                          </div>
                          
                        </div>
    
                        <div class="form-field">
                          <button class="submit-data" type="submit">
                              <i class="fas fa-cloud-upload-alt"></i> 
                            Submit</button>
                        </div>
    
                      </form>
                    </div><!--.form-content-->
                  </div>

                </div><!--video-->
  
              </div><!--tab-content-->

            </div><!--.submit-content-->

          </div><!--.page-content-main-->
        </div>

      </div>
    </div>
  </div><!--.page .main-content-->

  <?php get_template_part('global-templates/footer-sub'); ?>
<?php get_template_part('global-templates/footer-one'); ?>

<?php get_footer(); ?>