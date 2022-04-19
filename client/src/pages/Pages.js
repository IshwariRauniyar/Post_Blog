import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPage, deletePage } from "../redux/actions/page.actions";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button, Modal } from "react-bootstrap";
import TableWithPagination from "../components/DataTable/TableWithPagination/index";
import PageCreateForm from "../components/Form/PageCreateForm";
import PageEditForm from "../components/Form/PageEditForm";

function Page() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { pages: all_data, total } = useSelector((state) => state.page);
  console.log("pagessss", all_data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headers = [
    {
      name: "Title",
      field: "Title",
      property: ["Title"],
      sortable: false,
    },
    {
      name: "Slug",
      field: "Slug",
      property: ["Slug"],
      sortable: false,
    },
    {
      name: "Status",
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
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex align-items-center justify-content-between">
                <Card.Title>Page List</Card.Title>
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                  style={{ float: "right" }}
                  onClick={() => handleCreateShow()}
                >
                  <i className="fas fa-plus"></i>
                  Add New Page
                </Button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <TableWithPagination
                  title="Page"
                  tableData={all_data}
                  total={total}
                  headers={headers}
                  getAction={(custom_props) => getPage({ ...custom_props })}
                  deleteAction={deletePage}
                  EditForm={(custom_props) => (
                    <PageEditForm {...custom_props} />
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
                  <Modal.Title>Create Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Create Form */}
                  <PageCreateForm close={handleCreateClose} />
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

export default Page;
