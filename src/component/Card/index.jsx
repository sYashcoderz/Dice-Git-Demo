import { Avatar, Card, Col, Row, Typography } from "antd";

const CustomCard = ( { cardData } ) => {
return (
    <>
        <Card 
            // title={ <span>{cardData?.full_name || 'No Data'}</span>}
            bordered={true} 
            style={{ width: 300 }}
            hoverable 
        >
            <Row>
                <Col span={24} style={{ display:'flex', alignItems: 'center', gap:'8px' }}>
                    <Avatar size={40} src={cardData?.owner?.avatar_url} alt="Image Not Preview" > </Avatar>
                    <h2 >{cardData?.full_name}</h2>
                </Col>
                <Col span={24}>
                    <Typography.Text> {cardData?.description} </Typography.Text>
                    <Typography.Title level={5} >{cardData?.language}</Typography.Title>
                    <Typography.Title level={5} >{cardData?.stars}</Typography.Title> {/*  Not getting stars in the API */}
                </Col>
            </Row>
        </Card>
    </>
)
}

export default CustomCard