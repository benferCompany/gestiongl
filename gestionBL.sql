    /*Principales*/



    CREATE TABLE Tipo_Pago(
        id INT AUTO_INCREMENT PRIMARY KEY,
        descripcion VARCHAR(255) NOT NULL
    );


    CREATE TABLE Tipo_Factura(
        id INT AUTO_INCREMENT PRIMARY KEY,
        tipo_factura VARCHAR(50) NOT NULL
    );

    CREATE TABLE Producto(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_producto VARCHAR(50) UNIQUE NULL,
        descripcion VARCHAR(255) NOT NULL,
        costo DECIMAL(10,2) NOT NULL,
        pvp DECIMAL (10,2) NOT NULL
    );


    CREATE TABLE Proveedor(
        id INT AUTO_INCREMENT PRIMARY KEY,
        razon_social VARCHAR(255) NOT NULL,
        cuit VARCHAR (13),
        nombre_contacto VARCHAR(255) NOT NULL,
        direccion VARCHAR(255) NOT NULL,
        telefono VARCHAR(255) NOT NULL
    );

    CREATE TABLE Cliente(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        cuit VARCHAR (13),
        direccion VARCHAR(255) NOT NULL,
        telefono VARCHAR(255) NOT NULL
    );


    /*Facturaciones*/

    CREATE TABLE FacturaCompra(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_proveedor INT NOT NULL,
        id_tipo_factura INT NOT NULL,
        descuento DECIMAL(10,2) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (id_tipo_factura) REFERENCES Tipo_Factura(id),
        FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id)

    );

    CREATE TABLE DetalleCompra (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_factura_compra INT NOT NULL,
        id_producto INT NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        costo DECIMAL(10,2) NOT NULL,
        cantidad DECIMAL(10,2) NOT NULL,
        descuento DECIMAL(10,2) NOT NULL,

        FOREIGN KEY (id_factura_compra) REFERENCES FacturaCompra(id),
        FOREIGN KEY (id_producto) REFERENCES Producto(id)
        
    );



    CREATE TABLE FacturaVenta(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_cliente INT NOT NULL,
        id_tipo_factura INT NOT NULL,
        descuento DECIMAL(10,2) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (id_tipo_factura) REFERENCES Tipo_Factura(id),
        FOREIGN KEY (id_cliente) REFERENCES Cliente(id)
    );

    CREATE TABLE DetalleVenta (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_factura_venta INT NOT NULL,
        id_producto INT NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        cantidad DECIMAL(10,2) NOT NULL,
        pvp DECIMAL(10,2) NOT NULL,
        descuento DECIMAL(10,2) NOT NULL,

        FOREIGN KEY (id_factura_venta) REFERENCES FacturaVenta(id),
        FOREIGN KEY (id_producto) REFERENCES Producto(id)
        
    );


    CREATE TABLE Pagos_Proveedor(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_factura_compra INT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_tipo_pago VARCHAR(50) NOT NULL,
        monto DECIMAL(10,2) NOT NULL,

        FOREIGN KEY(id_factura_compra) REFERENCES FacturaCompra(id),
        FOREIGN KEY(id_tipo_pago) REFERENCES Tipo_Pago(id)
        
    );

    CREATE TABLE Pagos_Cliente(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_factura_venta INT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_tipo_pago VARCHAR(50) NOT NULL,
        monto DECIMAL(10,2) NOT NULL,

        FOREIGN KEY(id_factura_venta) REFERENCES FacturaVenta(id),
        FOREIGN KEY(id_tipo_pago) REFERENCES Tipo_Pago(id)
        
    );




    /* INVENTARIO*/


    CREATE TABLE Stock(
        id INT AUTO_INCREMENT PRIMARY KEY,
        producto_id INT NOT NULL,
        proveedor_id INT NOT NULL,
        id_producto_proveedor VARCHAR(50) NULL,
        stock_min DECIMAL(10,2) NOT NULL,
        stock DECIMAL(10,2) NOT NULL,
        stock_max DECIMAL(10,2) NOT NULL,

        FOREIGN KEY (producto_id) REFERENCES Producto(id),
        FOREIGN KEY (proveedor_id) REFERENCES Proveedor(id)
    );





    /*BALANCE*/

    CREATE TABLE Activo(
        id INT AUTO_INCREMENT PRIMARY KEY,
        caja DECIMAL(10,2) NOT NULL,
        cuenta_corriente DECIMAL(10,2) NOT NULL,
        banco DECIMAL(10,2) NOT NULL,
        alamacen DECIMAL(10,2) NOT NULL,
        total_activo DECIMAL(10,2) NOT NULL
    );

    CREATE TABLE Pasivo(
        id INT AUTO_INCREMENT PRIMARY KEY,
        proveedores DECIMAL(10,2) NOT NULL,
        credito_bancarios DECIMAL(10,2) NOT NULL,
        cuentas_a_pagar DECIMAL(10,2) NOT NULL,
        total_activo DECIMAL(10,2) NOT NULL
    );

    CREATE TABLE Capital(
        id INT AUTO_INCREMENT PRIMARY KEY,
        capital_social DECIMAL(10,2) NOT NULL,
        ganancia DECIMAL(10,2) NOT NULL,
        total_capital_social DECIMAL(10,2) NOT NULL 
    );

    CREATE TABLE Balance(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_activo INT NOT NULL,
        id_pasivo INT NOT NULL,
        id_capital INT NOT NULL,
        fecha_cierre TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_apertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY(id_activo) REFERENCES Activo(id),
        FOREIGN KEY(id_pasivo) REFERENCES Pasivo(id),
        FOREIGN KEY(id_capital) REFERENCES Capital(id)
        
    );


