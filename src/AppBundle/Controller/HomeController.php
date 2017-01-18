<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Client\ClientArticle;

class HomeController extends Controller
{
    /**
     * @Route("/",
     *     name="homepage",
     *     options = {"expose" = true}
     * )
     */
    public function home() {
        $em = $this->getDoctrine()->getManager();
        $articles = $em->getRepository('AppBundle:Article')->findAll();
        $client_articles = new ClientArticle($articles);

        return $this->render('home/home.html.twig', [
            'articles' => $client_articles->getData()
        ]);
    }

    /**
     * @Route("/get_galerie",
     *     name="get_galerie",
     *     options = {"expose" = true}
     * )
     */
    public function getGalerie(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $articles = $em->getRepository('AppBundle:Article')->findAll();
        $client_articles = new ClientArticle($articles);

        return $this->json(array(
            'articles' => $client_articles->getData()
        ));
    }
}
