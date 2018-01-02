-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-01-02 18:21:46
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `goods`
--

-- --------------------------------------------------------

--
-- 表的结构 `goods_brands`
--

CREATE TABLE `goods_brands` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goods_brands`
--

INSERT INTO `goods_brands` (`id`, `name`, `create_at`) VALUES
('mc48syj6eo40u0kt1bad4e7b9', '伊利', '2018-01-02 16:16:00'),
('2kdh5yir96g831r7923lgwg66r', '蒙牛', '2018-01-02 16:16:05'),
('n05krjay7swt3nyznnocx47vi', '优惠', '2018-01-02 16:30:58');

-- --------------------------------------------------------

--
-- 表的结构 `goods_message`
--

CREATE TABLE `goods_message` (
  `id` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `brand` varchar(100) CHARACTER SET utf8 NOT NULL,
  `remark` varchar(200) CHARACTER SET utf8 NOT NULL,
  `price` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `number` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `rest` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `specific` varchar(200) CHARACTER SET utf8 NOT NULL,
  `searchCount` int(100) NOT NULL,
  `keycode` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `fileName` varchar(40) COLLATE utf8mb4_bin NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `goods_message`
--

INSERT INTO `goods_message` (`id`, `name`, `brand`, `remark`, `price`, `number`, `rest`, `specific`, `searchCount`, `keycode`, `fileName`, `create_at`) VALUES
('3naf72fqi5dinibz5pfpw4s4i', '牛奶', '伊利', '牛奶', '234', '23', '234', '23', 0, 'nn7', '1514913633851.jpeg', '2018-01-01 15:57:32'),
('3oavcc9wcchlsi2wfsglc2qpvi', '4', '优惠', '4', '4', '4', '4', '4', 0, '4', '1514913654874.jpeg', '2018-01-02 08:56:30'),
('6zp9mlvuqr496vjhxc8404fgvi', 'rrr', '伊利', '333', '', '', '', '', 0, '33', '1514910730294.jpeg', '2018-01-02 16:42:24'),
('bhm11lt8zv44fjkltw5k8uayvi', 'EEE', '伊利', '33', '33', '33', '33', 'EE', 0, '33', '1514912248195.jpeg', '2018-01-02 16:57:29'),
('n6olq636gp0yewzddexapds4i', '哇哈哈', '伊利', '好喝', '7', '6', '300', '瓶', 0, '', '', '2017-11-23 14:51:59'),
('qswpfummr8q5uidyjls7nwmi', '333', '伊利', '333', '333', '333', '333', '333', 0, '333', '', '2017-11-23 14:51:59'),
('vz39l3caiy79zvco5lz4u0udi', '空调', '优惠', '33', '22', '33', '22', '22', 0, 'kt', '', '2017-11-23 14:51:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `goods_message`
--
ALTER TABLE `goods_message`
  ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
