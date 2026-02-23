CREATE TABLE Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    id_categoria_padre INT NULL,

    CONSTRAINT fk_categoria_padre
        FOREIGN KEY (id_categoria_padre)
        REFERENCES Categoria(id)
        ON DELETE SET NULL
);

CREATE TABLE Categoria_Producto (
    id_categoria INT NOT NULL,
    id_producto INT NOT NULL,

    PRIMARY KEY (id_categoria, id_producto),

    CONSTRAINT fk_cp_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES Categoria(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_cp_producto
        FOREIGN KEY (id_producto)
        REFERENCES Producto(id)
        ON DELETE CASCADE
);


CREATE TABLE Imagen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(2500) NOT NULL,
    objeto VARCHAR(1000) NOT NULL,
    orden INT DEFAULT 0
);

CREATE TABLE Producto_Imagen (
    id_producto INT NOT NULL,
    id_imagen INT NOT NULL,
    PRIMARY KEY (id_producto, id_imagen),
    FOREIGN KEY (id_producto) REFERENCES Producto(id),
    FOREIGN KEY (id_imagen) REFERENCES Imagen(id)
);