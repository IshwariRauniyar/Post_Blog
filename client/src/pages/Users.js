import React from "react";
import { useSelector } from "react-redux";
import { getUser, deleteUser } from "../redux/actions/user.actions";
import { Card, Container, Row, Col } from "react-bootstrap";
import TableWithPagination from "../components/DataTable/TableWithPagination/index";
import Header from "../components/Navbar";

function User() {
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
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <TableWithPagination
                    title="Page"
                    tableData={all_data}
                    total={total}
                    headers={headers}
                    getAction={(custom_props) => getUser({ ...custom_props })}
                    deleteAction={deleteUser}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default User;
