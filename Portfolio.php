<!DOCTYPE html>
<html lang="en">
<head>
    <title>Michael Angelo's Portfolio</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <style>
        section{
        width: 100vw;
        height: 100vw;
        padding: 50px;
        }

        .cl_white {
            color: white;
        }

        img {
            width: 300px;
            transition: opacity 1s ease-in-out;
        }
        img:hover{
            opacity: .10;
        }

        .col-text{
            -webkit-column-count: 3;
        }
    </style>
    <script>

    $('a[href^="#contact"]').click(function(event) {
        var target = $(this.hash);
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000000);
        }
    });

</script>

<script>
    function validateForm() {
        let name = document.forms["myForm"]["name"].value;
        let email = document.forms["myForm"]["email"].value;
        if (name == "" || email == "") {
            alert("Please fill in your name and email address.");
            return false;
        }
    }
</script>

</head>

<body data-spy="scroll" data-target=".navbar">
    <nav class="navbar navbar-inverse navbar-fixed-bottom">
        <ul class="nav navbar-nav">
            <li><a href="#home">Home</a></li>
            <li><a href="#work">What I Do</a></li>
            <li><a href="#about">What about me</a></li>
            <li><a href="#contact">Contact Me</a></li>
        </ul>
    </nav>
    <section id="home" style="background: url(pic/bg2.jpg); background-size: 100% 100%;" class="cl_white text-center">
        <h1>My Portfolio</h1>
        <p class="lead">Welcome to my Portfolio!</p>
        <a href="#contact" class="btn btn-default">Contact Me</a>
    </section>

    <section id="work" class="container">
        <div class="page-header">
            <h1 class="text-center">My Work</h1>
        </div>
        <div class="text-center">
            <img src="pic/html.png">
            <img src="pic/css.png">
            <img src="pic/js.png">
            <img src="pic/php.png">
            <img src="pic/bootstrap.png">
            <img src="pic/java.png">
            <img src="pic/sql.png">
            <img src="pic/figma.png">
        </div>
    </section>
    
    <section id="about" class="container">
        <h2 class="text-center">My Skills</h2>
        <div class="col-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
             Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
             sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
             Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
             adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
             Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, 
             nisi ut aliquid ex ea commodi consequatur? 
             Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
            vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</div><br>

            <div class="row">
                <div class="col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h4>PHP Programmer</h4>
                        </div>
                        <div class="panel-body">
                            <img src="pic/php.png" class="img-circle center-block">
                            <p class="lead text-center">I Do PHP Programming</p>
                        </div>
                        <div class="panel-footer"></div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h4>UI Designer</h4>
                        </div>
                        <div class="panel-body">
                            <img src="pic/uiux.png" class="img-circle center-block">
                            <p class="lead text-center">I make UI/UX Designs</p>
                        </div>
                        <div class="panel-footer"></div>
                    </div>
                </div>

                
            </div>
    </section>

    <section id="contact" style="background: silver;">
        <div class="page-header">
            <h2 class="text-center">Contact Me</h2>
        </div>
        <form class="col-md-5 col-md-offset-4" method="post" action="process_form.php"> 
    <div class="form-group">
        <input class="form-control" placeholder="Enter Your Name" type="text" name="name" />
    </div>
    <div class="form-group">
        <input class="form-control" placeholder="Enter Your Email" type="email" name="email" />
    </div>
    <div class="form-group">
        <input class="form-control" placeholder="Subject" type="text" name="subject" />
    </div>
    <div class="form-group">
        <textarea class="form-control" rows="10" name="message"> Comments</textarea>
    </div>    
    <div class="form-group">
        <input class="btn btn-success btn-block" type="submit" value="Submit">
    </div>
</form>
    </section>
</body>
</html>