<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Tag
 *
 * @ORM\Table(name="tag", indexes={@ORM\Index(name="tag_lib", columns={"lib"})})
 * @ORM\Entity
 */
class Tag
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
     * @ORM\Column(name="lib", type="string", length=50, nullable=false)
     */
    private $lib;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Article", mappedBy="fkTag")
     */
    private $fkArticle;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->fkArticle = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set guid
     *
     * @param string $guid
     *
     * @return Tag
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
     * Set lib
     *
     * @param string $lib
     *
     * @return Tag
     */
    public function setLib($lib)
    {
        $this->lib = $lib;

        return $this;
    }

    /**
     * Get lib
     *
     * @return string
     */
    public function getLib()
    {
        return $this->lib;
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
     * Add fkArticle
     *
     * @param \AppBundle\Entity\Article $fkArticle
     *
     * @return Tag
     */
    public function addFkArticle(\AppBundle\Entity\Article $fkArticle)
    {
        $this->fkArticle[] = $fkArticle;

        return $this;
    }

    /**
     * Remove fkArticle
     *
     * @param \AppBundle\Entity\Article $fkArticle
     */
    public function removeFkArticle(\AppBundle\Entity\Article $fkArticle)
    {
        $this->fkArticle->removeElement($fkArticle);
    }

    /**
     * Get fkArticle
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFkArticle()
    {
        return $this->fkArticle;
    }
}
