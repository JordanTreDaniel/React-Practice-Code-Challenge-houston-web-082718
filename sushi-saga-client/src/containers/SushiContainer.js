import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi';

const SushiContainer = (props) => {
  let createSushiList = () => {
    return props.sushi.map((sushiObj, idx) => {
      return (
        <Sushi 
          sushi={sushiObj} 
          eatASushi={() => props.eatASushi(sushiObj)} 
          isEaten={sushiObj => props.isEaten(sushiObj)}
          key={idx}
        />)
    });
  }
  let sushiComponents = createSushiList();
  return (
    <Fragment>
      <div className="belt">
        {
          sushiComponents
        }
        <MoreButton moreSushi={() => props.moreSushi()}/>
      </div>
    </Fragment>
  )
}



export default SushiContainer