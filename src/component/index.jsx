import { Fragment, useState } from "react"
import { Col, Empty, Row, Select, Spin } from "antd";
import { Button, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FetchAllGitPublicRepo } from "../services/git.services";
import CustomCard from "./Card";

const GitSearchDemo = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [ apiData, setApiData ] = useState();
    const [ inputString, setInputString ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [filterData, setFilterData ] = useState('')
    const sortOptions = ["stars", "score", "full_name", "created_at", "updated_at"];

    const onFinish = async (values) => {
        try {
            setIsLoading(true);
            setInputString(values?.search);
            if (filterData !== "") {
                const response = await FetchAllGitPublicRepo(values?.search, filterData);
                console.log("Response 11 ==>>: ", response);
                if (response?.status === 200) {
                    setApiData(response?.data);
                    setIsLoading(false);
                }
            } else {
                const response = await FetchAllGitPublicRepo(values?.search, "");
                console.log("Response 22 ==>> ", response);
                if (response?.status === 200) {
                    setApiData(response?.data);
                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.log(error);  
            setIsLoading(false);
        }
    };

    const handleSortSelect = (value) => {
        console.log("Value ==>>", value);
        setFilterData(value);
    }

    return (
        <Fragment>
            <Row style={{ padding: '10px' }} >
                <Col xl={24} lg={24} md={24} sm={24}>
                    <Form
                        form={form}
                        name="git-search-demo"
                        onFinish={onFinish}
                    >
                        <Row style={ { width: '100%', marginTop:'40px' } }>
                            <Col xl={24} lg={24} md={24}>
                                <h2 style={{ textAlign:'center' }} >Welcome to the git search web app</h2>
                            </Col>
                            
                            <Col xl={24} lg={24} md={24} style={{ display:'flex', justifyContent: 'center' }} >
                                <Form.Item
                                    name="search"
                                    style={{ width: '400px' }}
                                    rules={[
                                    {
                                        required: true,
                                        message:'please enter something to search'
                                    },
                                    ]}
                                >
                                    <Input placeholder="Enter to search git repo" />
                                </Form.Item>

                                <Select
                                    value={filterData}
                                    onChange={handleSortSelect}
                                    allowClear
                                    style={{ width:'120px', marginRight:'10px' }}
                                >
                                    <Option value="">Sort</Option>
                                    {sortOptions.map((item) => (
                                    <Option key={item} value={item}>
                                        {item}
                                    </Option>
                                    ))}
                                </Select>

                                <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={isLoading}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                
                <Spin fullscreen spinning={isLoading} />
                { apiData && apiData?.items &&
                    <Col  xl={24} lg={24} md={24} sm={24} >
                        {/* <h4>{`Showing ${apiData?.total_count || 0} search Result for ${ <span style={{ color:'#ED510C' }} >{inputString}</span> } `} </h4> */}
                        <h4>{`Showing ${apiData?.total_count || 0} search result for : `}
                            <span style={{ fontSize:'18px', color: '#ED510C' }}>{inputString}</span>
                        </h4>
                            { (apiData?.items.length > 0)
                                ?
                                    <Row>
                                        { apiData?.items.map( (item, index) => {
                                            console.log("Item ==>>", item?.avatar_url);
                                            return (
                                                <>
                                                    <Col key={index} xl={6}>
                                                        <CustomCard cardData={item} />
                                                    </Col>    
                                                </>
                                            )
                                        })}
                                    </Row>
                                :   <Row>
                                        <Col  xl={24} lg={24} md={24} sm={24} style={{ display:"flex", justifyContent:'center', alignItems:'center' }}>
                                            <Empty />
                                        </Col>
                                    </Row>
                            }
                    </Col>
                }
            </Row>
        </Fragment>
    )
}

export default GitSearchDemo