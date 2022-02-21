import styled from 'styled-components'

import { NavLink } from './router'

export default function TopNav () {
  return (
    <Ul>
      <li>
        <Link to='objects'>Objects</Link>
      </li>
      <li>
        <Link to='levels'>Levels</Link>
      </li>
      <li>
        <Link to='world'>World</Link>
      </li>
    </Ul>
  )
}

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: center;
`

const Link = styled(NavLink)`
  display: block;
  padding: 2px 8px;
  margin: 8px 8px;
  border-bottom: 2px solid #ccc;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #aaa;
  }

  &.active {
    border-color: #6868ff;
  }
`
