<?php

namespace AppBundle\Service;

use AppBundle\Entity\Media;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Session\Session;

class FileUploader
{
    private $targetDir;
    /**
     * @var Container
     */
    private $container;

    public function __construct($container, $targetDir) {
        $this->container = $container;
        $this->targetDir = $targetDir;
    }

    /**
     * @param Media $media
     * @param bool $is_temp
     * @return null|string
     */
    public function uploadMedia(Media $media, bool $is_temp = false) {
        $user = $this->container->get('security.token_storage')->getToken()->getUser();
        $file = $media->getFile();
        $fileName = null;
        if(!empty($media->getId()) && !empty($file->guessExtension())) {
            $fileName = $media->getId() . '.' . $file->guessExtension();
            $targetDir = $this->targetDir.'/'.$user->getId().'/medias/'.$media->getArticle()->getId();
            $targetDir .= $is_temp ? '/tmp' : '';
            $file->move($targetDir, $fileName);
            $file = new File($targetDir.'/'.$fileName);
            $media->setFile($file);
        }

        return $this;
    }
}