import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  Button,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { deleteEntry } from '../../store/list/actions'

function EntriesList({ dispatch, entries, editing }) {



  function entry(entry){
    const onDelete = () => {
      dispatch(deleteEntry(entry._id));
    }

    return(
      <Card>
        <Card.Content>
          {/* <Card.Header>{entry.word}</Card.Header> */}
          <Card.Description>{entry.word}</Card.Description>
        </Card.Content>
        {editing &&
          <Card.Content style={{ padding:'0.3rem' }}>
            <Button
            fitted
            size="mini"
            floated="right"
            icon="trash"
            onClick={onDelete}
            />
          </Card.Content>
        }
      </Card>
    )
  }

  return (
    <Card.Group itemsPerRow={5}>
      {entries.map(entry)}
    </Card.Group>
  );
};

EntriesList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape()),
  editing: PropTypes.bool,
};

EntriesList.defaultProps = {
  entries: [],
  editing: false,
};

const mapStateToProps = (state) => ({
  entries: state.list.listSelected.entries,
  editing: state.list.editing,
})

export default connect(mapStateToProps)(EntriesList);
