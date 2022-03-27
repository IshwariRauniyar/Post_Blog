import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPost,
  getSinglePost,
  deletePost,
} from "../redux/actions/post.actions";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button, Modal } from "react-bootstrap";
import TableWithPagination from "../components/DataTable/TableWithPagination/index";
import PostCreateForm from "../components/Form/PostCreateForm";
// import ArticleEditForm from "components/form/Articles/ArticleEditForm";
import moment from "moment";

function dateToString(x) {
  return moment(x).format("YYYY-MM-DD");
}

function Article() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { post: all_data } = useSelector((state) => state.post);
  console.log("all_data", all_data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headers = [
    { name: "Id", field: "_id", property: ["_id"], sortable: false },
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
      field: "status",
      property: ["IsActive"],
      sortable: false,
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
      {/* <Card>
        <Card.Header as="h5">Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card> */}

      <Container fluid="md">
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Card className="mt-3">
              <Card.Header>
                <Card.Title>Post List</Card.Title>
                <Button
                  // className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                  style={{ float: "right" }}
                  onClick={() => handleCreateShow()}
                >
                  <i className="fas fa-plus"></i>
                  Add New Post
                </Button>
              </Card.Header>
              <Card.Body>
                <TableWithPagination
                  title="Post"
                  tableData={all_data}
                  apiUrl="post"
                  headers={headers}
                  getAction={(custom_props) => getPost({ ...custom_props })}
                  deleteAction={deletePost}
                  // EditForm={(custom_props) => (
                  //   <PostEditForm {...custom_props} />
                  // )}
                  actionButtons={["edit", "delete"]}
                  // onView={(id) => {
                  //   history.push(`/admin/Profile/${id}`);
                  // navigate('/home');
                  // }}
                />
              </Card.Body>
              {/* Create Modal */}
              <Modal
                show={showCreateModal}
                onHide={handleCreateClose}
                dialogClassName="modal-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Create Form
                  <PostCreateForm close={handleCreateClose} />
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

export default Article;
