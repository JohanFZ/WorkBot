import React, {useState} from 'react';
import { Input, InputGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const InputSearch = ({placeholder}) => {
  return (
    <InputGroup className='input-search'>
      <Input placeholder={placeholder} />
      <UncontrolledButtonDropdown>
        <DropdownToggle caret color='primary' className='button-dropdown'>
          Buscar
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Nombre</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem>Identificación</DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </InputGroup>
  )
}

export { InputSearch }
