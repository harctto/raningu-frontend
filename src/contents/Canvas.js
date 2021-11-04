import React, { Component } from 'react';
import Tabbar from '../components/Tabbar';
import CanvasDraw from "react-canvas-draw";
import { RangeStepInput } from 'react-range-step-input';
import { SketchPicker } from 'react-color';
import imgTest from '../images/words/ba.png'
import MobileNav from '../components/MobileNav';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#FE6849",
            width: 700,
            height: 600,
            brushRadius: 20,
            lazyRadius: 5,
        }
    }

    handleChangeComplete = (color, event) => {
        this.setState({ color: color.hex });
    };

    handleChange = (color, event) => {
        this.setState({ color: color.hex });
    }

    componentDidMount() {
        //call
    }

    render() {
        return (
            <>
                <MobileNav user={this.props.user} />
                <Tabbar user={this.props.user} />
                <div className="content-container h-screen flex flex-row justify-center items-center">
                    <div className="mx-10">
                        <div className="flex justify-center text-xl">
                            <div className="mx-2">
                                <label>Brush-Radius : {this.state.brushRadius}</label>
                                <RangeStepInput
                                    min={1} max={40}
                                    value={this.state.brushRadius} step={1}
                                    onChange={e =>
                                        this.setState({ brushRadius: parseInt(e.target.value, 10) })
                                    }
                                    className="mx-3"
                                />
                            </div>
                            <div className="mx-2">
                                <label>Lazy-Radius : {this.state.lazyRadius}</label>
                                <RangeStepInput
                                    min={0} max={24}
                                    value={this.state.lazyRadius} step={1}
                                    onChange={e =>
                                        this.setState({ lazyRadius: parseInt(e.target.value, 10) })
                                    }
                                    className="mx-3"
                                />
                            </div>
                        </div>
                        <CanvasDraw
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            brushColor={this.state.color}
                            brushRadius={this.state.brushRadius}
                            lazyRadius={this.state.lazyRadius}
                            canvasWidth={this.state.width}
                            canvasHeight={this.state.height}
                            imgSrc={imgTest}
                            className="my-2 rounded-xl shadow-sm"
                        />
                    </div>
                    <div>
                        <SketchPicker
                            className="shadow-none color-box mb-5"
                            color={this.state.color}
                            onChangeComplete={this.handleChangeComplete}
                            onChange={this.handleChange}
                        />
                        <div className="flex flex-row justify-evenly">
                            <button
                                onClick={() => {
                                    this.saveableCanvas.undo();
                                }}
                                className="m-2 transition-all duration-500 hover:bg-yellow-300 py-2 px-6 bg-yellow-400 text-white rounded shadow-sm"
                            >
                                Undo
                            </button>
                            <button
                                onClick={() => {
                                    this.saveableCanvas.clear();
                                }}
                                className="m-2 transition-all duration-500 hover:bg-red-400 py-2 px-6 bg-red-600 text-white rounded shadow-sm"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default Canvas