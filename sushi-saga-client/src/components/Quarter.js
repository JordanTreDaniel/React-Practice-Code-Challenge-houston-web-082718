import React from 'react';

class Quarter extends React.Component {
    render() {
        return (
            <img src={this.props.image} style={{"height": "200px"}}/>
        )
    }
}

export default Quarter;