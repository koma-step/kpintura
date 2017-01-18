<?php

namespace AppBundle\Service;

use AppBundle\Entity\Media;
use Gregwar\Image\Image;
use Symfony\Component\DependencyInjection\Container;

class MediaImage {
    private $container;
    private $targetDir;

    public function __construct($container, $targetDir)
    {
        $this->container = $container;
        $this->targetDir = $targetDir;
    }

    public function resizeImage(Media $media, $size_type = 'small') {
        $article = $media->getArticle();
        $owner = $article->getOwner();
        $target_dir         = $this->targetDir.'/'.$owner.'/medias/'.$article->getId();
        $temp_file_path     = $target_dir.'/tmp/'.$media->getFilename();
        $target_file_path   = $target_dir.'/'.$size_type.'/'.$media->getFilename();
        if(is_file($temp_file_path)) {
            $size = getimagesize($temp_file_path);
            switch($size_type) {
                case 'big':     $w = 2560; break;
                case 'medium':  $w = 1280; break;
                case 'small':   $w = 640; break;
                default:        $w = 640;
            }
            $h = (int)($w*$size[1]/$size[0]);

            $image = Image::open($temp_file_path);
            $image->forceResize($w, $h)->save($target_file_path, 'jpeg', 66);
        }
    }

    public function treatTempImage(Media $media) {
        $this->resizeImage($media, 'small');
        $this->resizeImage($media, 'medium');
        $this->resizeImage($media, 'big');

        $article = $media->getArticle();
        $owner = $article->getOwner();
        $target_dir = $this->targetDir.'/'.$owner.'/medias/'.$article->getId().'/tmp/';
        unlink($target_dir.$media->getFilename());
        rmdir($target_dir);
    }
}