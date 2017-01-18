<?php 

namespace AppBundle\Client;

class ClientArticle
{
    private $data = [];

    public function __construct(array $articles)
    {
        foreach($articles as $article) {
            $medias = $article->getMedias();
            foreach($medias as $media) {
                $this->data[] = [
                    'name' => $media->getFilename(),
                    'title' => $article->getTitre(),
                    'description' => $article->getDescription()
                ];
            }
        }
    }
    
    public function getData() {
        return $this->data;
    }
}