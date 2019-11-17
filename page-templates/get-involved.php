<?php
/**
 * Template Name: get-involved
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
<div class=" get-involve banner"></div>
<div class="page-header type-three">
    <div class="container-fluid">
        <div class="row justify-content-center get-involved-1stdiv">
            <div class="col-md-5">
                <div class="content-inner">
                    <h3 class="moto">Whether you’re <span>student</span>, <span>teacher</span>, <span>writter</span>,
                        <span>photographer</span>, <span>video editor</span>, <span>film maker</span>,
                        <span>designer</span>, <span>developer</span> or just like helping out, we’re always looking for
                        people to help make Jumjournal even better.</h3>
                    <p>If you want to get involved with Jumjournal, this is the place to be. We’ve got detail
                        instructions for each contributor group in the sections below.</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="box">
                    <img src="<?php bloginfo('template_url')?>/images/jumjournal-contributors.jpg"
                        alt="jumjournal-contributors" class="img-responsive">
                </div>
            </div>
            <div id="fav" class="fav">
                <a href="#target"><i class="fas fa-angle-down"></i></a>
            </div>

        </div>
    </div>
</div>
<!--.page-header-->

<!-- Modal -->
<div class="modal fade" id="notificationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                We are working on setting these instructions more specific so that people can get connect with
                Jumjournal Team easily.
                <br> <br>
                Until then, please follow <b>Support Center</b> or contact with us!
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="page main-content">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="page-content-main">
                    <p id="target" class="heading style-one">
                        There are many different ways to get involved with Jumjournal
                    </p>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="contribute-filed">
                                <div class="heading">
                                    <i class="fas fa-video-slash"></i>
                                    <h3>Video editor</h3>
                                </div>
                                <div class="text">
                                    Master in adobe premiere pro or expert in other video editing tools, or just
                                    beginner at video editing, still you can involve with Jumjournal.
                                    <a href="#" data-toggle="modal" data-target="#notificationModal">Get instructions
                                        about video editing <i class="far fa-arrow-alt-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contribute-filed">
                                <div class="heading">
                                    <i class="far fa-keyboard"></i>
                                    <h3>Typer</h3>
                                </div>
                                <div class="text">
                                    Good at typing or just eager to help Jumjournal Team by typing articles, you can
                                    involve with Jumjournal.
                                    <a href="#" data-toggle="modal" data-target="#notificationModal">Get instructions
                                        about typing <i class="far fa-arrow-alt-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contribute-filed">
                                <div class="heading">
                                    <i class="fas fa-book-reader"></i>
                                    <h3>Proof reading</h3>
                                </div>
                                <div class="text">
                                    Do you read articles at Jumjuournal regularly? Love to read specific category? Help
                                    by correcting wrong information or spelling mistakes.
                                    <a href="#" data-toggle="modal" data-target="#notificationModal">Get instructions
                                        about proof reading <i class="far fa-arrow-alt-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contribute-filed">
                                <div class="heading">
                                    <i class="fas fa-chalkboard-teacher"></i>
                                    <h3>Tutorial maker</h3>
                                </div>
                                <div class="text">
                                    Already made some tutorial to teach specific subjects? or interested to work with
                                    Jumjournal video tutorial making team, still you can involved with us.
                                    <a href="#" data-toggle="modal" data-target="#notificationModal">Get instructions
                                        about tutorial making <i class="far fa-arrow-alt-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contribute-filed">
                                <div class="heading">
                                    <i class="fas fa-camera"></i>
                                    <h3>Photographer</h3>
                                </div>
                                <div class="text">
                                    Taking great stories by profession or just by hobby, take your photos to Jumjournal
                                    and let people to explore.
                                    <a href="#" data-toggle="modal" data-target="#notificationModal">Get instructions
                                        about photography <i class="far fa-arrow-alt-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contribute-filed">
                                <div class="heading">
                                    <i class="fas fa-chart-pie"></i>
                                    <h3>Graphics designer</h3>
                                </div>
                                <div class="text">
                                    Love to play with illustrator or other tools, let people know amazing talent by
                                    creating interactive graphics to Jumjournal website.
                                    <a href="#" data-toggle="modal" data-target="#notificationModal">Get instructions
                                        about graphics design <i class="far fa-arrow-alt-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contribute-filed">
                                <div class="heading">
                                    <i class="fas fa-chart-line"></i>
                                    <h3>SEO</h3>
                                </div>
                                <div class="text">
                                    Help Jumjournal to take place over the internet in search results by a good and
                                    stable Search Engine Optimization(SEO).
                                    <a href="#" data-toggle="modal" data-target="#notificationModal">Get instructions
                                        about search engine optimization <i
                                            class="far fa-arrow-alt-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contribute-filed">
                                <div class="heading">
                                    <i class="fas fa-brain"></i>
                                    <h3>Writter</h3>
                                </div>
                                <div class="text">
                                    Writing on recent issues or on a specific topic, let people know the way you think
                                    and the ideas we should follow.
                                    <a href="#" data-toggle="modal" data-target="#notificationModal">Get instructions
                                        about search engine optimization <i
                                            class="far fa-arrow-alt-circle-right"></i></a>
                                </div>
                            </div>
                        </div>


                    </div>
                    <!--.row-->

                </div>
                <!--.page-content-main-->
            </div>

        </div>
    </div>
</div>
<!--.page .main-content-->

<?php get_template_part('global-templates/footer-sub'); ?>
<?php get_template_part('global-templates/footer-one'); ?>

<?php get_footer(); ?>