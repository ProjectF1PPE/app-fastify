<script src="ajoutClass.js"></script>


<header class="header-area overlay">
    <nav class="pc navbar navbar-expand-md navbar-dark">
        <a class="logo" href="index.html"><img src="../Ressource/logof1.png" width="75px"/></a>

        <div class="container">
            <div id="main-nav" class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    <li><a href="../pilote/pilote.php" id="ajtPilote"class="nav-item nav-link ">Pilotes</a></li>
                    <li class="dropdown ">
                        <a href="../ecurie/ecuries.php" id="ajtclassEcurie" class="nav-item nav-link" data-toggle="dropdown">Ecuries</a>
                    </li>
                    <li><a href="../gp/gp.php" id="ajtclassGp" class="nav-item nav-link">Grands Prix</a></li>
                    <li class="dropdown">
                        <a class="nav-item nav-link" id="ajtclassClassement" data-toggle="dropdown">Classement</a>
                        <div class="dropdown-menu">
                            <a href="../classement/classementEcurie.php" class="dropdown-item">Ecuries</a>
                            <a href="../classement/classementPilote.php" class="dropdown-item">Pilotes</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <a href="../pilote/pilote.php" class="admin"><i class="bi bi-person-lines-fill "></i></a>
    </nav>

    <nav class=" mobile navbar navbar-expand-lg navbar-light bg-light">
        <a class="logo" href="index.html"><img src="../Ressource/logof1.png" width="75px"/></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="../pilote/pilote.php">Pilotes<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../ecurie/ecuries.php">Ecuries</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../gp/gp.php">Grands Prix</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Classement
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="../classement/classementEcurie.php">Ecuries</a>
                        <a class="dropdown-item" href="../classement/classementPilote.php">Pilotes</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>

</header>