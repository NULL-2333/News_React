import React, {Component } from 'react';
import commentBox from 'commentbox.io';
import { Col } from 'react-bootstrap'

class Comments extends Component {

    componentDidMount() {
        this.removeCommentBox = commentBox('5699330316959744-proj', {
            className: 'commentbox',
            defaultBoxId: this.props.id,
            tlcParam: 'id',
            width: '300px'
        });
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {
        return (
            <Col xs={12} lg={12}>
                <div className="commentbox" id={this.props.id}/>
            </Col>
        );
    }
}

export default Comments;