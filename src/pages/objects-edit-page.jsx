import styled from 'styled-components'

import { Redirect, useParams } from '../router'

const objects = [
  { id: 'house', label: 'House', content: 'HOOUUUUSSEEE' },
  { id: 'door', label: 'Door', content: 'DDDOOOOORRRR' },
  { id: 'gun', label: 'Gun', content: "I believe ya, but my tommy gun don't!!" }
]

export default function ObjectsEditPage () {
  const { id } = useParams()
  const object = objects.find(o => o.id === id)
  if (!object) return <Redirect to='/objects' />
  return <Wrapper>You've selected {object.content}!!</Wrapper>
}

const Wrapper = styled.div`
  flex: 1;
`
