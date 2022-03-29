import React, { useState, useEffect, useMemo } from "react";
import { TableHeader, Pagination, Search } from "..";
import { Button, Table, Modal, Breadcrumb } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function TableWithPagination({
  hideSearch = false,
  total,
  tableData,
  getAction,
  deleteAction,
  headers,
  EditForm,
  title,
  onView,
  actionButtons,
  handleBuy,
  deps = [],
}) {
  const [editData, setEditData] = useState();
  const [deleteTableUser, setDeleteTableUser] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  function nestedObj(array, object) {
    if (object && array?.length) {
      let data = object;
      for (let x = 0; array?.length > x; x++) {
        data = data?.[array[x]];
        if (array?.length === x + 1) {
          return data;
        }
      }
    }
  }

  const handleClose = () => setShowModal(false);
  const handleDeleteShow = (id) => {
    setShowModal(true);
    const deleteUsers = tableData.filter((data) => data._id === id);
    setDeleteTableUser(deleteUsers);
  };

  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = (id) => {
    setShowEditModal(true);
    setShowViewModal(false);
    const viewData = tableData.filter((data) => data?._id === id);
    setEditData(viewData[0]);
  };
  const handleViewClose = () => setShowViewModal(false);
  const handleViewShow = (_id) => {
    onView(_id);
  };

  function deleteSingle(id) {
    deleteAction && dispatch(deleteAction(id));
    handleClose();
  }

  useEffect(() => {
    getAction && dispatch(getAction());
  }, []);
  //   getAction && dispatch(getAction({ offset: skip, limit, search }));
  // }, [limit, skip, search, ...deps]);

  useEffect(() => {
    if (tableData?.length > 10) {
      setSkip(currentPage - 2);
    }
    if (currentPage) {
      setSkip(currentPage - 1);
    }
  }, [currentPage, tableData]);

  const ITEMS_PER_PAGE = 10;
  const nextPage = () => {
    let pageSize = ITEMS_PER_PAGE;
    setLimit(pageSize);
  };

  const allData = useMemo(() => {
    let computedData = tableData?.length ? tableData : [];

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = tableData.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    return computedData;
  }, [tableData, sorting, currentPage]);
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mx-3">
        <div>
          <Pagination
            total={total}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            nextPage={nextPage}
          />
        </div>

        {/* {!hideSearch ? (
          <div className="d-flex flex-row-rever">
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>
        ) : (
          ""
        )} */}
      </div>
      <Table
        striped
        bordered
        hover
        id="example"
        className="table-hover table-striped"
      >
        <TableHeader
          headers={headers}
          onSorting={(field, order) => setSorting({ field, order })}
        />

        <tbody>
          {allData &&
            allData?.map((data) => {
              return (
                <tr key={data?._id}>
                  {headers &&
                    headers.map((val, i) => {
                      return val?.property?.length ? (
                        <td key={i}>{nestedObj(val?.property, data)}</td>
                      ) : null;
                    })}
                  <td>
                    {actionButtons &&
                      actionButtons.map((val, i) => {
                        switch (val) {
                          case "view":
                            return (
                              <Button
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                type="button"
                                variant="primary"
                                onClick={() => handleViewShow(data._id)}
                                key={i}
                              >
                                <i className="fas fa-eye"></i>
                              </Button>
                            );
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
                          case "buy":
                            return (
                              <Button
                                className="btn-secondary px-4 py-1 mx-2"
                                type="button"
                                variant="success"
                                onClick={() => handleBuy && handleBuy(data._id)}
                                key={i}
                              >
                                BUY
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

      {/* delete Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        // dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to permanently delete "
          {deleteTableUser && deleteTableUser[0]?.name}" ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteSingle(deleteTableUser[0]._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={handleEditClose}
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

      {/* View Modal */}
      <Modal show={showViewModal} onHide={handleViewClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title} Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* View Form */}
          {/* <CreateForm createState={viewUser} close={handleViewClose} /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            // onClick={() => handleEditShow(data[0]._id)}
            // onClick={() => handleEditShow(viewUser[0]._id)}
          >
            Update
          </Button>
          <Button variant="secondary" onClick={handleViewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
