-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 01, 2022 at 01:26 PM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `national_internship_programme`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `institution_company` varchar(300) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `firstname`, `lastname`, `email`, `role`, `institution_company`, `username`, `password`) VALUES
(5, 'Super', 'User', 'superuser@mtc.com.na', 'admin', 'MTC', 'superuser', '$2a$12$JK.8rwwx.226mVbuzciateZ2W1oBdXDo5NDp69jtjHg8RebDVUize'),
(9, 'Test', '   xxcxx', 'weewew@gmail.com', 'adminNUST', 'Namibia University of Science and Technology (NUST)', 'test', 'Password123');

-- --------------------------------------------------------

--
-- Table structure for table `available_internships`
--

DROP TABLE IF EXISTS `available_internships`;
CREATE TABLE IF NOT EXISTS `available_internships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `internship_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `registration_number` varchar(255) NOT NULL,
  `town_city` varchar(255) NOT NULL,
  `number_of_positions` int DEFAULT NULL,
  `company_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pdf_file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date_posted` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `closing_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `available_internships`
--

INSERT INTO `available_internships` (`id`, `internship_name`, `company_name`, `registration_number`, `town_city`, `number_of_positions`, `company_email`, `pdf_file`, `date_posted`, `closing_date`) VALUES
(117, 'test', 'test', 'test', 'test', 1, 'eshivute@mtc.com.na', 'NIP-1646126550643.pdf', '2022-03-01 11:22:30', '2022-04-08');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
CREATE TABLE IF NOT EXISTS `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `institution_admins`
--

DROP TABLE IF EXISTS `institution_admins`;
CREATE TABLE IF NOT EXISTS `institution_admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `institution_name` varchar(255) NOT NULL,
  `physical_address` varchar(255) NOT NULL,
  `contact_person_fullname` varchar(255) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `institution_admins`
--

INSERT INTO `institution_admins` (`id`, `institution_name`, `physical_address`, `contact_person_fullname`, `contact_number`, `role`, `email`, `password`) VALUES
(1, 'Namibia University of Science and Technology (NUST)', 'Windhoek West, Windhoek', 'Esther Shivute', '0816708147', 'adminNUST', 'esthershivute@gmail.com', '$2a$12$.JYROuO0WEocwSjMIq4ByuLJ1d9/vQJuzfBHtKxzNywyNdSNElvbO');

-- --------------------------------------------------------

--
-- Table structure for table `new_internships`
--

DROP TABLE IF EXISTS `new_internships`;
CREATE TABLE IF NOT EXISTS `new_internships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `internships_name` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `company` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `town_city` varchar(255) NOT NULL,
  `registration_number` varchar(255) NOT NULL,
  `company_email` varchar(255) NOT NULL,
  `institution` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_of_internship` varchar(255) NOT NULL,
  `pdf_file` varchar(255) NOT NULL,
  `closing_date` date NOT NULL,
  `date_received` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `new_internships`
--

INSERT INTO `new_internships` (`id`, `internships_name`, `company`, `town_city`, `registration_number`, `company_email`, `institution`, `email`, `no_of_internship`, `pdf_file`, `closing_date`, `date_received`) VALUES
(74, 'test', 'test', 'test', 'test', 'eshivute@mtc.com.na', 'Namibia University of Science and Technology (NUST)', 'kkapelwa@nust.na', '1', 'NIP-1646126550643.pdf', '2022-04-08', '2022-03-01 11:23:05');

-- --------------------------------------------------------

--
-- Table structure for table `organization_register`
--

DROP TABLE IF EXISTS `organization_register`;
CREATE TABLE IF NOT EXISTS `organization_register` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `registration_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `physical_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contact_person_fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contact_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='all organizations registered with nip';

--
-- Dumping data for table `organization_register`
--

INSERT INTO `organization_register` (`id`, `organization_name`, `registration_number`, `physical_address`, `contact_person_fullname`, `contact_number`, `email`, `password`, `role`) VALUES
(6, 'test', 'company1', 'test', 'test', '087553343', 'esthershivute@gmail.com', '$2a$12$EVepmouXu0.2pSDBl.K3V.tIkRVn1Uoao0McYd3iClJW70E2PI9wW', 'organization');

-- --------------------------------------------------------

--
-- Table structure for table `passwordresetemail`
--

DROP TABLE IF EXISTS `passwordresetemail`;
CREATE TABLE IF NOT EXISTS `passwordresetemail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `passwordresettoken`
--

DROP TABLE IF EXISTS `passwordresettoken`;
CREATE TABLE IF NOT EXISTS `passwordresettoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `_userId` int NOT NULL,
  `resettoken` varchar(255) NOT NULL,
  `createAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students_interns`
--

DROP TABLE IF EXISTS `students_interns`;
CREATE TABLE IF NOT EXISTS `students_interns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `idNo_or_passportNo` varchar(255) NOT NULL,
  `student_number` varchar(255) NOT NULL,
  `student_email` varchar(255) NOT NULL,
  `student_phoneNumber` varchar(255) NOT NULL,
  `institution` varchar(255) NOT NULL,
  `field_of_study` varchar(255) DEFAULT NULL,
  `internships_name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `town_city` varchar(255) NOT NULL,
  `company_email` varchar(255) NOT NULL,
  `company_registrationNo` varchar(255) NOT NULL,
  `supervisor_details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `admission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `completion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `student_document` varchar(255) NOT NULL,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'user',
  `password` varchar(255) DEFAULT NULL,
  `resetToken` varchar(255) NOT NULL,
  `resetTokenExpires` date NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
