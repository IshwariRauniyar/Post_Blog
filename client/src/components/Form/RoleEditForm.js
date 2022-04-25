import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateRole } from "../../redux/actions/role.actions";
import { Form } from "react-bootstrap";

const SettingEditForm = ({ editState, close }) => {
  const dispatch = useDispatch();
  const [paramid] = useState(editState._id);
  const [title, setTitle] = useState(editState.Title || "");
  const [uniqueName, setUniqueName] = useState(editState.UniqueName || "");
  const [menu, setMenu] = useState(JSON.parse(editState.Value || ""));
  const [IsActive, setIsActive] = useState(editState?.IsActive || Boolean);
  const onclose = close;
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRole = {
      Title: title,
      UniqueName: uniqueName,
      Value: JSON.stringify(menu),
      IsActive: IsActive,
    };
    dispatch(updateRole(paramid, newRole));
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
          <fieldset className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded">
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="page"
                name="page"
                checked={menu.includes("page")}
                onChange={(e) => {
                  if (menu.includes("page")) {
                    setMenu(menu.filter((item) => item !== "page"));
                  } else {
                    setMenu([...menu, "page"]);
                  }
                }}
              />
              <Form.Check
                type="checkbox"
                checked={menu.includes("post")}
                label="post"
                name="post"
                onChange={(e) => {
                  if (menu.includes("post")) {
                    setMenu(menu.filter((item) => item !== "post"));
                  } else {
                    setMenu([...menu, "post"]);
                  }
                }}
              />
              <Form.Check
                type="checkbox"
                checked={menu.includes("user")}
                label="user"
                name="user"
                onChange={(e) => {
                  if (menu.includes("user")) {
                    setMenu(menu.filter((item) => item !== "user"));
                  } else {
                    setMenu([...menu, "user"]);
                  }
                }}
              />
              <Form.Check
                type="checkbox"
                checked={menu.includes("role")}
                label="role"
                name="role"
                onChange={(e) => {
                  if (menu.includes("role")) {
                    setMenu(menu.filter((item) => item !== "role"));
                  } else {
                    setMenu([...menu, "role"]);
                  }
                }}
              />
            </Form.Group>
          </fieldset>
        </div>

        <label className="block mb-2 text-2xl font-medium">IsActive</label>
        <div className="inline-block relative w-full">
          <label className="block absolute inset-y-0 left-0 flex items-center pl-3">
            <input
              type="checkbox"
              checked={IsActive}
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

export default SettingEditForm;
