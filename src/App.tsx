import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import BookPage from './pages/BookPage'
import { useAppSelector } from './app/hooks'

function App() {

  const currentGameInfo = useAppSelector(state => state.results.currentGameInfo)

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path={'/'} element={<SearchPage />} />
          {
            currentGameInfo ? <Route path={'/:id'} element={<BookPage game={currentGameInfo} />} /> : ''
          }

        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App;
