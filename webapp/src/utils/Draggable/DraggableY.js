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
    if (props.listRef != null) {
      return Array.from(props.listRef.current.children[0].children).map(x => x.offsetTop + Math.floor(x.offsetHeight / 2))
    } else {
      return []
    }
  }

  const findSwapIndex = (breakpoints, index, value) => {
    const n = breakpoints.length
    const left = index > 0 ? index - 1 : index
    const right = index < n - 1 ? index + 1 : index

    if (value > breakpoints[right]) {
      return right
    }
    if (value < breakpoints[left]) {
      return left
    }
    return index
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
  // breakpoints: PropTypes.array,
  index: PropTypes.number,
  changeIndex: PropTypes.func
}

export default DraggableY
