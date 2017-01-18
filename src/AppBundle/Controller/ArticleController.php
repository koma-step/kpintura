<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Article;
use AppBundle\Entity\Media;
use AppBundle\Form\Article as ArticleForm;
use AppBundle\Services\FileUploader;

class ArticleController extends Controller {

    /**
     * @Route("/admin/article/add", name="article_add")
     * @Route("/admin/article/edit/{id}", name="article_edit")
     * @param Request $request
     * @return Response
     */
    public function editAction(Request $request, $id = 0) {
        $em = $this->getDoctrine()->getManager();
        $article = new Article();

        if($id > 0) {
            $article = $em->getRepository('AppBundle:Article')->find($id);
        }

        $form = $this->createForm(ArticleForm::class, $article);
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
            $article->setOwner($user->getId());

            $em->persist($article);
            $em->flush();
            $file = $article->getFile();
            $ext = $file->guessExtension();

            $media = new Media();
            $media->setExt($ext);
            $media->setArticle($article);
            $media->setFile($file);
            $em->persist($media);
            $em->flush();
            
            $this->get('app.file_uploader')->uploadMedia($media, true);
            if(strpos($media->getFile()->getMimeType(), 'image/') !== false) {
                $this->get('app.media.image')->treatTempImage($media);
            }

            $article = new Article();
        }

        return $this->render('admin/article/edit.html.twig', [
            'base_dir'      => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
            'form'          => $form->createView(),
            'article'       => $article
        ]);
    }

    /**
     * @Route("/admin/article/rmall")
     * @return Response
     */
    public function rmAll() {
        $fs = new Filesystem();
        $em = $this->getDoctrine()->getManager();

        $medias = $em->getRepository('AppBundle:Media')->findAll();
        foreach($medias as $m) {
            $em->remove($m);
        }

        $art = $em->getRepository('AppBundle:Article')->findAll();
        foreach($art as $a) {
            $em->remove($a);
            $fs->remove($this->getParameter('upload_directory').'/'.$a->getOwner().'/'.$a->getId());
        }

//        $users = $em->getRepository('AppBundle:User')->findAll();
//        foreach($users as $u) {
//            rmdir($this->getParameter('upload_directory').'/'.$u->getId());
//        }

        $em->flush();

        return new Response('rm all done');
    }
}