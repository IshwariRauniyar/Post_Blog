import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/user.actions";
import { getRole } from "../../redux/actions/role.actions";
import { Form } from "react-bootstrap";

const UserEditForm = ({ editState, close }) => {
    const dispatch = useDispatch();
    const roles = useSelector((state) => state.role.roles);
    const [paramid] = useState(editState._id);
    const [firstName, setFirstName] = useState(editState.FirstName || "");
    const [lastName, setLastName] = useState(editState.LastName || "");
    const [userName, setUserName] = useState(editState.UserName || "");
    const [email, setEmail] = useState(editState.Email || "");
    const [userRole, setUserRole] = useState(editState.UserRole || "");
    const onclose = close;
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            FirstName: firstName,
            LastName: lastName,
            UserName: userName,
            Email: email,
            UserRole: userRole,
        };
        dispatch(updateUser(paramid, newUser));
        onclose();
    };

    useEffect(() => {
        dispatch(getRole({}));
    }, []);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block mb-2 text-2xl font-medium"> FirstName</label>
                    <input
                        className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value) }}
                        placeholder="Enter FirstName"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-2xl font-medium"> LastName</label>
                    <input
                        className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                        placeholder="Enter Last Name"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-2xl font-medium"> UserName</label>
                    <input
                        className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value) }}
                        placeholder="Enter UserName"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-2xl font-medium"> Email Address</label>
                    <input
                        className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder="Enter your valid email address"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-2xl font-medium"> User Role</label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select" value={userRole} required onChange={(e) => { setUserRole(e.target.value) }}>
                            <option value="">Select User Role</option>
                            {roles.map((role, i) => (
                                <option key={`item-${i}`} value={role.id}>
                                    {role.Title}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
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

export default UserEditForm;
