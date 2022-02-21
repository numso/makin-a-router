import { Outlet } from '../router'
import SideBar from '../side-bar'

const objects = [
  { id: 'house', label: 'House', content: 'HOOUUUUSSEEE' },
  { id: 'door', label: 'Door', content: 'DDDOOOOORRRR' },
  { id: 'gun', label: 'Gun', content: "I believe ya, but my tommy gun don't!!" }
]

export default function ObjectsPage () {
  return (
    <>
      <SideBar objects={objects} />
      <Outlet>
        <div>Select a thing on the side</div>
      </Outlet>
    </>
  )
}
