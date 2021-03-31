import { useEffect, useState } from 'react'
import './App.css';
import Swatch from './Swatch'

function App() {
  const [h, setH] = useState(0)
  const [s, setS] = useState(100)
  const [l, setL] = useState(50)
  const [count, setCount] = useState(18)
  const [swatches, setSwatches] = useState([])

  useEffect(() => {

  }, [])

  useEffect(() => {
    let newSwatches = []

    for (let i = 0; i < count; i++) {
      const hue = h + i * 360 / count
      const color = 'hsl(' + hue + ',' + s + '%,' + l + '%)'
      newSwatches.push(<Swatch key={i} color={color} />);
    }

    setSwatches(newSwatches)
  }, [h, s, l, count])

  function keydownHandler(e) {
    const change = getChange(e)

    if (!change) return

    const value = parseInt(e.target.value)
    const maxValue = parseInt(e.target.max) + 1
    const name = e.target.attributes.getNamedItem('name')
    const loopvalue = e.target.loopvalue
    const input = document.querySelector('[name=' + name.value + ']')
    const changeEvt = new Event('input', { bubbles: true })

    let newValue = (value + change + maxValue) % maxValue
    newValue = loopvalue ? Math.min(newValue, maxValue) : newValue

    e.preventDefault()

    e.target.value = newValue;

    input.dispatchEvent(changeEvt)
  }

  function getChange(e) {
    if (e.key === "ArrowUp") {
      return 1

    } else if (e.key === "ArrowDown") {
      return -1
    }
  }

  return (
    <div className="App">
      <input
        type="text"
        name="hue"
        value={h}
        max="360"
        loopvalue="true"
        onChange={(e) => { setH(e.target.value) }}
        onKeyDown={keydownHandler}
        autoFocus
      />
      <input
        type="text"
        name="saturation"
        value={s}
        max="100"
        onChange={(e) => { setS(e.target.value) }}
        onKeyDown={keydownHandler}
      />
      <input
        type="text"
        name="lightness"
        value={l}
        max="100"
        onChange={(e) => { setL(e.target.value) }}
        onKeyDown={keydownHandler}
      />
      <input
        type="text"
        name="count"
        value={count}
        onChange={(e) => { setCount(e.target.value) }}
        onKeyDown={keydownHandler}
      />
      {swatches}
    </div>
  );
}

export default App;
