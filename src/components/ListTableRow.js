import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Table,
    Icon,
  } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function ListTableRow({ list, onClick, onDelete }) {


  return (
    <Table.Row>
      <Table.Cell verticalAlgin='middle' onClick={onClick}>
        {list.name}
        <Button onClick={() => onDelete(list._id)} size='mini' compact floated='right'>
          <Icon fitted name="trash"/>
        </Button>
      </Table.Cell>
    </Table.Row>
  )
};

ListTableRow.propTypes = {
  list: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
  }),
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
}

ListTableRow.defaultProps = {
  onClick: null,
  onDelete: null,
}

export default ListTableRow;
