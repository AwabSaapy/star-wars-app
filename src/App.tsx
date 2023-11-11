import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Navbar from './modules/main/layout/navbar/navbar.component.tsx';
import Card404Error from './modules/main/components/card-404-error/card-404-error.component.tsx';
import {LinearProgress} from '@mui/material';
import './App.scss'

const ActorContainer = lazy(() => import('./modules/actor/containers/actor/actor.container.tsx'))
const ActorDetailsContainer = lazy(() => import('./modules/actor/containers/actor-details/actor-details.container.tsx'))
const FilmListChartContainer = lazy(() => import('./modules/films/containers/film-list-chart/film-list-chart.container.tsx'))

const App = () => {


    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Suspense fallback={<LinearProgress />}>
                    <Routes>
                        <Route path="/" element={<ActorContainer />} />
                        <Route path="/actors/:actorId" element={<ActorDetailsContainer />} />
                        <Route path="/films" element={<FilmListChartContainer />} />
                        <Route path="*" element={<Card404Error />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}

export default App
