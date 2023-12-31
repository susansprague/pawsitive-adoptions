import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import useState from "react";

function AppPetCards({pet}) {

  return (
    <Card style={{ width: '18rem', height: '25rem' } }>
      <Card.Img variant="top" src={pet?.primary_photo_cropped?.small ? pet?.primary_photo_cropped?.small : "https://placehold.co/600x400"} />
      <Card.Body>
        <Card.Title>{pet?.name}</Card.Title>
        <Card.Text>
         {pet?.breeds?.primary},
         {pet?.age},
        </Card.Text>
        <Button variant="primary" href={pet?.url}>View</Button>
      </Card.Body>
    </Card>
  );
}

export default AppPetCards;