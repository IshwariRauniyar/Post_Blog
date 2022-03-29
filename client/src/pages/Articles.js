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
import PostEditForm from "../components/Form/PostEditForm";
// import ArticleEditForm from "components/form/Articles/ArticleEditForm";
import moment from "moment";

function dateToString(CreatedOn) {
  return moment(CreatedOn).format("YYYY-MM-DD");
}

function Article() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { posts: all_data } = useSelector((state) => state.post);
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
      name: "Order No.",
      field: "  Order",
      property: ["Order"],
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
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex align-items-center justify-content-between">
                <Card.Title as="h4">Post List</Card.Title>
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                  style={{ float: "right" }}
                  onClick={() => handleCreateShow()}
                >
                  <i className="fas fa-plus"></i>
                  Add New Post
                </Button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <TableWithPagination
                  title="Post"
                  tableData={all_data}
                  apiUrl="post"
                  headers={headers}
                  getAction={(custom_props) => getPost({ ...custom_props })}
                  deleteAction={deletePost}
                  EditForm={(custom_props) => (
                    <PostEditForm {...custom_props} />
                  )}
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
                  {/* Create Form */}
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
