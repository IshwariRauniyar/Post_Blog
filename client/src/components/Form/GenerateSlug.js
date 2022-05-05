import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const GenerateSlug = ({
    slugData,
    setNewSlug,
    value,
}) => {
    const [show, setShow] = useState(false);
    const [transformSlug, setTransformSlug] = useState("");
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleSlug = (text) => {
        const slug = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
        setTransformSlug(slug);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setShow(false);
        setNewSlug(transformSlug);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Change Slug
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Generate Slug</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail"
                        className="mb-3">
                        <Form.Label>Existing Slug</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Existing Slug"
                            value={slugData}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>New Slug</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="New Slug"
                            value={transformSlug}
                            onChange={(e) => handleSlug(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleChange}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default GenerateSlug;