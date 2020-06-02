import React from 'react';
class Range extends React.Component {

    constructor(props) {
        super(props);
        this.temperatureGrades = [0, 8, 15, 22, 30];
        this.updateRange = this.updateRange.bind(this);
    }

    updateRange(e) {
        this.props.updateRange(e.target.value);
    }

    render() {
        const { range } = this.props;
        return (
            <div className="b-slider-main">
                <div className="b-slider-main--block">
                    <div className="b-slider-main--block__grad">
                        { this.temperatureGrades.map((temp, i) => (
                            <div className="b-slider-main--block__grad-element" key={i}>
                                <span className="b-slider-main--block__grad-number">{temp}</span>
                                <br/>
                                <span className="b-slider-main--block__grad-line">|</span>
                            </div> )
                        )}
                    </div>
                    <input className="b-slider-main--block__range"
                           type="range"
                           value={range}
                           min="0"
                           max="30"
                           step="1"
                           onChange={this.updateRange}
                    />
                </div>
            </div>
        )
    }
}

export default Range;
