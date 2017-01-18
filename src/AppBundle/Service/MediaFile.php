<?php

namespace AppBundle\Service;

use AppBundle\Entity\Media;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\HttpFoundation\File\File;

class MediaFile {
    private $targetDir;

    public function __construct($targetDir)
    {
        $this->targetDir = $targetDir;
    }
    
    public function find(Media $media, $type = "small") {
        $article = $media->getArticle();
        $targetDir = $this->targetDir.'/'.$article->getOwner().'/medias/'.$media->getArticle()->getId().'/'.$type;
        $file = new File($targetDir.'/'.$media->getFilename());
        return $file;
    }
}