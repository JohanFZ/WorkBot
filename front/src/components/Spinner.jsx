import React from 'react';
import { Spinner } from 'reactstrap';

const SpinnerLoading = () => {
  return (
    <div className='spinner-loading'>
      <Spinner className='spinner'>
        Loading...
      </Spinner>
    </div>
  )
}

export { SpinnerLoading }
