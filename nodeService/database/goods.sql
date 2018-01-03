-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-01-03 18:17:41
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
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `goods_message`
--

INSERT INTO `goods_message` (`id`, `name`, `brand`, `remark`, `price`, `number`, `rest`, `specific`, `searchCount`, `keycode`, `fileName`, `create_at`, `active`) VALUES
('51d5ri6j6xs5ozdnzyd9m5cdi', '222', '优惠', '222', '222', '222', '222', '222', 0, '222', '1514998724934.jpeg', '2018-01-01 16:47:19', 0),
('d1vqnt53gxdaye0fdxowjc3di', '惹让他', '优惠', '岁的法国', '豆腐干', '岁的法国', '顺丰大概', '豆腐干', 0, '岁的法国', '1514999592567.jpeg', '2018-01-03 17:13:16', 0),
('e7fxept8dl615hh2cq0n3ik9', '342524', '蒙牛', '24352', '2345', '2345', '2435', '2345', 0, '23452', '1514999008648.png', '2018-01-03 17:03:31', 0),
('v6qlw2tovpxbmbmm1ap6nu3di', '222333', '优惠', '12343124', '12341', '2341', '12341234', '222333', 0, '12341234', '1514998983105.jpeg', '2018-01-03 17:03:07', 0);

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
