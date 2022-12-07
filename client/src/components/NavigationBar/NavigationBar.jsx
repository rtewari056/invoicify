import { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

import IMAGES from "../../assets"; // Importing images from single "IMAGES" object
import "./NavigationBar.css";
import { AuthState } from "../../context/AuthProvider";
import ProfileModal from "../ProfileModal/ProfileModal";

const NavigationBar = () => {
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = AuthState();

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    return navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" id="nav">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="Advanced Node Authentication Logo"
            src={IMAGES.logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
          &nbsp;<span className="fs-4">Invoicify</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} className={`fs-5 ${location.pathname === "/create"? "active" : ""}`} to="/create">
              Create
            </Nav.Link>
            <Nav.Link as={Link} className={`fs-5 ${location.pathname === "/invoices"? "active" : ""}`} to="/invoices">
              Invoices
            </Nav.Link>
          </Nav>

          <Nav>
            {auth ? (
              <DropdownButton
                variant=""
                align="end"
                title={
                  <Image
                    id="profileDropdownIcon"
                    src={auth.profilePic}
                    alt="Navbar profile image"
                    roundedCircle
                  />
                }
              >
                <Dropdown.Item as="button" onClick={() => setModalShow(true)}>
                  Profile
                </Dropdown.Item>
                <ProfileModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />

                <Dropdown.Divider />

                <Dropdown.Item as="button" onClick={logoutHandler}>
                  Log out
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <Nav.Item>
                <Link to="/login">
                  <Button className="me-2" variant="outline-primary" size="sm">
                    Log in
                  </Button>
                </Link>

                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
