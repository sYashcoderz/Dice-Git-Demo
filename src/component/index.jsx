import { Fragment, useEffect, useState } from "react"
import { Col, Empty, Row, Spin } from "antd";
import { Button, Form, Input } from 'antd';


// Build a todo application
// - User should be able to add, update and delete a todo
// - Todos should have a title, description and a status (Pending, In Progress, Completed)
// - Todos should be separated based on statuses
// - Todos should persist on refresh
// - List should update without refreshing the page

const GitSearchDemo = () => {
    const [form] = Form.useForm();
    const [ isLoading, setIsLoading ] = useState();
    const [ todoList, setTodoList ] = useState([]);
    const [ inputTodo, setInputTodo ] = useState(
        { uid:0, status : 'pending', title:'' }
    );

    // useEffect( () => {
    //     localStorage.setItem('todoList', JSON.stringify(todoList));
    //     const storedData = localStorage.getItem('todoList');
    //     console.log("Stored Data ==>>", storedData);
    //     setTodoList(storedData);
    // }, [todoList]);

    const handleSubmit = () => {
        setTodoList((prevList) => [ ...prevList, inputTodo]);
        setInputTodo({});
    }

    const handleInputChange = (e) => {
        console.log("onChange ==", e.target.value);
        setInputTodo({ ...inputTodo, title: e.target.value, uid: todoList.length });
    }

    const handleDelete = (id) => {
        const updatedList = todoList.filter((item) => { return item.uid !== id});
        setTodoList(updatedList);
    }
    
    const handleUpdate = (id) => {
        const updatedTodo = todoList.filter((item) => { return item.uid === id});
        // setInputTodo((prevTodo) => { ...prevTodo, {uid:0, status : 'pending', discription:'', title: e.target.value } );
    }

    console.log("INput to ", inputTodo);
    console.log("Submit to ", todoList);


    return (
        <Fragment>
            <Row>
                <Col span={24}>
                    <Row style={{ height:'100%', border:'1px solid black', display:'flex', justifyContent:'center', alignItems:'center' }} >
                        <Col span={24} style={{ border:'1px solid black', display:'flex', justifyContent:'center', alignItems:'center' }}>
                            <Input placeholder="Enter to Insert" value={inputTodo.title} name="insert" onChange={handleInputChange} style={{ width: '200px' }} />
                            
                            <Button onClick={handleSubmit}>ADD</Button>
                        </Col>
                        <Col span={6} style={{ border:'1px solid black' }}>
                            { todoList && todoList.map((item, index) => {
                                return (
                                    <>
                                        { (item?.status === "inprogrss") ? <Row>
                                            <h5>In Progress</h5>
                                            <Col>{item?.title}</Col>
                                            <Col style={{ padding: '5px', margin:'2px', cursor:'pointer' }} onClick={ () => { handleDelete(item?.uid) } } >delete</Col>
                                            <Col style={{ padding: '5px', margin:'2px', cursor:'pointer' }} onClick={ () => { handleUpdate(item?.uid) } } >update</Col>
                                        </Row> :

                                        (item?.status === "completed") ? <Row>
                                            <h5>Completed</h5>
                                            <Col>{item?.title}</Col>
                                            <Col style={{ padding: '5px', margin:'2px', cursor:'pointer' }} onClick={ () => { handleDelete(item?.uid) } } >delete</Col>
                                            <Col style={{ padding: '5px', margin:'2px', cursor:'pointer' }} onClick={ () => { handleUpdate(item?.uid) } } >update</Col>
                                        </Row> : 

                                        <Row>
                                            <h5>Pending</h5>
                                            <Col>{item?.title}</Col>
                                            <Col style={{ padding: '5px', margin:'2px', cursor:'pointer' }} onClick={ () => { handleDelete(item?.uid) } } >delete</Col>
                                            <Col style={{ padding: '5px', margin:'2px', cursor:'pointer' }} onClick={ () => { handleUpdate(item?.uid) } } >update</Col>
                                        </Row>
                                        }
                                    </>
                                )
                            })}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
}

export default GitSearchDemo