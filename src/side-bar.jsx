import styled from 'styled-components'

import { NavLink } from './router'
import { useAlerts } from './alerts'

export default function SideBar ({ objects }) {
  return (
    <Box>
      <Ul>
        {objects.map(object => (
          <li key={object.id}>
            <A to={object.id}>{object.label}</A>
          </li>
        ))}
        <li>
          <SpecialButton />
        </li>
      </Ul>
    </Box>
  )
}

function SpecialButton () {
  const alerts = useAlerts()
  return (
    <SpecialButt
      as='button'
      onClick={() => alerts.create('Unsupported Feature', true)}
    >
      + New
    </SpecialButt>
  )
}

const Box = styled.div`
  background-color: #aaa;
  width: 250px;
  height: 100%;
  margin-right: 8px;
`

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px;

  display: flex;
  flex-direction: column;
`

const A = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: black;
  padding: 8px;
  background-color: transparent;

  &.active {
    background-color: #777;
  }

  &:hover {
    background-color: #888;
  }
`

const SpecialButt = styled(A)`
  border: none;
  width: 100%;
  text-align: left;
  font-size: 16px;
`
