DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` boolean DEFAULT false,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;





DROP TABLE IF EXISTS `clientes`;

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_fullname` varchar(255) NOT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `telefono` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(155) NOT NULL,
  `tag` varchar(555) NOT NULL,
  `precio` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
