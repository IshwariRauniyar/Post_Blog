import React, { useState, useEffect, useMemo } from "react";
import { TableHeader, Pagination, Search } from "..";
import { Button, Table, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import moment from "moment";

export default function TableWithPagination({
  hideSearch = false,
  total,
  tableData,
  getAction,
  deleteAction,
  headers,
  EditForm,
  title,
  actionButtons,
}) {
  const [editData, setEditData] = useState();
  const [deleteTableData, setDeleteTableData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  function dateToString(CreatedOn) {
    return moment(CreatedOn).format("YYYY-MM-DD");
  }

  //mapping the value according to the property and return the data
  function nestedObj(array, object) {
    if (object && array?.length) {
      let data = object;
      for (let x = 0; array?.length > x; x++) {
        data = data?.[array[x]];
        if (array?.length === x + 1) {
          if (array[x] === "IsActive") {
            return data ? "Active" : "Inactive";
          }
          if (array[x] === "CreatedOn") {
            return dateToString(data);
          }

          return data;
        }
      }
    }
  }

  const handleClose = () => setShowModal(false);
  const handleDeleteShow = (id) => {
    setShowModal(true);
    const deleteData = tableData.filter((data) => data._id === id);
    setDeleteTableData(deleteData);
  };

  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = (id) => {
    setShowEditModal(true);
    const viewData = tableData.filter((data) => data?._id === id);
    setEditData(viewData[0]);
  };

  function deleteSingle(id) {
    deleteAction && dispatch(deleteAction(id));
    handleClose();
  }

  useEffect(() => {
    getAction && dispatch(getAction({ offset: skip, search }));
  }, [skip, search]);

  useEffect(() => {
    if (currentPage) {
      setSkip(currentPage - 1);
    }
  }, [currentPage]);

  const ITEMS_PER_PAGE = 10;

  const allData = useMemo(() => {
    let computedData = tableData?.length ? tableData : [];
    // const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    // const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    return computedData;
  }, [tableData, skip]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mx-3">
        {!hideSearch ? (
          <div className="d-flex flex-row-rever">
            <Search
              onSearch={(value) => {
                setSearch(value);
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <Table
        id="example"
        className="table-hover table-striped"
        responsive="md"
        // striped
        // bordered
        // hover
        // id="example"
        // className="table-hover table-striped"
      >
        <TableHeader headers={headers} />

        <tbody>
          {allData &&
            allData?.map((data) => {
              return (
                <tr key={data?._id}>
                  {headers &&
                    headers.map((val, i) => {
                      return val?.property?.length ? (
                        <td style={{ wordBreak: "break-word" }} key={i}>
                          {nestedObj(val?.property, data)}
                        </td>
                      ) : null;
                    })}
                  <td>
                    {actionButtons &&
                      actionButtons.map((val, i) => {
                        switch (val) {
                          case "edit":
                            return (
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="info"
                                onClick={() => handleEditShow(data._id)}
                                key={i}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            );
                          case "delete":
                            return (
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                                onClick={() => handleDeleteShow(data._id)}
                                key={i}
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            );
                          default:
                            break;
                        }
                      })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={total}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* delete Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName="modal-lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to permanently delete "
          {deleteTableData && deleteTableData[0]?.Title}" ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteSingle(deleteTableData[0]._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit {title}</Modal.Title>
        </Modal.Header>
        {EditForm && (
          <>
            <Modal.Body>
              {/* Edit Form */}
              <EditForm editState={editData} close={handleEditClose} />
            </Modal.Body>
          </>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
