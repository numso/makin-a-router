import React from 'react'
import styled from 'styled-components'

const AlertContext = React.createContext()

export const useAlerts = () => React.useContext(AlertContext)

export default function AlertsModule ({ children }) {
  const [alerts, setAlerts] = React.useState([
    // { id: 1, text: 'yoyoy', type: 'success' },
    // { id: 2, text: 'nonono', type: 'failure' }
  ])

  function create (text, isFailure) {
    const a = {
      id: Math.floor(Math.random() * 9999999),
      text,
      type: isFailure ? 'failure' : 'success'
    }
    setAlerts(alerts => [...alerts, a])
  }

  return (
    <AlertContext.Provider value={{ create }}>
      {children}
      <Alerts
        alerts={alerts}
        dismissAlert={id => {
          setAlerts(alerts => alerts.filter(a => a.id !== id))
        }}
      />
    </AlertContext.Provider>
  )
}

function Alerts ({ alerts, dismissAlert }) {
  return (
    <AlertWrapper>
      <AlertInnerWrapper>
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            type={alert.type}
            dismiss={() => dismissAlert(alert.id)}
          >
            {alert.text}
            <AlertButton onClick={() => dismissAlert(alert.id)}>x</AlertButton>
          </Alert>
        ))}
      </AlertInnerWrapper>
    </AlertWrapper>
  )
}

function Alert ({ dismiss, ...props }) {
  React.useEffect(() => {
    setTimeout(() => {
      dismiss()
    }, 4000)
  }, [])
  const [enter, setEnter] = React.useState(false)
  React.useEffect(() => {
    setTimeout(() => {
      setEnter(true)
    }, 0)
  }, [])
  return <StyledAlert {...props} className={enter ? 'enter' : ''} />
}

const AlertWrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AlertInnerWrapper = styled.div`
  position: absolute;
  bottom: 0;
`

const StyledAlert = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 8px 16px;
  margin: 8px;
  border-radius: 4px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
  border-left: 8px solid ${p => (p.type === 'success' ? '#3dd13d' : 'red')};
  min-width: 200px;
  opacity: 0;
  height: 0;
  transition: all 500ms;
  &.enter {
    opacity: 1;
    height: 21px;
  }
`

const AlertButton = styled.button`
  background: none;
  border: none;
`
