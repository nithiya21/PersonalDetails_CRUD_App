import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Table, Container, Row, Col } from "react-bootstrap";

export default function PersonalDetails() {
    const [data, setData] = useState({ name: "", email: "", phone: "", dob: "", address: "" });
    const [users, setUsers] = useState(() => {
        return JSON.parse(localStorage.getItem("users")) || [];
    });
    const [editIndex, setEditIndex] = useState(null);

    // Save users to localStorage whenever users change
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    // Handle input change
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Handle Add / Update button
    const handleAddOrUpdate = (e) => {
        e.preventDefault();
        if (!data.name || !data.email || !data.phone || !data.dob || !data.address) {
            alert("Please fill all fields!");
            return;
        }

        if (editIndex !== null) {
            // Update existing user
            const confirmUpdate = window.confirm("Are you sure you want to update this user's details?");
            if (!confirmUpdate) return;
            const updatedUsers = [...users];
            updatedUsers[editIndex] = data;
            setUsers(updatedUsers);
            setEditIndex(null);
            alert("User details updated successfully!");

        } else {
            // Add new user
            setUsers([...users, data]);
            alert("New user added successfully!");

        }

        // Reset form
        setData({ name: "", email: "", phone: "", dob: "", address: "" });
    };

    // Handle edit button click
    const handleEdit = (index) => {
        setData(users[index]);
        setEditIndex(index);
    };

    //Handle delete button click
    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user's details?");
        if (!confirmDelete) return;
        const filteredUsers = users.filter((_, i) => i !== index);
        setUsers(filteredUsers);
        alert("User deleted successfully!");

    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">Personal Details</h2>

            <Form onSubmit={handleAddOrUpdate}>
                <Row className="mb-3">
                    <Col sm={6} md={6}>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Your full name" value={data.name} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col sm={6} md={6}>
                        <Form.Group>
                            <Form.Label>Email ID:</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Your email" value={data.email} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm={6} md={6}>
                        <Form.Group>
                            <Form.Label>Phone:</Form.Label>
                            <Form.Control type="tel" name="phone" placeholder="Your phone number" value={data.phone} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col sm={6} md={6}>
                        <Form.Group>
                            <Form.Label>Date of Birth:</Form.Label>
                            <Form.Control type="date" name="dob" value={data.dob} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Address:</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Your address" value={data.address} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant={editIndex !== null ? "warning" : "primary"} type="submit">
                    {editIndex !== null ? "Update" : "Add"}
                </Button>
            </Form>

            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>DOB</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.dob}</td>
                            <td>{user.address}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleEdit(index)}>Edit</Button>{" "}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
