import styled from 'styled-components'

import TopNav from './top-bar'
import { Route, Routes } from './router'
import ObjectsPage from './pages/objects-page'
import EditObjectPage from './pages/objects-edit-page'
import LevelsPage from './pages/levels-page'
import WorldPage from './pages/world-page'

import Alerts from './alerts'

export default function App () {
  return (
    <Alerts>
      <Wrapper>
        <TopNav />
        <Main>
          <Routes>
            <Route path='objects' element={<ObjectsPage />}>
              <Route path=':id' exact element={<EditObjectPage />} />
              <Route path='' exact />
              <Route to='/objects' />
            </Route>
            <Route path='levels' element={<LevelsPage />} />
            <Route path='world' element={<WorldPage />} />
            <Route to='objects' />
          </Routes>
        </Main>
      </Wrapper>
    </Alerts>
  )
}

const Wrapper = styled.div`
  background-color: #bbb;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  display: flex;
`
