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
      const hue = (h + i * 360 / count) % 360
      const color = 'hsl(' + hue + ',' + s + '%,' + l + '%)'
      newSwatches.push(<Swatch key={i} color={color} />);
    }

    setSwatches(newSwatches)
  }, [h, s, l, count])

  function keydownHandler(e) {
    const change = getChange(e)

    if (!change) return

    const value = parseInt(e.target.value)
    const max = parseInt(e.target.max) + 1
    const min = parseInt(e.target.min) + 1
    const inputEvent = new Event('input', { bubbles: true });

    let newValue = (value + change + max) % max
    newValue = min ? Math.max(newValue, min) : newValue

    e.preventDefault()

    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(e.target, newValue);

    e.target.dispatchEvent(inputEvent);
  }

  function getChange(e) {
    if (e.key === "ArrowUp")
      return 1

    else if (e.key === "ArrowDown")
      return -1
  }

  return (
    <div className="App">
      <input
        type="text"
        name="hue"
        value={h}
        max="360"
        onChange={(e) => { setH(parseInt(e.target.value)) }}
        onKeyDown={keydownHandler}
        autoFocus
      />
      <input
        type="text"
        name="saturation"
        value={s}
        max="100"
        min="0"
        onChange={(e) => { setS(parseInt(e.target.value)) }}
        onKeyDown={keydownHandler}
      />
      <input
        type="text"
        name="lightness"
        value={l}
        max="100"
        min="0"
        onChange={(e) => { setL(parseInt(e.target.value)) }}
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
