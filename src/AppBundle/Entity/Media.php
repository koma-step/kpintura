<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Media
 *
 * @ORM\Table(name="media", indexes={@ORM\Index(name="fk_media_article", columns={"fk_article"})})
 * @ORM\Entity
 */
class Media
{
    /**
     * @var integer
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Article", inversedBy="medias")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="fk_article", referencedColumnName="id")
     * })
     */
    private $article;

    /**
     * @var string
     *
     * @ORM\Column(name="ext", type="string", length=5, nullable=false)
     */
    private $ext;

    /**
     * @var UploadedFile
     */
    private $file;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * Set fkArticle
     *
     * @param integer $article
     *
     * @return Media
     */
    public function setArticle($article)
    {
        $this->article = $article;

        return $this;
    }

    /**
     * Get article
     *
     * @return integer
     */
    public function getArticle()
    {
        return $this->article;
    }

    /**
     * Set ext
     *
     * @param string $ext
     *
     * @return Media
     */
    public function setExt($ext)
    {
        $this->ext = $ext;

        return $this;
    }

    public function setFile($file) {
        $this->file = $file;
    }

    public function getFile() {
        return $this->file;
    }

    /**
     * Get ext
     *
     * @return string
     */
    public function getExt()
    {
        return $this->ext;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }
    
    public function getFilename() {
        return $this->getId().'.'.$this->getExt();
    }
}
