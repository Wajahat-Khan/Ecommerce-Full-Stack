import React from "react";
import {  Container, Col, Row,Pagination } from 'react-bootstrap';

class Paginations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    }
    
    render() {
        const {pages}=this.state;

        return (<Container>
            <Row className="justify-content-md-center pagination">
                <Col></Col>
                <Col>
                    <Pagination
                      
                    >
                        <Pagination.Prev onClick={this.props.paginationPrevious} />
                        {
                            pages.map(p => (<Pagination.Item className={(this.props.activePage === p ? 'active ' : '')} onClick={this.props.pagination} key={p}>{p}</Pagination.Item>))
                        }
                        <Pagination.Next onClick={this.props.paginationNext} />
                    </Pagination>
                </Col>
                <Col></Col>
            </Row>
        </Container>)
    }
}
export default (Paginations)