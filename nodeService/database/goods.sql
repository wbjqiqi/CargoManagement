-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-11-23 18:24:45
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
('1', '格力', '0000-00-00 00:00:00'),
('2', '伊利', '0000-00-00 00:00:00'),
('3', '优惠', '0000-00-00 00:00:00'),
('kh871lk5now7d0ogt2au7hkt9', '双汇', '0000-00-00 00:00:00'),
('wntm2gzcebykr15amk8svpldi', '蒙牛', '2017-11-23 14:50:52');

-- --------------------------------------------------------

--
-- 表的结构 `goods_buckets`
--

CREATE TABLE `goods_buckets` (
  `id` int(11) NOT NULL,
  `bucket_key` varchar(30) NOT NULL,
  `object_key` varchar(50) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `imageData` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goods_buckets`
--

INSERT INTO `goods_buckets` (`id`, `bucket_key`, `object_key`, `create_at`, `imageData`) VALUES
(2, 'sss', '', '2017-11-23 15:24:52', ''),
(14, 'cargo_management_cargo_img', '', '2017-11-23 15:49:08', ''),
(15, '', 'n6olq636gp0yewzddexapds4i', '2017-11-23 16:46:09', 0x756e646566696e6564);

-- --------------------------------------------------------

--
-- 表的结构 `goods_message`
--

CREATE TABLE `goods_message` (
  `id` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `brand` varchar(100) CHARACTER SET utf8 NOT NULL,
  `remark` varchar(200) CHARACTER SET utf8 NOT NULL,
  `price` int(100) NOT NULL,
  `number` int(100) NOT NULL,
  `rest` int(100) NOT NULL,
  `specific` varchar(200) CHARACTER SET utf8 NOT NULL,
  `image` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `searchCount` int(100) NOT NULL,
  `keycode` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `imageData` blob NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `goods_message`
--

INSERT INTO `goods_message` (`id`, `name`, `brand`, `remark`, `price`, `number`, `rest`, `specific`, `image`, `searchCount`, `keycode`, `imageData`, `create_at`) VALUES
('2', '空调', '格力', '格力空调', 2399, 6, 33, '无', '', 25, '', '', '2017-11-23 16:30:26'),
('n6olq636gp0yewzddexapds4i', '哇哈哈', '伊利', '好喝', 7, 6, 300, '瓶', '', 0, '', '', '2017-11-23 14:51:59'),
('qswpfummr8q5uidyjls7nwmi', '333', '伊利', '333', 333, 333, 333, '333', '', 0, '333', '', '2017-11-23 14:51:59'),
('vz39l3caiy79zvco5lz4u0udi', '空调', '优惠', '33', 22, 33, 22, '22', '', 0, 'kt', '', '2017-11-23 14:51:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `goods_brands`
--
ALTER TABLE `goods_brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goods_buckets`
--
ALTER TABLE `goods_buckets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goods_message`
--
ALTER TABLE `goods_message`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `goods_buckets`
--
ALTER TABLE `goods_buckets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
