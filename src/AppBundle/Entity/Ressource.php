<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Ressource
 *
 * @ORM\Table(name="ressource", indexes={@ORM\Index(name="fk_image_article", columns={"fk_article"})})
 * @ORM\Entity
 */
class Ressource
{
    /**
     * @var string
     *
     * @ORM\Column(name="guid", type="string", length=32, nullable=false)
     */
    private $guid;

    /**
     * @var string
     *
     * @ORM\Column(name="ext", type="string", length=5, nullable=false)
     */
    private $ext;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=10, nullable=true)
     */
    private $type;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \AppBundle\Entity\Article
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="fk_article", referencedColumnName="id")
     * })
     */
    private $fkArticle;



    /**
     * Set guid
     *
     * @param string $guid
     *
     * @return Ressource
     */
    public function setGuid($guid)
    {
        $this->guid = $guid;

        return $this;
    }

    /**
     * Get guid
     *
     * @return string
     */
    public function getGuid()
    {
        return $this->guid;
    }

    /**
     * Set ext
     *
     * @param string $ext
     *
     * @return Ressource
     */
    public function setExt($ext)
    {
        $this->ext = $ext;

        return $this;
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
     * Set type
     *
     * @param string $type
     *
     * @return Ressource
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
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

    /**
     * Set fkArticle
     *
     * @param \AppBundle\Entity\Article $fkArticle
     *
     * @return Ressource
     */
    public function setFkArticle(\AppBundle\Entity\Article $fkArticle = null)
    {
        $this->fkArticle = $fkArticle;

        return $this;
    }

    /**
     * Get fkArticle
     *
     * @return \AppBundle\Entity\Article
     */
    public function getFkArticle()
    {
        return $this->fkArticle;
    }
}
