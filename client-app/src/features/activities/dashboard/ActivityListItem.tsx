import React, { useContext, useState } from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Item, Button, Segment, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IActivity } from '../../../app/models/activity';
import { format } from 'date-fns';
import ActivityListItemAttendees from './ActivityListItemAttendees';

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    deleteActivity,
    loading
  } = rootStore.activityStore;

  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );
  
  const host = activity.attendees.filter(x => x.isHost)[0];

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
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by
                <Link to={`/profile/${host.username}`}> {host.displayName}</Link>
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color='orange'
                    content='You are hosting this activity'
                  />
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color='green'
                    content='You are going to this activity'
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' /> {format(activity.date, 'h:mm a')}
        <Icon name='marker' /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees attendees={activity.attendees} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated='right'
          content='View'
          color='blue'
        /> 
      <Button
        name={activity.id}
        onClick={(e) => {
          deleteActivity(e, activity.id);
          setDeleteTarget(e.currentTarget.name)
        }}
        disabled={!activity.isHost}
        loading={loading && deleteTarget === activity.id}
        floated='right'
        content='Delete'
        basic
        negative
        icon='trash'
      />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
