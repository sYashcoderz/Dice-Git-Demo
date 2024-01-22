import { Fragment, useEffect, useState } from "react"
import { Col, Empty, Row, Button, Input, Select  } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


// Build a todo application
// - User should be able to add, update and delete a todo
// - Todos should have a title, description and a status (Pending, In Progress, Completed)
// - Todos should be separated based on statuses
// - Todos should persist on refresh
// - List should update without refreshing the page

const GitSearchDemo = () => {
    const { Option } = Select;
    const [ todoList, setTodoList ] = useState([]);
    const [isUpdate, setIsUpdate ] = useState(false);
    const SelectOptions = ["pending", "completed", "inprogress"];
    const [ inputTodo, setInputTodo ] = useState(
        { title:'', description: '', status : 'pending' }
    );

    useEffect(() => {
        const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
        console.log("Stored Todo List: ", storedTodoList);
        setTodoList(storedTodoList);
    }, []);
    
    useEffect(() => {
        if (todoList.length > 0) {
            localStorage.setItem('todoList', JSON.stringify(todoList));
        }
    }, [todoList]);

    const handleSubmit = () => {
        if (inputTodo.title.trim() !== "") {
        if (isUpdate) {
            setTodoList((prevList) => {
            const updatedList = prevList.map((item) =>
                item.uid === inputTodo.uid
                ? { ...item, title: inputTodo.title, description: inputTodo.description, status: inputTodo.status || 'pending' }
                : item
            );
            setIsUpdate(!isUpdate);
            return updatedList;
            });
            setInputTodo({});
        } else {
            setTodoList((prevList) => [
            ...prevList,
            { uid: new Date().getTime(), title: inputTodo.title, description: inputTodo.description, status: 'pending' },
            ]);
            setInputTodo({});
        }
        }
    };

    const handleInputChange = (e) => {
        console.log("onChange ==", e.target.value);
        setInputTodo({ ...inputTodo, title: e.target.value });
    }

    const handleDiscChange = (e) => {
        setInputTodo({ ...inputTodo, description: e.target.value })
    }

    const handleDelete = (id) => {
        const updatedList = todoList.filter((item) => { return item.uid !== id});
        setTodoList(updatedList);
    }
    
    const handleUpdate = (id) => {
        setIsUpdate(true);
        const updatedTodo = todoList.find((item) => item.uid === id);
        setInputTodo(updatedTodo);
    }

    const handleStatusChange = (value) => {
        console.log("clk status ==",value);
        setInputTodo({ ...inputTodo, status: value });
    }

    // console.log("INput to ", inputTodo);
    console.log("Submit to ", todoList);


    return (
        <Fragment>
            <Row style={{height:'100vh' , border:'1px solid green', display:'flex', justifyContent:'center', alignItems:'center' }} >
                <h2>Welcom to Dice Todo</h2>
                <Col xl={24} md={24} lg={24} sm={24} style={{ display:'flex', alignItems:'center', flexDirection:'column' }}>
                    <Row>
                        <Input placeholder="Enter to Insert Todo Item" value={inputTodo.title} name="insert" onChange={handleInputChange} style={{ width: '400px' }} required />
                        <Input.TextArea type="textarea" value={inputTodo.description} onChange={handleDiscChange} placeholder="Enter Discription" style={{ width:'200px'}} required />
                    </Row>
                    <Row style={{ width:'40%', marginTop:'10px', display:'flex', justifyContent:'flex-end' }}>
                        { isUpdate && 

                        <Col>
                            <Select onChange={handleStatusChange} defaultValue={'pending'} style={{ width: 200, marginRight:'500px' }}>
                                {SelectOptions.map((stat) => (
                                <Option key={stat} value={stat}>
                                    {stat}
                                </Option>
                                ))}
                            </Select>
                        </Col>
                        }
                        <Col>
                            <Button type="primary" onClick={handleSubmit}>{ (isUpdate) ? "Update" : "ADD"}</Button>
                        </Col>  
                    </Row>
                </Col>

                <Col xl={24} md={24} lg={24} style={{ }}>
                    <Row>
                        { SelectOptions.map((status, index) => {
                            return(
                                <>
                                    <Col xl={8} md={8} lg={8} key={index} style={{ border: "1px solid grey", minHeight: "500px" }}>
                                        <h5>{status}</h5>
                                        { todoList
                                            .filter((item) => item?.status === status)
                                            .map((item, index) => (
                                            <Row key={index} style={{ gap: '5px' }} >
                                                <Col style={{ fontSize:'18px', fontWeight: 700 }} >{item.title}</Col>
                                                <Col style={{ fontSize:'14px', fontWeight: 400 }}>{item?.description}</Col>
                                                <Button
                                                    icon={<DeleteOutlined />}
                                                    style={{ padding: "5px", margin: "2px", cursor: "pointer" }}
                                                    onClick={() => {
                                                        handleDelete(item.uid);
                                                    }}
                                                />
                                                <Button
                                                    icon={<EditOutlined />}
                                                    style={{ padding: "5px", margin: "2px", cursor: "pointer" }}
                                                    onClick={() => {
                                                        handleUpdate(item.uid);
                                                    }}
                                                />
                                            </Row>
                                        ))}
                                    </Col>
                                </>
                            )
                        }) 
                        }
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
}

export default GitSearchDemo