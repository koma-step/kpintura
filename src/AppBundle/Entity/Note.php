<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Note
 *
 * @ORM\Table(name="note", indexes={@ORM\Index(name="fk_note_visiteur", columns={"fk_visiteur"}), @ORM\Index(name="fk_note_article", columns={"fk_article"})})
 * @ORM\Entity
 */
class Note
{
    /**
     * @var integer
     *
     * @ORM\Column(name="note", type="integer", nullable=false)
     */
    private $note;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime", nullable=false)
     */
    private $date;

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
     * Set note
     *
     * @param integer $note
     *
     * @return Note
     */
    public function setNote($note)
    {
        $this->note = $note;

        return $this;
    }

    /**
     * Get note
     *
     * @return integer
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Note
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
     * @return Note
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
     * @return Note
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
