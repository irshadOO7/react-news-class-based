import React, { Component } from 'react'
import Newspiner from "./spin.gif"
export default class Loader extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Newspiner} alt="loader" />
      </div>
    )
  }
}
