import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { IMarca } from '../../../app/models/marca';
import {format} from 'date-fns';

const MarcaDetailedInfo: React.FC<{marca: IMarca}> = ({marca}) => {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{marca.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            Data do Pedido: <span>{format(marca.date, 'dd/MM/yyyy')}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
              <Icon name='calendar' size='large' color='red' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
             Validade: <span>{format(marca.expire, 'dd/MM/yyyy')}</span>
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default MarcaDetailedInfo;
