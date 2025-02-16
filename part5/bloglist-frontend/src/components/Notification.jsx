import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <Container className="mt-3">
      <Alert key={notification.type} variant={notification.type}>
        {notification.message}
      </Alert>
    </Container>
  );
};

export default Notification;
