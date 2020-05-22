import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  Button,
  Icon,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function EntriesList({ dispatch, entries }) {

  const entry = (entry) => (
    <Card>
      <Card.Content>
        {/* <Card.Header>{entry.word}</Card.Header> */}
        <Card.Description>{entry.word}</Card.Description>
      </Card.Content>
      <Card.Content style={{ padding:'0.3rem' }}>
        <Button
          fitted
          size="mini"
          floated="right"
          icon="trash"
        />
      </Card.Content>
    </Card>
  )

  return (
    <Card.Group itemsPerRow={5}>
      {entries.map(entry)}
    </Card.Group>
  );
};

EntriesList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = (state) => ({
  entries: state.list.listSelected.entries,
})

export default connect(mapStateToProps)(EntriesList);
