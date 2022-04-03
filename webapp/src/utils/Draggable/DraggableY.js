import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

const DraggableY = props => {
  const getDefaultState = () => ({
    y: 0,
    dragging: false,
    offset: 0,
    listChildrenTops: [],
    fromIndex: 0,
    toIndex: 0
  })

  const getListChildren = () => {
    if (props.listRef.current != null) {
      return Array.from(props.listRef.current.children).map(x => x.offsetTop)
    } else {
      return []
    }
  }

  // Using offsets and currentOffset
  // find the nth child
  const findNthChild = (offsets, currentOffset) => {
    for (let i = 0; i <= offsets.length; i++) {
      if (currentOffset < offsets[i]) {
        return i
      }
    }
    return offsets.length - 1
  }

  const [state, setState] = useState(getDefaultState())
  const ref = useRef()
  console.log(state)

  const onMouseDown = (event) => {
    if (state.dragging === false) {
      console.log('mouse down')
      props.parentRef.current.addEventListener('mouseup', onMouseUp, false)
      props.parentRef.current.addEventListener('mousemove', onMouseMove, false)
      state.offset = state.y - event.pageY
      state.dragging = true
      state.listChildrenTops = getListChildren()
      state.fromIndex = findNthChild(state.listChildrenTops, ref.current.offsetTop)
      event.stopPropagation()
      event.preventDefault()
      setState({ ...state })
    }
  }

  const onMouseMove = (event) => {
    if (state.dragging) {
      state.y = event.pageY + state.offset
      const k = findNthChild(state.listChildrenTops, ref.current.offsetTop)
      state.toIndex = k
      console.log('Moved to position ' + k)
      setState({ ...state })
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const onMouseUp = (event) => {
    if (state.dragging) {
      state.y = 0
      state.offset = 0
      state.dragging = false
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
  listRef: PropTypes.object
}

export default DraggableY
