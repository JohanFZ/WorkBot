import React from 'react';
import { Input, InputGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const InputSearch = ({placeholder, onChange}) => {
  return (
    <InputGroup className='input-search'>
      <Input placeholder={placeholder} onChange={onChange} />
      <UncontrolledButtonDropdown>
        <DropdownToggle caret color='primary' className='button-dropdown'>
          Buscar
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem divider/>
          <DropdownItem>Identificación</DropdownItem>
          <DropdownItem divider />
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </InputGroup>
  )
}

export { InputSearch }
