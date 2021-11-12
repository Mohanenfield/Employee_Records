import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
// import Details from "./Details.js";

class CRUD extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            show1: false,
            posts: [],
            id: "",
            employee_name: "",
            employee_salary: "",
            employee_age: "",
            profile_image: "",
        }
    }

    componentDidMount = () => this.getPosts();

    getPosts = async () => {
        const response = await axios.get("https://60e3ea516c365a0017839417.mockapi.io/employees");
        this.setState({
            posts: response.data
        })
        console.log(response.data);
    }


    deletePost = async (eId) => {
        try {
            await axios.delete(`https://60e3ea516c365a0017839417.mockapi.io/employees/${eId}`);
            let posts = [...this.state.posts];
            posts = posts.filter((e) => e.id !== eId);
            this.setState({
                posts
            });
        } catch (err) {
            console.log(err);
        }

    }

    createPost = async () => {

        const { data } = await axios.post("https://60e3ea516c365a0017839417.mockapi.io/employees",
            {
                employee_name: this.state.employee_name,
                employee_salary: this.state.employee_salary,
                employee_age: this.state.employee_age,
                profile_image: this.state.profile_image
            });
        const posts = [...this.state.posts];
        posts.push(data);
        this.setState({
            posts: posts,
            employee_name: "",
            employee_salary: "",
            employee_age: "",
            profile_image: "",
        })


    }

    updatePost = async () => {

        try {
            const { id, employee_name, employee_salary, employee_age, profile_image, posts } = this.state;
            const { data } = await axios.put(`https://60e3ea516c365a0017839417.mockapi.io/employees/${id}`, {
                employee_name,
                employee_salary,
                employee_age,
                profile_image,
            });
            const index = posts.findIndex((e) => e.id === id);
            posts[index] = data;

            this.setState({ posts, id: "", employee_name: "", employee_salary: "", employee_age: "", profile_image: "" });
        } catch (err) {
            console.log(err);
        }
    };

    selectPost = (e) => {
        this.state.show = true
        this.setState({
            id: e.id,
            employee_name: e.employee_name,
            employee_salary: e.employee_salary,
            employee_age: e.employee_age,
            profile_image: e.profile_image
        })
    }
    selectPost1 = (e) => {
        this.state.show1 = true
        this.setState({
            id: e.id,
            employee_name: e.employee_name,
            employee_salary: e.employee_salary,
            employee_age: e.employee_age,
            profile_image: e.profile_image
        })
    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.id) {
            this.updatePost();
        } else {
            this.createPost();
        }

    }

    handleShow = () => {
        this.setState({ show: true });

    }
    handleClose = () => {
        this.setState({ show: false });
        this.setState({ show1: false });
    }
    handleShow1 = () => {
        this.setState({ show1: true });
    }
    

    render() {
        return (
            <><div className="addUser" >
                <h3 style={{"color":"white"}}>To add a new Employee detail, click the button...</h3>
                <p><Button variant="primary" style={{"margin":"30px"}} onClick={this.handleShow}>
                                            Add Employee
                                        </Button></p>
            </div>


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="class">

                            <h4>To Add a Employee :</h4>

                            <form onSubmit={this.handleSubmit}>
                                <div><b> Enter a Name</b> </div>
                                <input type="text" name="employee_name" style={{ "width": "100%" }} value={this.state.employee_name} onChange={this.handleChange} />
                                <div><b>Enter Salary</b></div>
                                <input type="number" name="employee_salary" style={{ "width": "100%" }} value={this.state.employee_salary} onChange={this.handleChange} />
                                <div><b>Enter age</b></div>
                                <p> <input type="number" name="employee_age" style={{ "width": "100%" }} value={this.state.employee_age} onChange={this.handleChange} /></p>
                                <div><b>Enter Avatar Url</b></div>
                                <p> <input type="url" name="profile_image" style={{ "width": "100%" }} value={this.state.profile_image} onChange={this.handleChange} /></p>
                                <p>
                                    <Button variant="primary" type="submit" onClick={this.handleClose} >
                                    Submit
                                </Button></p>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.show1} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover style={{"width":"100%"}}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <td>{this.state.id}</td></tr>
                                  <tr><th>Name</th>
                                  <td>{this.state.employee_name}</td></tr>  
                                  <tr>  <th>Salary</th>
                                  <td>$ {this.state.employee_salary}</td></tr>
                                   <tr> <th>Age</th>
                                   <td>{this.state.employee_age}</td></tr>
                                  <tr> <th>Profile Picture</th>
                                    <td><img src={this.state.profile_image} /></td></tr>
                                
                            </thead>
                            </Table>
                    </Modal.Body>
                </Modal>


<div >
    <h2>EMPLOYEE RECORDS</h2>
</div>

                <Table striped bordered hover variant="dark" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Age</th>
                            <th>Profile Picture</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((e) => {
                            return (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.employee_name}</td>
                                    <td>$ {e.employee_salary}</td>
                                    <td>{e.employee_age}</td>
                                    <td><img src={e.profile_image} style={{ width: "100px", height: "100px" }} ></img></td>

                                    <td>
                                        
                                        <p> <Button style={{ color: "white" }} onClick={() => { this.deletePost(e.id) }}>Delete</Button></p>
                                        <p> <Button onClick={() => { this.selectPost(e) }} >Edit</Button></p>
                                        <p><Button variant="primary" onClick={() => { this.selectPost1(e) }}>
                                            View Details
                                        </Button></p></td>

                                </tr>

                            );
                        })}


                    </tbody>
                </Table>


            </>
        );
    }
}
export default CRUD;