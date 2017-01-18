<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Comment
 *
 * @ORM\Table(name="comment", indexes={@ORM\Index(name="fk_comment_visiteur", columns={"fk_visiteur"}), @ORM\Index(name="fk_comment_article", columns={"fk_article"}), @ORM\Index(name="comment_auteur", columns={"auteur"}), @ORM\Index(name="comment_content", columns={"content"})})
 * @ORM\Entity
 */
class Comment
{
    /**
     * @var string
     *
     * @ORM\Column(name="guid", type="string", length=32, nullable=false)
     */
    private $guid;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime", nullable=false)
     */
    private $date;

    /**
     * @var string
     *
     * @ORM\Column(name="auteur", type="string", length=50, nullable=false)
     */
    private $auteur;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="string", length=200, nullable=false)
     */
    private $content;

    /**
     * @var boolean
     *
     * @ORM\Column(name="valid", type="boolean", nullable=false)
     */
    private $valid;

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
     * @var \AppBundle\Entity\Visiteur
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Visiteur")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="fk_visiteur", referencedColumnName="id")
     * })
     */
    private $fkVisiteur;



    /**
     * Set guid
     *
     * @param string $guid
     *
     * @return Comment
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
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Comment
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set auteur
     *
     * @param string $auteur
     *
     * @return Comment
     */
    public function setAuteur($auteur)
    {
        $this->auteur = $auteur;

        return $this;
    }

    /**
     * Get auteur
     *
     * @return string
     */
    public function getAuteur()
    {
        return $this->auteur;
    }

    /**
     * Set content
     *
     * @param string $content
     *
     * @return Comment
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set valid
     *
     * @param boolean $valid
     *
     * @return Comment
     */
    public function setValid($valid)
    {
        $this->valid = $valid;

        return $this;
    }

    /**
     * Get valid
     *
     * @return boolean
     */
    public function getValid()
    {
        return $this->valid;
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
     * @return Comment
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

    /**
     * Set fkVisiteur
     *
     * @param \AppBundle\Entity\Visiteur $fkVisiteur
     *
     * @return Comment
     */
    public function setFkVisiteur(\AppBundle\Entity\Visiteur $fkVisiteur = null)
    {
        $this->fkVisiteur = $fkVisiteur;

        return $this;
    }

    /**
     * Get fkVisiteur
     *
     * @return \AppBundle\Entity\Visiteur
     */
    public function getFkVisiteur()
    {
        return $this->fkVisiteur;
    }
}
