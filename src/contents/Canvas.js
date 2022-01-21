import React, { useEffect, useState } from 'react';
import Tabbar from '../components/Tabbar';
import MobileNav from '../components/MobileNav';
import CanvasDraw from "react-canvas-draw";
import {
    // eslint-disable-next-line
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    Redirect,
    useHistory
} from "react-router-dom";
import axios from 'axios'
const Canvas_API = "https://raningu-api.glitch.me/data/canvas"

export default function Canvas({ user }) {
    const [canvasData, setCanvasData] = useState([]);
    let { path, url } = useRouteMatch();

    useEffect(() => {
        const getCanvas = async () => {
            try {
                const res = await axios.get(Canvas_API);
                setCanvasData(res.data)
            } catch (err) {
                console.error(err);
            }
        };
        getCanvas()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <MobileNav user={user} />
            <Tabbar user={user} />
            <div className="content-container h-screen flex flex-col justify-center items-center canvas-box">
                <div className="flex flex-row h-1/6 items-center overflow-auto">
                    {canvasData.length > 0 ? canvasData.map((data) => {
                        return (
                            <Link to={`${url}/${data.canvas_name}`}>
                                <div className="lesson-choose-box">
                                    <span>
                                        {data.canvas_name}
                                    </span>
                                </div>
                            </Link>
                        )
                    }) : null}
                </div>
                <Switch>
                    <Route exact path={path}>
                        <div className="flex flex-col flex-wrap h-1/6 overflow-auto w-4/5">
                            {canvasData.length > 0 ?
                                <span className="text-xl text-center sm:text-4xl">Please select Hiragana or Katakana</span>
                                :
                                <div className="loader self-center"></div>
                            }
                        </div>
                    </Route>
                    <Route path={`${path}/:canvasName`}>
                        {canvasData.length > 0 ? <EachCanvas canvasData={canvasData} />
                            : <Redirect to="/canvas" />}
                    </Route>
                </Switch>
            </div>
        </>
    )
}

function EachCanvas({ canvasData }) {

    
    const { canvasName } = useParams();
    let { path, url } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route exact path={path}>
                    <div className="flex flex-col flex-wrap h-4/6 overflow-auto w-4/5">
                        {canvasData.length > 0 ? (() => {
                            if (canvasName === 'Hiragana')
                                return <>
                                    {canvasData.length > 0 ? canvasData[0].data.map((data) => {
                                        return (
                                            <Link to={`${url}/${data.id}`} >
                                                <div className="canvas-choose-box">
                                                    <img src={data.img} className="w-28" alt={data.read} />
                                                </div>
                                            </Link>
                                        )
                                    }) : console.log('error')}
                                </>
                            else
                                return <>
                                    {canvasData.length > 0 ? canvasData[1].data.map((data) => {
                                        return (
                                            <Link to={`${url}/${data.id}`} >
                                                <div className="canvas-choose-box">
                                                    <img src={data.img} className="w-28" alt={data.read} />
                                                </div>
                                            </Link>
                                        )
                                    }) : console.log('error')}
                                </>
                        })()
                            : null}
                    </div>
                </Route>
                <Route path={`${path}/:canvasId`}>
                    {canvasData.length > 0 ? <DrawingSection canvasData={canvasData} />
                        : null
                    }
                </Route>
            </Switch>
        </>
    )
}

function DrawingSection({ canvasData }) {
    const { canvasName } = useParams();
    const { canvasId } = useParams();

    const [img, setImg] = useState(canvasData.find(canvas => canvas.canvas_name === canvasName))

    const history = useHistory()

    const routeChange = () => {
        let path = `/canvas/${canvasName}`;
        history.push(path);
    }

    useEffect(() => {
        const cv_name = canvasData.find(canvas => canvas.canvas_name === canvasName)
        setImg(cv_name.data[canvasId - 1].img)
    }, [img, canvasData, canvasId, canvasName])

    return (
        <>
            {img.length > 0 ?
                <div className="flex flex-col flex-wrap h-5/6 overflow-auto w-4/5">
                    <button onClick={routeChange} className="bg-bluemain w-3/5 self-center mb-8 py-2 text-white rounded-xl hover:py-3 duration-500">
                        back
                    </button>
                    <div className="self-center w-4/5 flex flex-col">
                        <CanvasDraw
                            brushColor={'#FE6849'}
                            brushRadius={15}
                            imgSrc={img}
                            lazyRadius={0}
                            className="my-2 rounded-xl shadow-sm canvas self-center inline-blocking"
                        />
                    </div>
                </div>
                :
                <div className="loader"></div>
            }
        </>
    )
}