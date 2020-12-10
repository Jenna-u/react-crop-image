import React from 'react'

export default function CustomModal(props) {
  
  return (
    <>
      <div className="modal-component-wrap">
        <div className="modal-component-title">{props.title}</div>
        <div className="modal-component-body">{props.children}</div>
        <div className="modal-component-footer">
          <div className="cancel-button">cancel</div>
          <div className="ok-button">ok</div>
        </div>
      </div>
    </>
  )
}