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

    const value = parseFloat(e.target.value)
    const max = parseFloat(e.target.max) + 1
    const min = parseFloat(e.target.min) - 1
    const inputEvent = new Event('input', { bubbles: true });

    let newValue = (value + change + max) % max
    newValue = min ? Math.max(newValue, min) : newValue
    newValue = newValue.toFixed(2)
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
      <label for="hue">Hue</label>
      <input
        type="text"
        name="hue"
        value={h}
        max="360"
        onChange={(e) => { setH(parseFloat(e.target.value)) }}
        onKeyDown={keydownHandler}
        autoFocus
      />

      <label for="saturation">Sat</label>
      <input
        type="text"
        name="saturation"
        value={s}
        max="100"
        min="0"
        onChange={(e) => { setS(parseFloat(e.target.value)) }}
        onKeyDown={keydownHandler}
      />

      <label for="lightness">Lightness</label>
      <input
        type="text"
        name="lightness"
        value={l}
        max="100"
        min="0"
        onChange={(e) => { setL(parseFloat(e.target.value)) }}
        onKeyDown={keydownHandler}
      />

      <label for="hue">Swatches</label>
      <input
        type="text"
        name="swatches"
        value={count}
        max="1000"
        min="2"
        increment="0.1"
        onChange={(e) => { setCount(e.target.value) }}
        onKeyDown={keydownHandler}
      />

      <div className="swatches">
        {swatches}
      </div>
    </div>
  );
}

export default App;
