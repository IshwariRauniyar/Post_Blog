import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getRole, deleteRole } from "../redux/actions/role.actions";
import { Card, Container, Row, Col, Button, Modal } from "react-bootstrap";
import TableWithPagination from "../components/DataTable/TableWithPagination/index";
import RoleCreateForm from "../components/Form/RoleCreateForm";
import RoleEditForm from "../components/Form/RoleEditForm";
import Header from "../components/Navbar";

function Role() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { roles: all_data, total } = useSelector((state) => state.role);

  const headers = [
    {
      name: "Title",
      field: "Title",
      property: ["Title"],
      sortable: false,
    },
    {
      name: "UniqueName",
      field: "UniqueName",
      property: ["UniqueName"],
      sortable: false,
    },
    {
      name: "Value",
      field: "Value",
      property: ["Value"],
      sortable: false,
    },
    {
      name: "IsActive",
      field: "IsActive",
      property: ["IsActive"],
    },
    {
      name: "CreatedOn",
      field: "CreatedOn",
      property: ["CreatedOn"],
      sortable: false,
    },
    { name: "Actions", field: "actions", property: [], sortable: false },
  ];

  const handleCreateClose = () => setShowCreateModal(false);
  const handleCreateShow = () => setShowCreateModal(true);

  return (
    <>
      <Header />

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex align-items-center justify-content-between">
                <Card.Title>Role List</Card.Title>
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                  style={{ float: "right" }}
                  onClick={() => handleCreateShow()}
                >
                  <i className="fas fa-plus"></i>
                  Add New Role
                </Button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <TableWithPagination
                  title="Role"
                  tableData={all_data}
                  total={total}
                  headers={headers}
                  getAction={(custom_props) => getRole({ ...custom_props })}
                  deleteAction={deleteRole}
                  EditForm={(custom_props) => (
                    <RoleEditForm {...custom_props} />
                  )}
                  actionButtons={["edit", "delete"]}
                />
              </Card.Body>
              {/* Create Modal */}
              <Modal
                show={showCreateModal}
                onHide={handleCreateClose}
                backdrop="static"
                keyboard={false}
                dialogClassName="modal-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Create Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Create Form */}
                  <RoleCreateForm close={handleCreateClose} />
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
    </>
  );
}

export default Role;
