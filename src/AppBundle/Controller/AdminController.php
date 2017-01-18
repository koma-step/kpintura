<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends Controller {
    /**
     * @Route("/admin",
     *     name="admin",
     *     options={"expose" = true}
     * )
     */
    public function home(Request $request) {
        return $this->render('admin/home.html.twig');
    }
}