import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import useState from "react";
import useEffect  from "react";

function AppPetCards() {
   // const [petData, setPetData] = useState ([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('PETFINDER API')
            const petDataJson = await response.json()
            console.log(petDataJson)
          // setPetData(petDataJson.slice(0, 15))
        }
        fetchData()
    }, [])
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          sample text
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default AppPetCards;