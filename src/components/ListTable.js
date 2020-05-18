import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Table,
  Icon,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { createList, deleteList } from '../store/lists/actions'

import ListTableRow from './ListTableRow';

function ListTable({ dispatch, lists }) {

  const handleCreateList = () => {
    dispatch(createList({ name: 'name1234' }));
  };

  const handleOpenList = () => {
  };

  const handleDeleteList = (id) => {
    dispatch(deleteList(id));
  };

  return(
    <Table celled striped selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Button floated='right' compact onClick={handleCreateList}>
              <Icon name="plus" size='small'/> New List
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {lists.map((list) => (
          <ListTableRow
            list={list}
            onClick={handleOpenList}
            onDelete={handleDeleteList}
          />
        ))}
      </Table.Body>
    </Table>
  )
};

ListTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape()),
};

ListTable.defaultProps = {
  lists: [],
};

const mapStateToProps = (state) => ({
  lists: state.lists.lists,
});

export default connect(mapStateToProps)(ListTable);