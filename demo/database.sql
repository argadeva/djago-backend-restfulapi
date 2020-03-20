-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2020 at 11:52 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos-restfulapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Food'),
(2, 'Coffee'),
(3, 'Cake');

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `id` int(11) NOT NULL,
  `order_number` varchar(64) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sub_total` int(64) NOT NULL,
  `ppn` int(64) NOT NULL,
  `total` int(64) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkout`
--

INSERT INTO `checkout` (`id`, `order_number`, `user_id`, `sub_total`, `ppn`, `total`, `created_at`) VALUES
(1, '1582102037926', 1, 103000, 10300, 113300, '2019-12-31 15:47:17'),
(2, '1582102134647', 1, 285000, 28500, 313500, '2020-02-14 15:48:54'),
(3, '1582102246615', 1, 53000, 5300, 58300, '2020-02-17 15:50:46'),
(4, '1582102309198', 1, 150000, 15000, 165000, '2020-02-18 15:51:49'),
(5, '1582102465904', 1, 147000, 14700, 161700, '2020-02-19 15:54:25');

-- --------------------------------------------------------

--
-- Table structure for table `checkout_detail`
--

CREATE TABLE `checkout_detail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` int(64) NOT NULL,
  `qty` int(64) NOT NULL,
  `total` int(64) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkout_detail`
--

INSERT INTO `checkout_detail` (`id`, `order_id`, `product_id`, `price`, `qty`, `total`, `created_at`) VALUES
(1, 1, 4, 60000, 1, 60000, '2020-02-19 15:47:18'),
(2, 1, 7, 33000, 1, 33000, '2020-02-19 15:47:18'),
(3, 1, 10, 10000, 1, 10000, '2020-02-19 15:47:18'),
(4, 2, 2, 60000, 3, 180000, '2020-02-19 15:48:54'),
(5, 2, 5, 30000, 2, 60000, '2020-02-19 15:48:54'),
(6, 2, 9, 15000, 3, 45000, '2020-02-19 15:48:54'),
(7, 3, 6, 28000, 1, 28000, '2020-02-19 15:50:46'),
(8, 3, 10, 10000, 2, 20000, '2020-02-19 15:50:46'),
(9, 3, 8, 5000, 1, 5000, '2020-02-19 15:50:46'),
(10, 4, 5, 30000, 1, 30000, '2020-02-19 15:51:49'),
(11, 4, 4, 60000, 2, 120000, '2020-02-19 15:51:49'),
(12, 5, 9, 15000, 1, 15000, '2020-02-19 15:54:26'),
(13, 5, 7, 33000, 4, 132000, '2020-02-19 15:54:26');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` int(128) NOT NULL,
  `stock` int(128) NOT NULL,
  `category_id` int(11) NOT NULL,
  `update_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `price`, `stock`, `category_id`, `update_at`, `created_at`, `deleted`) VALUES
(1, 'Wiener Schnitzel', 'Wiener Schnitzel', 'http://localhost:1000/uploads/file-wiener.png', 69000, 100, 1, '2020-02-19 15:27:21', '2020-02-19 15:27:21', 0),
(2, 'Salmon Truffle Teriyaki', 'Salmon Truffle', 'http://localhost:1000/uploads/file-salmon.png', 60000, 97, 1, '2020-02-19 15:28:14', '2020-02-19 15:28:14', 0),
(3, 'Chicken Katsu Dabu-dabu', 'Chicken Katsu', '', 60000, 100, 0, '2020-02-19 15:29:49', '2020-02-19 15:29:41', 0),
(4, 'Chicken Katsu Dabu-dabu', 'Chicken Katsu', 'http://localhost:1000/uploads/file-chickenkatsu.png', 60000, 97, 1, '2020-02-19 15:32:21', '2020-02-19 15:31:47', 0),
(5, 'Black Forest', 'Black Forest', 'http://localhost:1000/uploads/file-blackforest.png', 30000, 97, 3, '2020-02-19 15:43:20', '2020-02-19 15:43:20', 0),
(6, 'Choco Rhum', 'Choco Rhum', 'http://localhost:1000/uploads/file-chocorum.png', 28000, 99, 3, '2020-02-19 15:43:58', '2020-02-19 15:43:58', 0),
(7, 'Red Velvet Latte', 'Red Velvet Latte', 'http://localhost:1000/uploads/file-redvelvet.png', 33000, 95, 3, '2020-02-19 15:44:43', '2020-02-19 15:44:43', 0),
(8, 'Cappucino', 'Cappucino', 'http://localhost:1000/uploads/file-cappucino.png', 5000, 99, 2, '2020-02-19 15:45:39', '2020-02-19 15:45:39', 0),
(9, 'Cofee Latte', 'Cofee Latte', 'http://localhost:1000/uploads/file-cofee-latte.png', 15000, 96, 2, '2020-02-19 15:46:05', '2020-02-19 15:46:05', 0),
(10, 'Espresso', 'Espresso', 'http://localhost:1000/uploads/file-espresso.png', 10000, 97, 2, '2020-02-19 15:46:39', '2020-02-19 15:46:39', 0);

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `type` enum('in','out') NOT NULL,
  `qty` int(64) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `token`) VALUES
(1, 'Admin', 'admin@admin.com', '$2a$10$RjQGWYPheWPo0XJaj0RdpebQb28yMiS7PVRkkePswHa2BklsBtwwC', '1#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHRzIjp7ImlkIjoxLCJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInRva2VuIjoiMSNleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKeVpYTjFiSFJ6SWpwN0ltbGtJam94TENKdVlXMWxJam9pUVdSdGFXNGlMQ0psYldGcGJDSTZJbUZrYldsdVFHRmtiV2x1TG1OdmJTSXNJblJ2YTJWdUlqcHVkV3hzZlN3aWFXRjBJam94TlRneU1URXpOekE0TENKbGVIQWlPakUxT0RJM01UZzFNRGg5LmRhV18xZ1dRdF9vOVVGMGZrT25zTEdiVmpiWHJTeEpxUnk0U2lvQS1DRmMifSwiaWF0IjoxNTgyNDc2MDA0LCJleHAiOjE1ODMwODA4MDR9.4kmLii2dzrf-xZNdEsapIQZvA4WnPhlQJVQ9VYE4Ivg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkout_detail`
--
ALTER TABLE `checkout_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `checkout_detail`
--
ALTER TABLE `checkout_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
