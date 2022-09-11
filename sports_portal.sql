-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 11, 2022 at 02:44 PM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sports_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) NOT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `first_name`, `last_name`, `profile_image`, `gender`, `created_at`, `updated_at`) VALUES
(1, 'Lebron', 'James', 'https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-03/nba-plain--fdbe3f18-5c7c-4fbe-8585-4cfbf5f60fe6.jpeg?itok=XJFjt6fo', 'male', '2022-08-01 16:09:55', '2022-08-01 16:10:46'),
(2, 'Jaja', 'Santiago', 'https://media.philstar.com/images/articles/jaja-santiago-foton_2018-04-24_11-54-45.jpg', 'female', '2022-08-01 16:11:06', '2022-08-01 16:11:06'),
(3, 'Manny', 'Packyaw', 'http://assets.rappler.com/EE30BD8CCA5C492E8C56794E978ADD7C/img/7CD0439662A94A4E838E9196F36E7D1D/manny-pacquiao-flex-jan-13-2019.jpg', 'male', '2022-08-01 16:11:41', '2022-08-01 16:11:41'),
(4, 'Christian', 'Verzosa', 'http://www.sydneyunihandball.com/wp-content/uploads/2014/05/PlaceholderPlayer.png', 'male', '2022-08-01 16:12:16', '2022-08-01 16:12:16');

-- --------------------------------------------------------

--
-- Table structure for table `player_sports`
--

CREATE TABLE `player_sports` (
  `id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `sport_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `player_sports`
--

INSERT INTO `player_sports` (`id`, `player_id`, `sport_id`, `created_at`, `updated_at`) VALUES
(1, 4, 3, '2022-08-01 16:14:52', '2022-08-01 16:14:52'),
(2, 2, 1, '2022-08-01 16:14:52', '2022-08-01 16:14:52'),
(3, 1, 2, '2022-08-01 16:15:22', '2022-08-01 16:15:22'),
(4, 3, 2, '2022-08-01 16:15:22', '2022-08-01 16:15:22'),
(5, 4, 2, '2022-08-01 16:15:52', '2022-08-01 16:15:52');

-- --------------------------------------------------------

--
-- Table structure for table `sports`
--

CREATE TABLE `sports` (
  `id` int(11) NOT NULL,
  `sport_name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sports`
--

INSERT INTO `sports` (`id`, `sport_name`, `created_at`, `updated_at`) VALUES
(1, 'Volleyball', '2022-08-01 16:13:12', '2022-08-01 16:13:12'),
(2, 'Basketball', '2022-08-01 16:13:28', '2022-08-01 16:13:28'),
(3, 'Rowing', '2022-08-01 16:13:28', '2022-08-01 16:13:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `player_sports`
--
ALTER TABLE `player_sports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_player_information_players_idx` (`player_id`),
  ADD KEY `fk_player_information_sports1_idx` (`sport_id`);

--
-- Indexes for table `sports`
--
ALTER TABLE `sports`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `player_sports`
--
ALTER TABLE `player_sports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sports`
--
ALTER TABLE `sports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `player_sports`
--
ALTER TABLE `player_sports`
  ADD CONSTRAINT `fk_player_information_players` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_player_information_sports1` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
