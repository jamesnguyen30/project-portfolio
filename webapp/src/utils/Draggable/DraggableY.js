import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

const DraggableY = props => {
  const [state, setState] = useState({
    originalIndex: props.index,
    index: props.index,
    y: 0,
    dragging: false,
    offset: 0,
    breakpoints: [],
    // fromIndex: 0,
    // toIndex: 0,
    movementDirection: 0
  })
  const ref = useRef()

  const resetState = (state) => {
    state.index = props.index
    state.originalIndex = props.index
    state.y = 0
    state.dragging = false
    state.offset = 0
    state.breakpoints = []
    state.prevMousePos = 0
    state.movementDirection = 0
  }

  const getBreakpoints = () => {
    if (props.listRef.current != null) {
      return Array.from(props.listRef.current.children).map(x => x.offsetTop + Math.floor(x.offsetHeight / 2))
    } else {
      return []
    }
  }

  // find index to swap with
  // IMPORTANT This function needs some improvement for better UX
  // it'll give a 'not-pleasant' result if users drag up and drag down then release
  // if users drag in 1 direction and release it should be good
  const findSwapIndex = (breakpoints, index, value) => {
    const n = breakpoints.length
    const left = index > 0 ? index - 1 : index
    const right = index < n - 1 ? index + 1 : index
    // debug, turn on if in development
    // console.log(`left = ${left}, right = ${right}, index = ${index}, value = ${value}, leftValue = ${breakpoints[left]}, rightValue = ${breakpoints[right]} , array = [${breakpoints}]`)

    if (value > breakpoints[right]) {
      return right
    }
    if (value < breakpoints[left]) {
      return left
    }
    return index

    // const n = breakpoints.length
    // const m = state.index
    // if (direction > 0) {
    //   for (let i = m + 1; i < n; i++) {
    //     if (i === state.index) continue
    //     if (breakpoints[i] > value) return i - 1
    //   }
    //   return n - 1
    // } else {
    //   for (let i = m - 1; i >= 0; i--) {
    //     if (i === state.index) continue
    //     if (breakpoints[i] < value) return i + 1
    //   }
    //   return 0
    // }
    // const cloned = breakpoints.map(x => { return x })
    // cloned.push(value)
    // cloned.sort((a, b) => (a - b))
    // return cloned.findIndex(x => x === value)
  }

  const onMouseDown = (event) => {
    if (state.dragging === false) {
      console.log('mouse down')
      props.parentRef.current.addEventListener('mouseup', onMouseUp, false)
      props.parentRef.current.addEventListener('mousemove', onMouseMove, false)
      state.offset = state.y - event.pageY
      state.prevMousePos = event.pageY
      state.dragging = true
      state.breakpoints = getBreakpoints()
      event.stopPropagation()
      event.preventDefault()
      setState({ ...state })
    }
  }

  const onMouseMove = (event) => {
    if (state.dragging) {
      const oldY = state.y
      state.y = event.pageY + state.offset
      if (state.y === oldY) {
        event.stopPropagation()
        event.preventDefault()
        return
      }
      state.movementDirection = state.y > oldY ? 1 : -1
      const k = findSwapIndex(state.breakpoints, state.index, ref.current.offsetTop + Math.floor(ref.current.offsetHeight / 2))
      if (k !== state.index) {
        // swap element
        // props.swapRow(k, state.index)
        state.index = k
      }

      setState({ ...state })
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const onMouseUp = (event) => {
    if (state.dragging) {
      console.log(`Final set from ${state.originalIndex} ${state.index}`)
      props.changeIndex(state.originalIndex, state.index)
      resetState(state)
      setState({ ...state })
      event.stopPropagation()
      event.preventDefault()
    }
  }

  return (
    <div
      ref={ref}
      style={{
        position: state.dragging ? 'relative' : 'static',
        top: state.y,
        zIndex: 1000
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {props.children}

    </div>
  )
}

DraggableY.propTypes = {
  children: PropTypes.object,
  parentRef: PropTypes.object,
  listRef: PropTypes.object,
  index: PropTypes.number,
  changeIndex: PropTypes.func
}

export default DraggableY
