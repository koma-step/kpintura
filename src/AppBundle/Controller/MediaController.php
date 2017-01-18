<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class MediaController extends Controller
{
    /**
     * @Route("/media/{type}/{name}", name="media")
     * @param $name
     * @return BinaryFileResponse
     */
    public function mediaAction($type = "", $name = "") {
        if(!empty($name) && !empty($type)) {
            $em = $this->getDoctrine()->getManager();
            $data = explode('.', $name);
            $id_media = (int)$data[0];
            $ext = $data[1];
            $media = $em->getRepository('AppBundle:Media')->find($id_media);
            $file = $this->get('app.media.file')->find($media, $type);

            $response = new BinaryFileResponse($file);
            $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_INLINE);

            return $response;
        } else {
//            return $this->redirect()
        }
    }
}