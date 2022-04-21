import React, { useState } from "react";

import { Button, Modal } from "react-bootstrap";
import PostCreateForm from "../components/Form/PostCreateForm";

export default function Table() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateClose = () => setShowCreateModal(false);
  const handleCreateShow = () => setShowCreateModal(true);

  return (
    <>
      <div className="px-4">
        <div className="flex justify-start px-2 mt-11 lg:mt-11">
          <Button
            className="px-4 py-2 text-gray-100 bg-blue-600 rounded"
            type="submit"
            variant="info"
            style={{ float: "right" }}
            onClick={() => handleCreateShow()}
          >
            <i className="fas fa-plus"></i>
            Add New Post
          </Button>
        </div>

        {/* Create Modal */}
        <Modal
          show={showCreateModal}
          onHide={handleCreateClose}
          //   dialogClassName="modal-lg"
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
        <div className="pt-6 bg-white rounded shadow my-11" id="table1">
          <div className="px-6 border-b">
            <div className="flex flex-wrap items-center mb-6">
              <h3 className="text-xl font-bold">All items</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-xs text-left text-gray-500">
                  <th className="flex items-center py-4 pl-6 font-medium">
                    <input className="mr-3" type="checkbox" name="" id="" />
                    <a className="flex items-center" href="#">
                      <span>S.N </span>
                      <span className="ml-2">
                        <svg
                          width={9}
                          height={12}
                          viewBox="0 0 9 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.85957 7.52667L4.99957 10.3933L2.13957 7.52667C2.01403 7.40114 1.84377 7.33061 1.66623 7.33061C1.4887 7.33061 1.31843 7.40114 1.1929 7.52667C1.06736 7.65221 0.996837 7.82247 0.996837 8.00001C0.996837 8.17754 1.06736 8.3478 1.1929 8.47334L4.52623 11.8067C4.65114 11.9308 4.82011 12.0005 4.99623 12.0005C5.17236 12.0005 5.34132 11.9308 5.46623 11.8067L8.79957 8.47334C8.86173 8.41118 8.91103 8.33739 8.94467 8.25617C8.97831 8.17496 8.99563 8.08791 8.99563 8.00001C8.99563 7.9121 8.97831 7.82505 8.94467 7.74384C8.91103 7.66262 8.86173 7.58883 8.79957 7.52667C8.73741 7.46451 8.66361 7.41521 8.5824 7.38157C8.50118 7.34793 8.41414 7.33061 8.32623 7.33061C8.23833 7.33061 8.15128 7.34793 8.07007 7.38157C7.98885 7.41521 7.91506 7.46451 7.8529 7.52667H7.85957ZM2.13957 4.47334L4.99957 1.60667L7.85957 4.47334C7.98447 4.59751 8.15344 4.6672 8.32957 4.6672C8.50569 4.6672 8.67466 4.59751 8.79957 4.47334C8.92373 4.34843 8.99343 4.17946 8.99343 4.00334C8.99343 3.82722 8.92373 3.65825 8.79957 3.53334L5.46623 0.200006C5.40426 0.137521 5.33052 0.0879247 5.24928 0.0540789C5.16804 0.0202331 5.08091 0.00280762 4.9929 0.00280762C4.90489 0.00280762 4.81775 0.0202331 4.73651 0.0540789C4.65527 0.0879247 4.58154 0.137521 4.51957 0.200006L1.18623 3.53334C1.06158 3.65976 0.992254 3.83052 0.993504 4.00805C0.994754 4.18559 1.06648 4.35535 1.1929 4.48001C1.31932 4.60466 1.49008 4.67398 1.66761 4.67273C1.84515 4.67148 2.01491 4.59976 2.13957 4.47334Z"
                            fill="#67798E"
                          />
                        </svg>
                      </span>
                    </a>
                  </th>
                  <th className="py-4 font-medium">
                    <a className="flex items-center" href="#">
                      <span>Field Name</span>
                      <span className="ml-2">
                        <svg
                          width={9}
                          height={12}
                          viewBox="0 0 9 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.85957 7.52667L4.99957 10.3933L2.13957 7.52667C2.01403 7.40114 1.84377 7.33061 1.66623 7.33061C1.4887 7.33061 1.31843 7.40114 1.1929 7.52667C1.06736 7.65221 0.996837 7.82247 0.996837 8.00001C0.996837 8.17754 1.06736 8.3478 1.1929 8.47334L4.52623 11.8067C4.65114 11.9308 4.82011 12.0005 4.99623 12.0005C5.17236 12.0005 5.34132 11.9308 5.46623 11.8067L8.79957 8.47334C8.86173 8.41118 8.91103 8.33739 8.94467 8.25617C8.97831 8.17496 8.99563 8.08791 8.99563 8.00001C8.99563 7.9121 8.97831 7.82505 8.94467 7.74384C8.91103 7.66262 8.86173 7.58883 8.79957 7.52667C8.73741 7.46451 8.66361 7.41521 8.5824 7.38157C8.50118 7.34793 8.41414 7.33061 8.32623 7.33061C8.23833 7.33061 8.15128 7.34793 8.07007 7.38157C7.98885 7.41521 7.91506 7.46451 7.8529 7.52667H7.85957ZM2.13957 4.47334L4.99957 1.60667L7.85957 4.47334C7.98447 4.59751 8.15344 4.6672 8.32957 4.6672C8.50569 4.6672 8.67466 4.59751 8.79957 4.47334C8.92373 4.34843 8.99343 4.17946 8.99343 4.00334C8.99343 3.82722 8.92373 3.65825 8.79957 3.53334L5.46623 0.200006C5.40426 0.137521 5.33052 0.0879247 5.24928 0.0540789C5.16804 0.0202331 5.08091 0.00280762 4.9929 0.00280762C4.90489 0.00280762 4.81775 0.0202331 4.73651 0.0540789C4.65527 0.0879247 4.58154 0.137521 4.51957 0.200006L1.18623 3.53334C1.06158 3.65976 0.992254 3.83052 0.993504 4.00805C0.994754 4.18559 1.06648 4.35535 1.1929 4.48001C1.31932 4.60466 1.49008 4.67398 1.66761 4.67273C1.84515 4.67148 2.01491 4.59976 2.13957 4.47334Z"
                            fill="#67798E"
                          />
                        </svg>
                      </span>
                    </a>
                  </th>
                  <th className="py-4 font-medium">
                    <a className="flex items-center" href="#">
                      <span>Field Type</span>
                      <span className="ml-2">
                        <svg
                          width={9}
                          height={12}
                          viewBox="0 0 9 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.85957 7.52667L4.99957 10.3933L2.13957 7.52667C2.01403 7.40114 1.84377 7.33061 1.66623 7.33061C1.4887 7.33061 1.31843 7.40114 1.1929 7.52667C1.06736 7.65221 0.996837 7.82247 0.996837 8.00001C0.996837 8.17754 1.06736 8.3478 1.1929 8.47334L4.52623 11.8067C4.65114 11.9308 4.82011 12.0005 4.99623 12.0005C5.17236 12.0005 5.34132 11.9308 5.46623 11.8067L8.79957 8.47334C8.86173 8.41118 8.91103 8.33739 8.94467 8.25617C8.97831 8.17496 8.99563 8.08791 8.99563 8.00001C8.99563 7.9121 8.97831 7.82505 8.94467 7.74384C8.91103 7.66262 8.86173 7.58883 8.79957 7.52667C8.73741 7.46451 8.66361 7.41521 8.5824 7.38157C8.50118 7.34793 8.41414 7.33061 8.32623 7.33061C8.23833 7.33061 8.15128 7.34793 8.07007 7.38157C7.98885 7.41521 7.91506 7.46451 7.8529 7.52667H7.85957ZM2.13957 4.47334L4.99957 1.60667L7.85957 4.47334C7.98447 4.59751 8.15344 4.6672 8.32957 4.6672C8.50569 4.6672 8.67466 4.59751 8.79957 4.47334C8.92373 4.34843 8.99343 4.17946 8.99343 4.00334C8.99343 3.82722 8.92373 3.65825 8.79957 3.53334L5.46623 0.200006C5.40426 0.137521 5.33052 0.0879247 5.24928 0.0540789C5.16804 0.0202331 5.08091 0.00280762 4.9929 0.00280762C4.90489 0.00280762 4.81775 0.0202331 4.73651 0.0540789C4.65527 0.0879247 4.58154 0.137521 4.51957 0.200006L1.18623 3.53334C1.06158 3.65976 0.992254 3.83052 0.993504 4.00805C0.994754 4.18559 1.06648 4.35535 1.1929 4.48001C1.31932 4.60466 1.49008 4.67398 1.66761 4.67273C1.84515 4.67148 2.01491 4.59976 2.13957 4.47334Z"
                            fill="#67798E"
                          />
                        </svg>
                      </span>
                    </a>
                  </th>
                  <th className="py-4 font-medium">
                    <a className="flex items-center" href="#">
                      <span>Order</span>
                      <span className="ml-2">
                        <svg
                          width={9}
                          height={12}
                          viewBox="0 0 9 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.85957 7.52667L4.99957 10.3933L2.13957 7.52667C2.01403 7.40114 1.84377 7.33061 1.66623 7.33061C1.4887 7.33061 1.31843 7.40114 1.1929 7.52667C1.06736 7.65221 0.996837 7.82247 0.996837 8.00001C0.996837 8.17754 1.06736 8.3478 1.1929 8.47334L4.52623 11.8067C4.65114 11.9308 4.82011 12.0005 4.99623 12.0005C5.17236 12.0005 5.34132 11.9308 5.46623 11.8067L8.79957 8.47334C8.86173 8.41118 8.91103 8.33739 8.94467 8.25617C8.97831 8.17496 8.99563 8.08791 8.99563 8.00001C8.99563 7.9121 8.97831 7.82505 8.94467 7.74384C8.91103 7.66262 8.86173 7.58883 8.79957 7.52667C8.73741 7.46451 8.66361 7.41521 8.5824 7.38157C8.50118 7.34793 8.41414 7.33061 8.32623 7.33061C8.23833 7.33061 8.15128 7.34793 8.07007 7.38157C7.98885 7.41521 7.91506 7.46451 7.8529 7.52667H7.85957ZM2.13957 4.47334L4.99957 1.60667L7.85957 4.47334C7.98447 4.59751 8.15344 4.6672 8.32957 4.6672C8.50569 4.6672 8.67466 4.59751 8.79957 4.47334C8.92373 4.34843 8.99343 4.17946 8.99343 4.00334C8.99343 3.82722 8.92373 3.65825 8.79957 3.53334L5.46623 0.200006C5.40426 0.137521 5.33052 0.0879247 5.24928 0.0540789C5.16804 0.0202331 5.08091 0.00280762 4.9929 0.00280762C4.90489 0.00280762 4.81775 0.0202331 4.73651 0.0540789C4.65527 0.0879247 4.58154 0.137521 4.51957 0.200006L1.18623 3.53334C1.06158 3.65976 0.992254 3.83052 0.993504 4.00805C0.994754 4.18559 1.06648 4.35535 1.1929 4.48001C1.31932 4.60466 1.49008 4.67398 1.66761 4.67273C1.84515 4.67148 2.01491 4.59976 2.13957 4.47334Z"
                            fill="#67798E"
                          />
                        </svg>
                      </span>
                    </a>
                  </th>
                  <th className="py-4 font-medium">
                    <a className="flex items-center" href="#">
                      <span>Action</span>
                      <span className="ml-2">
                        <svg
                          width={9}
                          height={12}
                          viewBox="0 0 9 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.85957 7.52667L4.99957 10.3933L2.13957 7.52667C2.01403 7.40114 1.84377 7.33061 1.66623 7.33061C1.4887 7.33061 1.31843 7.40114 1.1929 7.52667C1.06736 7.65221 0.996837 7.82247 0.996837 8.00001C0.996837 8.17754 1.06736 8.3478 1.1929 8.47334L4.52623 11.8067C4.65114 11.9308 4.82011 12.0005 4.99623 12.0005C5.17236 12.0005 5.34132 11.9308 5.46623 11.8067L8.79957 8.47334C8.86173 8.41118 8.91103 8.33739 8.94467 8.25617C8.97831 8.17496 8.99563 8.08791 8.99563 8.00001C8.99563 7.9121 8.97831 7.82505 8.94467 7.74384C8.91103 7.66262 8.86173 7.58883 8.79957 7.52667C8.73741 7.46451 8.66361 7.41521 8.5824 7.38157C8.50118 7.34793 8.41414 7.33061 8.32623 7.33061C8.23833 7.33061 8.15128 7.34793 8.07007 7.38157C7.98885 7.41521 7.91506 7.46451 7.8529 7.52667H7.85957ZM2.13957 4.47334L4.99957 1.60667L7.85957 4.47334C7.98447 4.59751 8.15344 4.6672 8.32957 4.6672C8.50569 4.6672 8.67466 4.59751 8.79957 4.47334C8.92373 4.34843 8.99343 4.17946 8.99343 4.00334C8.99343 3.82722 8.92373 3.65825 8.79957 3.53334L5.46623 0.200006C5.40426 0.137521 5.33052 0.0879247 5.24928 0.0540789C5.16804 0.0202331 5.08091 0.00280762 4.9929 0.00280762C4.90489 0.00280762 4.81775 0.0202331 4.73651 0.0540789C4.65527 0.0879247 4.58154 0.137521 4.51957 0.200006L1.18623 3.53334C1.06158 3.65976 0.992254 3.83052 0.993504 4.00805C0.994754 4.18559 1.06648 4.35535 1.1929 4.48001C1.31932 4.60466 1.49008 4.67398 1.66761 4.67273C1.84515 4.67148 2.01491 4.59976 2.13957 4.47334Z"
                            fill="#67798E"
                          />
                        </svg>
                      </span>
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-xs bg-gray-50">
                  <td className="flex items-center px-6 py-5 font-medium">
                    <input className="mr-3" type="checkbox" name="" id="" />
                    <p>01</p>
                  </td>
                  <td className="font-medium">Enterprise</td>
                  <td className="font-medium">Product</td>
                  <td>1001</td>
                  <td>
                    <div className="flex ">
                      <div className="mr-2">
                        <a
                          href=""
                          className="px-4 py-2 text-xs text-gray-100 bg-blue-600 rounded-md"
                        >
                          Edit
                        </a>
                      </div>
                      <div className="">
                        <a
                          href=""
                          className="px-4 py-2 text-xs text-white bg-red-600 rounded-md"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-xs">
                  <td className="flex items-center px-6 py-5 font-medium">
                    <input className="mr-3" type="checkbox" name="" id="" />
                    <p>02</p>
                  </td>
                  <td className="font-medium">system analysis</td>
                  <td className="font-medium">Resources</td>
                  <td>2093</td>
                  <td>
                    <div className="flex flex-wrap ">
                      <div className="mr-2">
                        <a
                          href=""
                          className="px-4 py-2 text-xs text-gray-100 bg-blue-600 rounded-md"
                        >
                          Edit
                        </a>
                      </div>
                      <div className="">
                        <a
                          href=""
                          className="px-4 py-2 text-xs text-white bg-red-600 rounded-md"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-xs bg-gray-50">
                  <td className="flex items-center px-6 py-5 font-medium">
                    <input className="mr-3" type="checkbox" name="" id="" />
                    <p>03</p>
                  </td>
                  <td className="font-medium">Design analysis</td>
                  <td className="font-medium">Analysis</td>
                  <td>1293</td>
                  <td>
                    <div className="flex flex-wrap ">
                      <div className="mr-2">
                        <a
                          href=""
                          className="px-4 py-2 text-xs text-gray-100 bg-blue-600 rounded-md"
                        >
                          Edit
                        </a>
                      </div>
                      <div className="">
                        <a
                          href=""
                          className="px-4 py-2 text-xs text-white bg-red-600 rounded-md"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-xs">
                  <td className="flex items-center px-6 py-5 font-medium">
                    <input className="mr-3" type="checkbox" name="" id="" />
                    <p>04</p>
                  </td>
                  <td className="font-medium">Architecture analysis</td>
                  <td className="font-medium">Design</td>
                  <td>2532</td>
                  <td>
                    <div className="flex flex-wrap ">
                      <div className="mr-2">
                        <a
                          href=""
                          className="px-4 py-2 text-xs text-gray-100 bg-blue-600 rounded-md"
                        >
                          Edit
                        </a>
                      </div>
                      <div className="">
                        <a
                          href=""
                          className="px-4 py-2 text-xs text-white bg-red-600 rounded-md"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-xs bg-gray-50">
                  <td className="flex items-center px-6 py-5 font-medium">
                    <input className="mr-3" type="checkbox" name="" id="" />
                    <p>05</p>
                  </td>
                  <td className="font-medium">system analysis</td>
                  <td className="font-medium">Laptop </td>
                  <td>1233</td>
                  <td>
                    <div className="flex flex-wrap ">
                      <div className="mr-2">
                        <a
                          href=""
                          className="px-4 py-2 text-xs text-gray-100 bg-blue-600 rounded-md"
                        >
                          Edit
                        </a>
                      </div>
                      <div className="">
                        <a
                          href=""
                          className="px-4 py-2 text-xs text-white bg-red-600 rounded-md"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
