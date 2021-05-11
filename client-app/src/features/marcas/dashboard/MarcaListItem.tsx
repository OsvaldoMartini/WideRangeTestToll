import React from 'react';
import { Item, Button, Segment, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IMarca } from '../../../app/models/marca';
import { format } from 'date-fns';
import MarcaListItemAttendees from './MarcaListItemAttendees';

const MarcaListItem: React.FC<{ marca: IMarca }> = ({ marca }) => {
  const host = marca.attendees.filter(x => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src={host.image || '/assets/user.png'}
              style={{ marginBottom: 3 }}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/marcas/${marca.id}`}>
                {marca.title}
              </Item.Header>
              <Item.Description>
                Hosted by
                <Link to={`/profile/${host.username}`}> {host.displayName}</Link>
              </Item.Description>
              {marca.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color='orange'
                    content='You are hosting this marca'
                  />
                </Item.Description>
              )}
              {marca.isGoing && !marca.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color='green'
                    content='You are going to this marca'
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' /> {format(marca.date, 'h:mm a')}
        <Icon name='marker' /> {marca.venue}, {marca.city}
      </Segment>
      <Segment secondary>
        <MarcaListItemAttendees attendees={marca.attendees} />
      </Segment>
      <Segment clearing>
        <span>{marca.description}</span>
        <Button
          as={Link}
          to={`/marcas/${marca.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
};

export default MarcaListItem;
