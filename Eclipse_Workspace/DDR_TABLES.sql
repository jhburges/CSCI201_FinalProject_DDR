DROP DATABASE IF EXISTS `CSCI201_DDR`;
CREATE DATABASE  IF NOT EXISTS `CSCI201_DDR` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `CSCI201_DDR`;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `highScore` int(11) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

-- --
-- -- Table structure for table `HighScore`
-- --

-- DROP TABLE IF EXISTS `HighScore`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `HighScore` (
--   `scoreID` int(11) NOT NULL AUTO_INCREMENT,
--   `songName` varchar(50) NOT NULL,
--   `userName` varchar(50) NOT NULL,
--   `score` int(11) NOT NULL,
--   PRIMARY KEY (`scoreID`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `HighScore`
-- --

-- LOCK TABLES `HighScore` WRITE;
-- /*!40000 ALTER TABLE `HighScore` DISABLE KEYS */;
-- /*!40000 ALTER TABLE `HighScore` ENABLE KEYS */;
-- UNLOCK TABLES;

