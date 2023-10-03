
import React from "react";
import {Image, Button,Card, CardBody, Divider} from "@nextui-org/react";

export default function Inicio() {
return (
<div className="container-items">


<div>
    
<Card>
      <CardBody >
        <p>DESCUBRE LO NUEVO</p>
      </CardBody>
    </Card>
<Image
      width={200}
      alt="NextUI hero Image"
      src="../src/components/client/inicio/imagenes/pelicula1.jpg"
    />
    <h1>Jesucristo cazador de vampiros</h1>
    <Button color="default" size="sl" radius="lg">
      Comprar boletos
    </Button>
    
    </div>

    <div>
    <Card>
      <CardBody >
        <p>SERA EMOCIONANTE!</p>
      </CardBody>
    </Card>
    <Image
      width={200}
      alt="NextUI hero Image"
      src="../src/components/client/inicio/imagenes/pelicula2.jpg"
    />
    <h1>Sonic la pelicula 2 </h1>
<Button color="default" size="sl"radius="sm">
      Comprar boletos
    </Button>
    </div>

    <div>
    <Card>
      <CardBody >
        <p>Y ENTRETENIDO!</p>
      </CardBody>
    </Card>
    <Image
      width={200}
      alt="NextUI hero Image"
      src="../src/components/client/inicio/imagenes/pelicula3.jpg"
    />
    <h1>Avengers End game </h1>
<Button color="default" size="sl"radius="sm">
      Comprar boletos
    </Button>
    </div>

    <div>
    <Image
      width={200}
      alt="NextUI hero Image"
      src="../src/components/client/inicio/imagenes/pelicula4.jpg"
    />
    <h1>Barbie la pelicula </h1>
<Button color="default" size="sl"radius="sm">
      Comprar Boletos
    </Button>
    </div>
    
    <div>
    <Image
      width={200}
      alt="NextUI hero Image"
      src="../src/components/client/inicio/imagenes/pelicula5.jpg"
    />
    <h1>Tortugas ninja caos mutante</h1>
<Button color="default" size="sl"radius="sm">
      Comprar boletos
    </Button>
    </div>

    <div>
    <Image
      width={200}
      alt="NextUI hero Image"
      src="../src/components/client/inicio/imagenes/pelicula6.jpg"
    />
    <h1>Five Nights At Freddy's  </h1>
<Button color="default" size="sl"radius="sm">
      Comprar Boletos
    </Button>
    </div>

<div> 
<Card>
      <CardBody >
        <p>Que tal algo para degustar?</p>
      </CardBody>
    </Card>
    <Image
      width={300}
      alt="NextUI hero Image"
      src="../src/components/client/inicio/imagenes/anuncio1.png"
    />
    <Button color="default" size="sl"radius="sm">
      Comprar
    </Button>
    </div>
    <div> 
<Card>
      <CardBody >
        <p>Algo refrescante?</p>
      </CardBody>
    </Card>
    <Image
      width={300}
      alt="NextUI hero Image"
      src="../src/components/client/inicio/imagenes/anuncio2.png"
    />
    <Button color="default" size="sl"radius="sm">
      Comprar
    </Button>
    </div>

<div> 
<Card>
      <CardBody >
        <p>Tal vez algo dulce?</p>
      </CardBody>
    </Card>
    <Image
      width={330}
      alt="NextUI hero Image"
      src="../src/components/client/inicio/imagenes/anuncio3.png"
    />
    <Button color="default" size="sl"radius="sm">
      Comprar
    </Button>
    </div>

    <footer>
        <p>&copy; 2023 CineFlash. Todos los derechos reservados.</p>
    </footer>
</div>


);
}