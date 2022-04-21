import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRole } from "../../redux/actions/role.actions";
import { Form } from "react-bootstrap";

const SettingCreateForm = ({ close }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [uniqueName, setUniqueName] = useState("");
  const [menu, setMenu] = useState([]);
  const [IsActive, setIsActive] = useState(Boolean);
  const onclose = close;
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRole = {
      Title: title,
      UniqueName: uniqueName,
      Value: menu,
      IsActive: IsActive,
    };
    console.log(newRole);
    dispatch(createRole(newRole));
    onclose();
  };
  const handleChangeSwitch = (IsActive) => {
    setIsActive(!IsActive);
  };

  const slugify = (text) => {
    const sl = text;
    setUniqueName(sl);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium"> Title</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            type="text"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              slugify(e.target.value);
            }}
            placeholder="Enter title"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium">
            {" "}
            Unique Name
          </label>
          <input
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            type="text"
            name="uniqueName"
            readOnly
            value={uniqueName}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium"> Value</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            type="text"
            required
            value={menu}
            onChange={(e) => setMenu(e.target.value)}
            placeholder="Enter Value of Menu"
          />
        </div>

        <label className="block mb-2 text-2xl font-medium">IsActive</label>
        <div className="inline-block relative w-full">
          <label className="block absolute inset-y-0 left-0 flex items-center pl-3">
            <input
              type="checkbox"
              value={IsActive}
              onChange={() => handleChangeSwitch(IsActive)}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-lg text-gray-900">Is Active</span>
          </label>
        </div>

        <div className="mt-7">
          <div className="flex justify-start space-x-2">
            <button
              type="submit"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-2xl hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SettingCreateForm;
