import React from 'react';
import { Header, Input, Segment} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function List() {
  return (
    <div style={{marginLeft: '10vh', marginRight: '10vh'}}>
      <Segment>
        <Header as="h1">This is a list!!</Header>
        <Input placeholder="Enter new word" />
      </Segment>
    </div>
  );
}

export default List;
