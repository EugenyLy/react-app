import React from 'react';

class FooterComponent extends React.Component {
    render() {
        return (
            <div className="b-footer">
                <h5>
                    Some weather app
                </h5>
                <span>
                    The text that you see after moving the slider is static (not synchronized with the API).
                </span>
            </div>
        );
    }
}
export default FooterComponent;
