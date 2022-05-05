import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUser, deleteUser } from "../redux/actions/user.actions";
import { Card, Container, Row, Col, Button, Modal } from "react-bootstrap";
import TableWithPagination from "../components/DataTable/TableWithPagination/index";
import Header from "../components/Navbar";
import UserCreateForm from "../components/Form/UserCreateForm";
import UserEditForm from "../components/Form/UserEditForm";

function User() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { users: all_data, total, errors } = useSelector((state) => state.user);

  const headers = [
    {
      name: "FirstName",
      field: "FirstName",
      property: ["FirstName"],
      sortable: false,
    },
    {
      name: "LastName",
      field: "LastName",
      property: ["LastName"],
      sortable: false,
    },
    {
      name: "Email",
      field: "Email",
      property: ["Email"],
    },
    {
      name: "UserName",
      field: "UserName",
      property: ["UserName"],
    },
    {
      name: "UserRole",
      field: "UserRole",
      property: ["UserRole"],
    },
    {
      name: "CreatedOn",
      field: "CreatedOn",
      property: ["CreatedOn"],
      sortable: false,
    },
  ];
  const handleCreateClose = () => setShowCreateModal(false);
  const handleCreateShow = () => setShowCreateModal(true);


  return (
    <>
      <Header />
      {errors.code === 401 ? (
        <div className="alert alert-danger" role="alert">
          {errors.message}
        </div>
      ) : (
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header className="d-flex align-items-center justify-content-between">
                  <Card.Title>User List</Card.Title>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    style={{ float: "right" }}
                    onClick={() => handleCreateShow()}
                  >
                    <i className="fas fa-plus"></i>
                    Add New User
                  </Button>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <TableWithPagination
                    title="Page"
                    tableData={all_data}
                    total={total}
                    headers={headers}
                    getAction={(custom_props) => getUser({ ...custom_props })}
                    deleteAction={deleteUser}
                    EditForm={(custom_props) => (
                      <UserEditForm {...custom_props} />
                    )}
                    actionButtons={["edit", "delete"]}
                  />
                </Card.Body>
                <Modal
                  show={showCreateModal}
                  onHide={handleCreateClose}
                  backdrop="static"
                  keyboard={false}
                  dialogClassName="modal-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* Create Form */}
                    <UserCreateForm close={handleCreateClose} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default User;
