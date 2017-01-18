<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;
use Ramsey\Uuid\Doctrine\UuidGenerator;

/**
 * Article
 *
 * @ORM\Table(name="article", indexes={@ORM\Index(name="fk_article_lieu", columns={"fk_lieu"}), @ORM\Index(name="article_titre", columns={"titre"})})
 * @ORM\Entity
 */
class Article
{
    /**
     * @var integer
     * @ORM\Column(name="owner", type="integer", nullable=true)
     */
    private $owner;

    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=50, nullable=false)
     */
    private $titre;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=true)
     */
    private $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \AppBundle\Entity\Lieu
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Lieu")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="fk_lieu", referencedColumnName="id")
     * })
     */
    private $fkLieu;

    /**
     * @var \Doctrine\Common\Collections\Collection
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Tag", inversedBy="fkArticle")
     * @ORM\JoinTable(name="l_article_tag",
     *   joinColumns={
     *     @ORM\JoinColumn(name="fk_article", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="fk_tag", referencedColumnName="id")
     *   }
     * )
     */
    private $fkTag;

    /**
     * @var \Doctrine\Common\Collections\Collection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Media", mappedBy="article")
     *
     * var \AppBundle\Entity\Media
     * ORM\OneToOne(targetEntity="\AppBundle\Entity\Media", mappedBy="article")
     */
    private $medias;

    /**
     * @var UploadedFile
     * @Assert\NotBlank(message="Média boligatoire")
     * @Assert\File(mimeTypes={ "image/*" })
     */
    private $file;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->fkTag = new \Doctrine\Common\Collections\ArrayCollection();
        $this->medias = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * @param $owner
     * @return $this
     */
    public function setOwner($owner) {
        $this->owner = $owner;
        return $this;
    }

    /**
     * @return int
     */
    public function getOwner() {
        return $this->owner;
    }

    /**
     * @param string $titre
     * @return Article
     */
    public function setTitre($titre)
    {
        $this->titre = $titre;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitre()
    {
        return $this->titre;
    }

    /**
     * @param $description
     * @return Article
     */
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param \AppBundle\Entity\Lieu $fkLieu
     * @return Article
     */
    public function setFkIieu(\AppBundle\Entity\Lieu $fkLieu = null)
    {
        $this->fkLieu = $fkLieu;
        return $this;
    }

    /**
     * @return \AppBundle\Entity\Lieu
     */
    public function getFkIieu()
    {
        return $this->fkLieu;
    }

    /**
     * @param \AppBundle\Entity\Tag $fkTag
     * @return Article
     */
    public function addFkTag(\AppBundle\Entity\Tag $fkTag)
    {
        $this->fkTag[] = $fkTag;
        return $this;
    }

    /**
     * @param \AppBundle\Entity\Tag $fkTag
     */
    public function removeFkTag(\AppBundle\Entity\Tag $fkTag)
    {
        $this->fkTag->removeElement($fkTag);
    }

    /**
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFkTag()
    {
        return $this->fkTag;
    }

    /**
     * return \AppBundle\Media
     */
    public function getMedias() {
        return $this->medias;
    }

    /**
     * @return UploadedFile
     */
    public function getFile() {
        return $this->file;
    }
    /**
     * @param UploadedFile $file
     */
    public function setFile(UploadedFile $file) {
        $this->file = $file;
    }
}
