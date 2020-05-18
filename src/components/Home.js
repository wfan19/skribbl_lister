import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Table,
  Icon,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import { createList } from '../store/lists/actions'

function Home({ dispatch, lists }) {

  const handleCreateRoom = () => {
    dispatch(createList({ name: 'name1234' }));
  }

  return (
    <div className="App">
      <Segment style={{ marginLeft: '10vw', marginRight: '10vw' }}>
        <Grid
          centered
          textAlign="center"
          divided
          relaxed
        >
          <Grid.Row columns={2}>
            <Grid.Column verticalAlign="top">
              <p>Welcome to the Ultimate Skribbl.io Experience</p>
            </Grid.Column>

            <Grid.Column verticalAlign="top">
              <Link to="/list/1234">
                <Button primary> Click here to get started </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {
          //TODO: Create table items that actually show up properly
        }
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Button floated='right' compact onClick={handleCreateRoom}>
                  <Icon name="plus" size='small'/> New List
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Segment>
    </div>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape()),
};

Home.defaultProps = {
  lists: [],
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(Home);
