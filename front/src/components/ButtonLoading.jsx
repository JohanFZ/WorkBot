import React from 'react';
import ReactLoading from 'react-loading';
import { Button } from 'reactstrap';

const ButtonLoading = ({ disabled, loading, text }) => {
  return (
    <Button color='primary'
      className='button'
      disabled={disabled}
      type='submit'
    >
      {loading ? <ReactLoading type='spin' height={30} width={30} /> : text}
    </Button>
  );
};

export default ButtonLoading;