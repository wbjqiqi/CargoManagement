-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-11-08 16:32:03
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
  `searchCount` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- 转存表中的数据 `goods_message`
--

INSERT INTO `goods_message` (`id`, `name`, `brand`, `remark`, `price`, `number`, `rest`, `specific`, `image`, `searchCount`) VALUES
('06b827hjhwen1jv7j473k2csor', '', '', '', 0, 0, 0, '', '', 0),
('1', '挖掘机2', '蓝翔', '很好', 2999, 52, 3, '台', '/static/assets/images/th.jpg', 81),
('1x0empgtmxgf55ryxhux1dcxr', '', '', '', 0, 0, 0, '', '', 0),
('2', '空调', '格力', '格力空调', 2399, 6, 33, '无', '', 7),
('4m3ophgjs0x54pfzyo01u7hkt9', '', '', '', 0, 0, 0, '', '', 0),
('83navg4y63jclkplag9y0hpvi', '', '', '', 0, 0, 0, '', '', 0),
('8efuyex7gq4pjxtqm7cmu0udi', '', '', '', 0, 0, 0, '', '', 0),
('9uia1elm2ap4k691nnmefusor', '', '', '', 0, 0, 0, '', '', 0),
('aymu6iyer1in82vzg73uqsemi', '', '', '', 0, 0, 0, '', '', 0),
('b23s92bq92fcai5h6i83680k9', '', '', '', 0, 0, 0, '', '', 0),
('dnog83wrxoglmqhdq31f0qkt9', '', '', '', 0, 0, 0, '', '', 0),
('dtcgyp6msmr3k2z3dox2wvzpvi', '问问', '问问', '我问问', 2, 2, 22, '问问', '', 0),
('ez63mevuvvyiphfqthqhkhuxr', '', '', '', 0, 0, 0, '', '', 0),
('g8ud69n9vemidsil2l7919k9', '问问', '恩恩', '22', 22, 22, 222, '恩恩', '', 0),
('gl00ag2ibpni9dlhdhnwb3xr', '', '', '', 0, 0, 0, '', '', 0),
('jhwlyjhqkcptboi3l38p06bt9', '', '', '', 0, 0, 0, '', '', 0),
('kn35zqnaeg0eei16cf3hj8aor', '', '', '', 0, 0, 0, '', '', 0),
('kwbart0140vt6blvg7u70hpvi', '', '', '', 0, 0, 0, '', '', 0),
('m2ne4495trk846de106zb0529', '', '', '', 0, 0, 0, '', '', 0),
('m2rp6ymk0ccuezw9hc6561or', '', '', '', 0, 0, 0, '', '', 0),
('m8dzbl4u1i0tj046v84kro1or', '', '', '', 0, 0, 0, '', '', 0),
('n6olq636gp0yewzddexapds4i', '哇哈哈', '伊利', '好喝', 7, 6, 300, '瓶', '', 0),
('ng7dye0h31pbqz4000w1att9', '', '', '', 0, 0, 0, '', '', 0),
('oavev6lwziuyehflgvij7zaor', '', '', '', 0, 0, 0, '', '', 0),
('pz2wq42imvgume076paybke29', '', '', '', 0, 0, 0, '', '', 0),
('wdqggwfbllwufdzc2jf6flxr', '', '', '', 0, 0, 0, '', '', 0),
('yqkkrt9q47v8j42ofejulq5mi', '', '', '', 0, 0, 0, '', '', 0),
('zq3q0ufz88k690w292ehwu3di', '', '', '', 0, 0, 0, '', '', 0);

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
