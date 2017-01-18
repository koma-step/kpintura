<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Visite
 *
 * @ORM\Entity
 * @ORM\Table(name="visite")
 */
class Visite
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime", nullable=false)
     */
    private $date;

    /**
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

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
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Visite
     */
    public function setDateCo($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDateCo()
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
     * Set fkVisiteur
     *
     * @param \AppBundle\Entity\Visiteur $fkVisiteur
     *
     * @return Visite
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

