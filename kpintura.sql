/*
SQLyog Community v12.2.6 (64 bit)
MySQL - 5.7.17-0ubuntu0.16.04.1 : Database - kpintura
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`kpintura` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `kpintura`;

/*Data for the table `article` */

insert  into `article`(`id`,`fk_lieu`,`owner`,`titre`,`description`) values 
(90,NULL,1,'test','test'),
(91,NULL,1,'test','test'),
(92,NULL,1,'test','test'),
(93,NULL,1,'test','test'),
(94,NULL,1,'test','test'),
(95,NULL,1,'test','test'),
(96,NULL,1,'test','test'),
(97,NULL,1,'test','test'),
(98,NULL,1,'test','test'),
(99,NULL,1,'test','test'),
(100,NULL,1,'test','test'),
(101,NULL,1,'test','test'),
(102,NULL,1,'test','test'),
(103,NULL,1,'test','test'),
(104,NULL,1,'test','test'),
(105,NULL,1,'test','test');

/*Data for the table `comment` */

/*Data for the table `l_article_tag` */

/*Data for the table `lieu` */

/*Data for the table `media` */

insert  into `media`(`id`,`fk_article`,`ext`) values 
(67,90,'jpeg'),
(68,91,'jpeg'),
(69,92,'jpeg'),
(70,93,'jpeg'),
(71,94,'jpeg'),
(72,95,'jpeg'),
(73,96,'jpeg'),
(74,97,'jpeg'),
(75,98,'jpeg'),
(76,99,'jpeg'),
(77,100,'jpeg'),
(78,101,'jpeg'),
(79,102,'jpeg'),
(80,103,'jpeg'),
(81,104,'jpeg'),
(82,105,'jpeg');

/*Data for the table `note` */

/*Data for the table `ressource` */

/*Data for the table `tag` */

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`username_canonical`,`email`,`email_canonical`,`enabled`,`salt`,`password`,`last_login`,`confirmation_token`,`password_requested_at`,`roles`,`name`) values 
(1,'koma','koma','kosmostep@gmail.com','kosmostep@gmail.com',1,NULL,'$2y$13$sWBt3Mth5Gs5RfoKrnufUObCWEqz/..ggVIUJkrAkWoctnCCNWX72','2017-01-17 01:07:40',NULL,NULL,'a:1:{i:0;s:10:\"ROLE_ADMIN\";}','');

/*Data for the table `visite` */

/*Data for the table `visiteur` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
