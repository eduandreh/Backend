-- clientes: table
CREATE TABLE `clientes`
(
    `id`               int          NOT NULL AUTO_INCREMENT,
    `usuario_fullname` varchar(255) NOT NULL,
    `ubicacion`        varchar(255) NOT NULL,
    `telefono`         int          NOT NULL,
    `createdAt`        datetime     NOT NULL,
    `updatedAt`        datetime     NOT NULL,
    `fullname`         int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fullname` (`fullname`),
    CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`fullname`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

-- No native definition for element: fullname (index)

-- domicilios: table
CREATE TABLE `domicilios`
(
    `id`        int          NOT NULL AUTO_INCREMENT,
    `nombre`    varchar(60)  NOT NULL,
    `apellido`  varchar(60)  NOT NULL,
    `direccion` varchar(180) NOT NULL,
    `ciudad`    varchar(50)  NOT NULL,
    `provincia` varchar(20)  NOT NULL,
    `zipcode`   varchar(10)  NOT NULL,
    `email`     varchar(100) NOT NULL,
    `cellphone` varchar(15)  NOT NULL,
    `createdAt` datetime     NOT NULL,
    `updatedAt` datetime     NOT NULL,
    `clienteId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `clienteId` (`clienteId`),
    CONSTRAINT `domicilios_ibfk_1` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

-- No native definition for element: clienteId (index)

-- medioDePagos: table
CREATE TABLE `medioDePagos`
(
    `id`        int         NOT NULL AUTO_INCREMENT,
    `tarjeta`   varchar(15) NOT NULL,
    `numero`    varchar(16) NOT NULL,
    `cvv`       varchar(3)  NOT NULL,
    `expiry`    varchar(4)  NOT NULL,
    `titular`   varchar(75) NOT NULL,
    `createdAt` datetime    NOT NULL,
    `updatedAt` datetime    NOT NULL,
    `clienteId` int      DEFAULT NULL,
    `deletedAt` datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `clienteId` (`clienteId`),
    CONSTRAINT `medioDePagos_ibfk_1` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

-- No native definition for element: clienteId (index)

-- ordenProducto: table
CREATE TABLE `ordenProducto`
(
    `cantidad`      int   NOT NULL,
    `precio`        float NOT NULL,
    `productoId`    int   NOT NULL,
    `ordenNroOrden` int   NOT NULL,
    PRIMARY KEY (`productoId`, `ordenNroOrden`),
    KEY `ordenNroOrden` (`ordenNroOrden`),
    CONSTRAINT `ordenProducto_ibfk_1` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `ordenProducto_ibfk_2` FOREIGN KEY (`ordenNroOrden`) REFERENCES `ordenes` (`nro_orden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

-- No native definition for element: ordenNroOrden (index)

-- ordenes: table
CREATE TABLE `ordenes`
(
    `nro_orden`     int      NOT NULL AUTO_INCREMENT,
    `status`        char(1)  NOT NULL,
    `createdAt`     datetime NOT NULL,
    `updatedAt`     datetime NOT NULL,
    `clienteId`     int DEFAULT NULL,
    `medioDePagoId` int DEFAULT NULL,
    `domicilioId`   int DEFAULT NULL,
    PRIMARY KEY (`nro_orden`),
    KEY `clienteId` (`clienteId`),
    KEY `medioDePagoId` (`medioDePagoId`),
    KEY `domicilioId` (`domicilioId`),
    CONSTRAINT `ordenes_ibfk_433` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `ordenes_ibfk_434` FOREIGN KEY (`medioDePagoId`) REFERENCES `medioDePagos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `ordenes_ibfk_435` FOREIGN KEY (`domicilioId`) REFERENCES `domicilios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

-- No native definition for element: clienteId (index)

-- No native definition for element: medioDePagoId (index)

-- No native definition for element: domicilioId (index)

-- productos: table
CREATE TABLE `productos`
(
    `id`            int          NOT NULL AUTO_INCREMENT,
    `titulo`        varchar(255) NOT NULL,
    `tag`           varchar(255) NOT NULL,
    `precio`        float        NOT NULL,
    `imageFileName` varchar(5000) DEFAULT NULL,
    `createdAt`     datetime     NOT NULL,
    `updatedAt`     datetime     NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

-- usuarios: table
CREATE TABLE `usuarios`
(
    `id`        int          NOT NULL AUTO_INCREMENT,
    `fullname`  varchar(255) NOT NULL,
    `email`     varchar(255) NOT NULL,
    `password`  varchar(255) NOT NULL,
    `admin`     tinyint(1) DEFAULT '0',
    `createdAt` datetime     NOT NULL,
    `updatedAt` datetime     NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

